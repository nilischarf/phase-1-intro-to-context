function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ')
    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ')
    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(e => e.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === date)    

    if (!timeInEvent || !timeOutEvent) {
        return 0
    }

    const timeIn = parseInt(timeInEvent.hour)
    const timeOut = parseInt(timeOutEvent.hour)
    const work = timeOut - timeIn
    return work / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)

    if (hoursWorked === 0) {
        return 0;
    }

    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const totalWages = employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
        const timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === timeInEvent.date)

        if (timeOutEvent) {
            const dateWages = wagesEarnedOnDate(employeeRecord, timeInEvent.date)
            return total + dateWages
        }
        return total
    }, 0)
    return totalWages
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => {
        const employeeWages = allWagesFor(employeeRecord)
        return total + employeeWages
    }, 0)
}