/**
 * Strips substrings matching HTML tags.
 * - Returns a NEW string without HTML tags.
 * @param {string} str
 * @example
 * stripHtmlTags('<p>Paragraph<br /></p>'); // Paragraph
 */
function stripHtmlTags(str) {
    return (str) ? str.replace(/(<.*?>)/g, '') : str;
}

/**
 * Converts HTML entity codes to their equivalent values.
 * - Returns a NEW string with decoded entities.
 * @param {string} str
 * @example
 * parseHtmlEntities('&#34;Double Quotes&#34;'); // "Double Quotes"
 */
function parseHtmlEntities(str) {
    return (str) ? str.replace(/&#([0-9]{1,3});/gi, function charFromCode(match, charCode) {
        return String.fromCharCode(parseInt(charCode, 10));
    }) : str;
}

/**
 * Removes HTML formatting of standard paragraph fields in Fusion Lifecycle.
 * - Paragraph fields created/edited in Modern UI are injected with HTML tags and special character
 * encodings. This utility function will remove HTML tags and decode enity codes.
 * - Useful for cleaning text saved in JSON so you can use JSON.parse() as needed.
 * - A NEW string is returned. The orginal string is never modified.
 * @param {string} encodedString Text containing tags and/or codes to be processed.
 * @example
 * item.JSON_DATA_1 = '<p> {   <br />  </p><p> &#34;KEY1&#34;:    &#34;text&#34;      }<br />  </p>';
 * println(toPlainText(item.JSON_DATA_1)); // {"KEY1": "text"}
 */
// eslint-disable-next-line no-unused-vars
function toPlainText(encodedString) {
    var decodedString = encodedString;
    if (decodedString) {
        decodedString = stripHtmlTags(decodedString);
        decodedString = parseHtmlEntities(decodedString);
        // Remove all whitespace between these chars {}], and these {}"[]
        // Does not include whitespace between double quotes.
        // Attempted simplier reqex but had issues with whitespace being removed from values.
        decodedString = decodedString.replace(/((?![{}\]),])\s+(?=[{}"\]]))/g, '');
    }
    return decodedString;
}