/*
 * These functions are for performing On Create, On Edit, and On Demand validations in any workspace.
 * Included are functions that create visual cues (labels) to notify the user of the errors.
 * HTML is utilized here to build professional looking and visually noticable validation issues BEFORE
 * the user attempt to transition.
 */

/**
 * Input the fields (array) to be checked. Right now we are looking for blank.
 * If it's blank then add an error label to a string array using the labelText.
 */
function colorizeField(color, text) {
    text = (typeof text !== 'undefined') ? text : '&nbsp;';
    color.toLowerCase();
    var spanColor = {
        green: 'background: #43A047',
        red: 'background: #D9534F',
        yellow: 'background: #FDD835',
        orange: 'background: #FFA000'
    };
    var spanOpen = '<span style="color: #FFFFFF; padding: .2em .6em; ';
    spanOpen += 'border-radius: .25em; font-weight: 700; white-space:nowrap; ';
    spanOpen += 'display: inline-block; margin: 2px 0; ';
    spanOpen += spanColor[color] + '">';
    var spanClose = '</span>';
    return spanOpen + text + spanClose;
}