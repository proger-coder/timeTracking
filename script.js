let insertButton = document.getElementById('intervalInserter');
let countButton = document.getElementById('counter')
let tbody = document.querySelector('tbody');
let oneIntervalHTML = `<tr><td><input type="time" ></td><td><input type="time" ></td></tr>`;
let totalTimeField = document.querySelector('span');

document.addEventListener('keydown', function () {
    if(event.key === "Enter"){
        addInterval()
    }
})

function addInterval(){
    tbody.insertAdjacentHTML('beforeEnd',oneIntervalHTML);
}

insertButton.onclick =() => {
    addInterval();
}

countButton.onclick = () => {
    missedFinder()
    let totalTime = totalBashHaHaHa()
    totalTimeField.innerText = `${totalTime.totalHours} hours, ${totalTime.remainedMinutes} mins`
}

function timeParser(stringTime){
    let hoursMins = {};
    hoursMins.hours = parseInt(stringTime.split(":")[0]);
    hoursMins.mins = parseInt(stringTime.split(":")[1]);
    return hoursMins;
}

function intervalDuration(time1,time2) {
    if(time2.hours <= time1.hours && time2.mins < time1.mins) {
        console.log(`меньше или равно! ДОбавили`)
        time2.hours += 24
    }
    let intervalMinutes = (time2.hours - time1.hours) * 60 + (time2.mins - time1.mins);
    return intervalMinutes;
}

function totalBashHaHaHa (){
    let allIntervals = document.querySelectorAll('tr') // массив строк
        //самая верхняя строка <tr> - последний элемент в массиве, самая нижняя - нулевой
        //let intervalsAmount = allIntervals.length
    let totalDuration = 0;
    allIntervals.forEach(interval =>{
        let twoTimeFields = interval.querySelectorAll('input') //массив из 2-т тайм-инпутов строки

        totalDuration += intervalDuration(
            timeParser(twoTimeFields[0].value),
            timeParser(twoTimeFields[1].value)
        )
    })
    let totalTime = {};
        totalTime.totalHours = Math.floor(totalDuration / 60);
        totalTime.remainedMinutes = totalDuration % 60;
    return totalTime;
}

function missedFinder(){ //на случай незаполненного поля
    document.querySelectorAll('input').forEach(input => {
        if (!input.value){
            input.style.backgroundColor = 'red'
            input.value = "00:00"
        } else {input.style.backgroundColor = 'white'}
    })
}