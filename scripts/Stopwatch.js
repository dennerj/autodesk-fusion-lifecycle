/**
 * A stopwatch time constructor to track timings during script runtimes.
 */
// eslint-disable-next-line no-unused-vars
function Stopwatch() {
    this.startTime = 0;
    this.stopTime = 0;
    this.splitTimes = [{ name: 'Total', cumulativeSplit: 0, splitTime: 0 }];
    this.total = 0;
    this.elapsedTime = 0;
    this.alarm = 4000;
    /**
     * Creates a mark in time with a customizable name.
     * @param {string} splitName
     */
    this.splitTime = function splitTime(splitName) {
        splitName = splitName || 'Split ' + this.splitTimes.length;
        var splitNow = Date.now();
        var cs = parseInt(splitNow - this.startTime, 10);
        var st = splitNow - (this.splitTimes[this.splitTimes.length - 1].epoch);
        st = (st > 0) ? st : cs;
        this.splitTimes.push({
            name: splitName,
            cumulativeSplit: cs,
            splitTime: st,
            epoch: splitNow
        });
    };
    /**
     * Starts the timer.
     */
    this.startTimer = function startTimer() {
        this.startTime = (this.startTime === 0) ? Date.now() : this.startTime;
    };
    /**
     * Ends the timer.
     */
    this.stopTimer = function stopTimer() {
        this.stopTime = Date.now();
        this.elapsedTime = parseInt(this.stopTime - this.startTime, 10);
        var startToStop = parseInt(this.stopTime - this.startTime, 10);
        var epochTime = this.startTime;
        this.splitTimes[0] = {
            name: 'total',
            cumulativeSplit: startToStop,
            splitTime: startToStop,
            epoch: epochTime
        };
    };
    this.showResult = function showResult(criteria) {
        switch (criteria) {
            case 'alarm':
                if (this.elapsedTime > this.alarm) {
                    this.splitTimes.forEach(function(element) { // eslint-disable-line func-names
                        println(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
                        Logger.log(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
                    });
                }
                break;
            case 'debug':
                this.splitTimes.forEach(function(element) { // eslint-disable-line func-names
                    println(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
                    // Logger.log(element.name + ': ' + element.splitTime + 'ms' + ' (' + element.cumulativeSplit + 'ms)');
                });
                break;
            default:
                break;
        }
    };
}