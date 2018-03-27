/**
 * Returns a selective field copy of the grid tab array for backing up before potential data loss.
 * @todo Possibly make gridTab optional and default to item.grid when omitted
 * @todo Possibly make fieldIDs optional. Omitting fieldIDs would copy the entire grid tab.
 *       However, JSON.stringify(item.grid); does this already.
 * @todo Abstract for more general use in copying any array. This may be similiar to Object.assign()
 * @param {{}} gridTab Any valid item grid object.
 * @param {Array<string>} fieldIDs - Array of grid tab field IDs to copy.
 */
function gridTabToJSON(gridTab, fieldIDs) {
    var newArray = [];
    var arrayEntry = {};
    for (var i = 0; i < gridTab.length; i++) {
        // Loop over the fieldIDs to be saved.
        for (var j = 0; j < fieldIDs.length; j++) {
            // Next line resolves to: arrayEntry.PHASE = item.grid[0].PHASE
            arrayEntry[fieldIDs[j]] = gridTab[i][fieldIDs[j]];
        }
        newArray.push(arrayEntry);
        arrayEntry = {};
    }
    return JSON.stringify(newArray);
}