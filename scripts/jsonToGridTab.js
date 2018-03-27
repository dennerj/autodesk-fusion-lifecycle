/**
 * Populates grid tab using key value pairs from a JSON formatted string.
 * @requires GlobalFunctions.js
 * @param {string} jsonField
 * @param {{}} gridTab
 */
function jsonToGridTab(jsonField, gridTab) {
    var jsonData = JSON.parse(toPlainText(jsonField));
    for (var i = 0; i < gridTab.length; i++) {
        for (var key in jsonData[i]) {
            gridTab[i][key] = jsonData[i][key];
        }
    }
}