function pause(ms) {
    var endtime = Date.now() + ms;
    while (Date.now() < endtime) { /* Juast killin' time */ }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function Stopwatch() {
    this.startTime = 0;
    this.stopTime = 0;
    this.splitTimes = [{ name: 'Total', cumulativeSplit: 0, splitTime: 0 }];
    this.total = 0;
    this.elapsedTime = 0;
    this.splitTime = function splitTime(splitName) {
        splitName = splitName || 'Split ' + this.splitTimes.length;
        var splitNow = Date.now();
        var cs = parseInt(splitNow - this.startTime, 10);
        var st = splitNow - (this.splitTimes[this.splitTimes.length - 1].epoch);
        st = (st > 0) ? st : cs;
        this.splitTimes.push({ name: splitName, cumulativeSplit: cs, splitTime: st, epoch: splitNow });
    };
    this.startTimer = function startTimer() {
        this.startTime = (this.startTime === 0) ? Date.now() : this.startTime;
    };
    this.stopTimer = function stopTimer() {
        this.stopTime = Date.now();
        this.elapsedTime = parseInt(this.stopTime - this.startTime, 10);
        var startToStop = parseInt(this.stopTime - this.startTime, 10);
        var epochTime = this.startTime;
        this.splitTimes[0] = { name: 'total', cumulativeSplit: startToStop, splitTime: startToStop, epoch: epochTime };
    };
}

var timer = new Stopwatch();

timer.startTimer();
pause(randomInt(10, 300));
timer.splitTime();
pause(randomInt(10, 300));
timer.splitTime();
pause(randomInt(10, 300));
timer.splitTime();
pause(randomInt(10, 300));
timer.splitTime('Start Array Operations');
pause(randomInt(10, 300));
timer.splitTime('End Array Operations');
pause(randomInt(10, 300));
timer.stopTimer();
timer.splitTimes.forEach(function(element) {
    console.log(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
});

// console.log(timer.splitTimes.toString());