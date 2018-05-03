/**
 * Simple function to get the current workflow state name.
 * @returns {string}
 * @example
 * println(currentStateText()); // 'Approval Board'
 */
function currentStateText() {
    return (item.workflowActions[0]) ? item.workflowActions[0].transition.toState.shortName : '';
}