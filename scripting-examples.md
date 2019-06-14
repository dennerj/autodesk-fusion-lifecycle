# Scripting Examples
View examples of Condition, Validation, Action, and Library scripts.

Condition Scripts
Validation Scripts
Action Scripts
Library Scripts

## **Condition Scripts**

### **Check Item Has Approvals**

Controls workflow by hiding the transition to the next state unless a workspace item has all required approvals. The script assumes a workspace item with three Boolean fields that indicate approval by the Artist, the Designer, and QA.

```js
if (item.ARTIST_APPROV === 0 || item.DESIGNER_APPROV === 0 || item.QA_APPROV === 0)
  returnValue(false);
else
  returnValue(true);
Check Item Inspection/Repair Hours
```

Controls workflow by hiding the transition to the next state if any inspection or repair of the workspace item required less than four hours to complete. The inspection/repair data is obtained from an HRS_RQRD field that is part of the entries in the item Grid, with each item in the Grid representing an individual inspection/repair record.

```js
var hours = 0;
var grid = item.grid;
var totalHours = 0;

for (var index in grid){
  var gridRow = grid[index];
  totalHours+=gridRow.HRS_RQRD;
}

if (hours < 4) {
  returnValue(false);
  }
else {
  returnValue(true);
  }
```

### **Check Status of Linked Manufacturing Plan Item**

Controls workflow by hiding/showing the next transition based on data from a linked item. `item.MANUFACTURING_PLAN` references a field in the workspace item that is a link to an item in another workspace (for example, "Manufacturing Plan"). `STATUS` references a Pick List field in the linked item. `If STATUS != Complete`, the script hides the transition.

```js
if (item.MANUFACTURING_PLAN.STATUS == 'Complete')
  returnValue(true);
else
  returnValue(false);
  ```

Check Item Transition From State

Controls workflow by hiding the transition to the next state unless the state before the transition (fromState) is a certain state (stateID = 16).

```js
var state = 0;

var lastChange = item.workflowActions[0];
var state = lastChange.transition.fromState.stateID;

if (state == 16)
  returnValue(true);
else
  returnValue(false);
```

### **Check Login User is Item Owner**

Controls workflow by hiding the transition to the next state unless the current user is the workspace item Owner. The script uses the ownerID object and the userID argument.

```js
if (item.descriptor.ownerID == userID)
  returnValue(true);
else
  returnValue(false);
```

### **Check Login User is in Given Permission Role**

Controls workflow by hiding the transition to the next state unless the logged-in user is assigned the RW_ChangeOrders role. The script uses the Security.inRole(userID, roleName) function. You can apply any role to the script by changing the role variable accordingly.

```js
var role = 'RW_ChangeOrders';
var inRole = Security.inRole(userID, role);

returnValue(inRole);
```
<hr>

## **Validation Scripts**

### **Validate Item Cost for Fast Track Approval**

Controls workflow by preventing fast-track approval of the workspace item by disallowing the transition to the next state if item total cost exceeds 50 or the supplier is considered high-risk. It includes an array of messages that let the user know the specific reason for disallowing the transition. The script assumes a workspace item with `COST` and `QUANTITY` fields, and a `SUPPLIER_RISK` pick list field with High as a value.

```js
var messages = [];

if ((item.COST * item.QUANTITY) > 50){
  messages.push('Item costs too much for fast-track approval.');
}
else if (item.SUPPLIER_RISK == 'High'){
  messages.push('Cannot fast-track approval of parts from high-risk vendors.');
}

println(item.QUANTITY', 'item.SUPPLIER_RISK);
returnValue(messages);
```

### **Validate Item Repair Hours Meets Minimum**

Controls workflow using inspection/repair data from the item Grid. The script does the following: (1) identifies the Grid entries that are repairs `(ACTIVITY_TYPE == Repair)`, (2) disallows transitioning if the time to complete any repair (HRS_RQRD) is less than seven hours, and (3) returns a different validation failure message for completion times less than three hours and less than seven hours.

```js
var messages = [];

var grid = item.grid;
for (var index in grid){
  var  gridRow = grid[index];
  var type = gridRow.ACTIVITY_TYPE;  
  var hours = gridRow.HRS_RQRD;

  if (type == 'Repair' && hours < 3){
    messages.push('A complete inspection of the item is required before
    transitioning to the next state.');
  }
  else if (type == 'Repair' && hours < 7){
    messages.push('A partial inspection of the item is required before
    transitioning to the next state.');
  }
}

returnValue(messages);
```

### **Validate Age of Attached File**

Controls workflow by disallowing transitioning to the next state if the date and time on which the item attachment was last modified is older than December 31, 2011.

```js
var messages = [];

var attachments = item.attachments;
for (var index in attachments){
  var attachmentsFile = attachments[index];
  var date = attachmentsFile.timestamp;
  var cutoffDate = new Date('December 31, 2011 00:00:00')

  if (date < cutoffDate){
    messages.push('A file attached to the workspace item has not been modified since
      December 31, 2011. The file content is too old to allow transitioning to the
      next state.');
  }
}

returnValue(messages);
```

### **Validate Current Version Is Working and Not Older Than Cutoff Date**

Controls workflow by accessing revisioning data to determine if the current version of the workspace item is the Working Version (working) and then comparing the date and time of the version (timeStamp) with a cutoff date. If the date/time is older than the cutoff date, the script disallows transitioning and returns a message explaining why. Script data is accessed through the Descriptor dvi object.

```js
var cutoffDate = new Date('July 1, 2010 00:00:00');
var revision = item.descriptor.dvi;
var isWorking = revision.working;
var revDate = revision.timeStamp;  

var messages = [];
if (isWorking == 1 && cutoffDate > revDate){
  Messages.push('Cannot complete the transition because the date of the item’s
  working version is past the cutoff date.');
}

returnValue(messages);
```

### **Validate Item Is Unreleased**

Controls workflow by allowing transitioning to the "deleted" state only if the workspace item was never released (Unreleased lifecycle phase). The script accesses item revisioning data using the revisionList object array. If the script determines the item has been released at any point in time, it disallows the transition and returns an error with the time and date of the release.

```js
var messages = [];

var revisionList = item.descriptor.revisionList;

for (var index in revisionList){
  var lifeCycleState = revisionList[index].lifeCycleState;

  if (lifeCycleState.stateName == 'RELEASED'){
    messages.push('Can’t delete part, it was released on '
    +lifeCycleState.timeStamp);
  }
      
}

returnValue(messages);
```

### **Validate Item Owner Is Not Any of Given Users**

Controls workflow by disallowing transitioning to the next step if the workspace item Owner is any of the specified users. The script uses the Security.loadUser(userID) function. You can apply the script to any users by changing the user1 and user2 variables, and even adding additional user variables.

```js
var user1 = 'bloggsj';
var user2 = 'doem';

var loadedUser1 = Security.loadUser(user1);
var loadedUser2 = Security.loadUser(user2);
var ownerId = item.descriptor.ownerID;

var messages = [];

if (ownerId == user1){
  messages.push('Cannot complete transition if item Owner is user '
  +loadedUser1.firstName+' ' +loadedUser1.lastName);
}
else if (ownerId == user2){
  messages.push('Cannot complete transition if item Owner is user '
  +loadedUser2.firstName+' '+loadedUser2.lastName);
}

returnValue(messages);
```
<hr>

## **Action Scripts**

### **Edit Item Date**

Checks whether an item's DATE field is empty. If the field is empty, the script sets the date to Today. If the field is populated, the script changes the date to one week from the current date (Today + 7 days).

```js
if  (item.date === null) {
  item.DATE = new Date();
}
else {
  item.DATE = newDate(item.DATE.getTime() + 1000 * 60 * 60 * 24 * 7);
  }
```

### **Create New Item in Customers Workspace**

Adds a new item to the Customers workspace using `createItem('WS_WORKSPACE_ID')`. The script specifies the workspace by passing the Workspace ID, as it appears on the Workspace Settings page (WS_CUSTOMERS), to `WS_WORKSPACE_ID`. Values for Item Detail fields are passed as properties on the object using Field IDs.

```js
newItem = createItem('WS_CUSTOMERS');
newItem.NAME = 'ABC Co.';
newItem.WEB_SITE = 'http://www.abc.com';
newItem.EMAIL_ADDRESS = 'info@abc.com';
```

### **Create New Change Order and Set Up Lookup From Spawning Change Request**

Creates a new item in the Change Orders workspace and sets the value of a "Spawned Change Order" field (SPAWNED_CO) in the associated Change Request item to the new Change Order. You would typically trigger this script after successful transitioning of the associated Change Order to the "Approved" workflow state.

```js
newCO = createItem('WS_CHANGE_ORDERS');
newCO.TITLE = 'Release XYZ';
newCO.TYPE = '1 - Engineering';
newCO.URGENCY = '2 - Medium';

item.SPAWNED_CO = newCO;
```

### **Create New Milestone**

Creates a new milestone for the workspace item and sets a number of its properties, including workflow state, through the shortName property.

```js
var milestone = item.addMilestone(); 

milestone.setWorkflowState('Short name'); 
milestone.milestoneType = 'ENTER'; 
milestone.milestoneDate = new Date(); 
milestone.warnThreshold = 10; 
milestone.progress = 50;
```

### **Send Email to a Given Email Address**

Creates an Email() object to send a message to the email address stored in the associated item's CONTACT_EMAIL field. The script assigns the getPrintView() function to the object's body property to pass data from the associated item to the body of the message via a specified Advanced Print View ('Basic Item Data View'). The Email.send() method queues the email message for delivery.

```js
var email = new Email();

email.to = item.CONTACT_EMAIL;
email.subject = 'Agenda for Staff Meeting';
email.body = getPrintView('Basic Item Data View');
email.send();
```

### **Send Email to an Ad Hoc List of Recipients**

Creates an `Email()` object to send an email message to the recipients specified by a comma-delimited list of addresses assigned as a string to the To property. The script also CCs the message to the email address assigned to the cc property. The script sends the message content as an HTML-formatted string assigned to the body property. The default format is text/html so there is no need to set contenttype. The `Email.send()` method queues the email message for delivery.

```js
var email = new Email();

email.to = 'jdoe@abc.com,jbloggs@abc.com,esmith@abc.com';
email.cc = 'bigboss@abc.com';
email.subject = 'Agenda for Staff Meeting';
email.body = '<html><body><p>Please be ready to discuss the following projects ...</p></body></html>';
email.send();
```

### **Send Email to a List of Recipients Generated from a User Group**


The script starts by creating an `Email()` object and assigning values to the subject and body object properties. It assigns the `getPrintView()` function to the body property to pass data from the associated item as the body of the message via a specified Advanced Print View ('Basic Item Data View'). The script then uses the `Security.listUserInGroup('GROUP_NAME')` function to load an array of the users in the Quality user group into a users variable. It parses the email addresses in the array and passes them to the object's to property. Finally, the `Email.send()` method queues the email message for delivery to each address in the users array.

```js
var email = new Email();
email.subject = 'Changes to User Group Permissions';
email.body = getPrintView('Basic Item Data View');

var users = Security.listUsersInGroup('Quality');

for(var index in users) {
  email.to = users[index].email;
  email.send();
}
```

### **Create a Named Sequencer**

Sequencer scripts always increment the named sequence even when you are testing or debugging the script. When testing, use a test sequence name to avoid increasing numbers on actual named sequences used in production.

```js
var seq = new Sequencer(name, start, step);
// name is required, start and step optional. default for both is 1 if omitted.
// start can be set to >= 0 whereas step >=1

var seq = new Sequencer("foo"); // same as foo,1,1
var seq = new Sequencer("foo", 500); // step=1

Then can get next sequence:
var nextNum = seq.nextValue();

Or can read step and start (cannot change them)
Var step = seq.step;
var start = seq.start;

To get a sequencer, you go:
var seq2 = Sequencer.get("name");
// if it doesn't exist, new sequence will be created with values of 1 for start and step.

To list all named sequencers:
var seqs = Sequencer.list(); //array of names
```

### **Add-Clone-Edit-Delete Item Grid Rows**

The script first creates a new item in the RFQ worspace and sets the VENDOR field to "ABC Co." It then adds a row to the item's Grid using item.grid.addRow(), passing it values through properties on the grid object. Notice that the value for the row VENDOR property is the variable that was assigned to the item's VENDOR property. Next, the script adds a second row, passing it values as an associative array of name-value pairs. It then adds a third row to the Grid by cloning the second row. Finally, the script deletes the first row added to the Grid (index = 0) using item.grid.remove(), and then changes the value for QTY in the cloned row, which after the deletion has become the second row in the Grid (index = 1).

```js
var rfq = createItem('WS_RFQ');
rfq.VENDOR = 'ABC Co.';

var vendor = rfq.VENDOR;

var row1 = item.grid.addRow();
row1.ITEM = '67-235/T2C-PX2Y2/2T-ND';
row1.TITLE = 'LED WHITE 6-SMD';
row1.QTY = 4000;
row1.VENDOR = vendor;

var row2 = item.grid.addRow({ ITEM: '68-236/T2C-PX3Y3/4T-ND', TITLE: 'LED WHITE 12-SMD', 
     QTY: 3500, VENDOR: vendor });

var row3 = item.grid.addRow(row2);

item.grid[0].remove();

item.grid[1].QTY = 4500;
```
<hr>

## **Library Scripts**
### **Check for Value in Array**

Determines if the passed value is in the passed array.

```js
function inArray(passedArray, passedValue) {

    for(var index in passedArray){
        if(passedArray[index] === passedValue) {
          returnValue(true);
        }
        else {
          returnValue(false);
        }
    }
}
```

### **Create New Item**

Creates a new workspace item using the createItem('WS_WORKSPACE_ID') function, where workspaceID is the ID of the workspace where you want to create the item and propertiesArray is an array of the item field values you want to set.

```js
function createNewItem(workspaceID, propertiesArray){

  newItem = createItem(workspaceID);

  for(var propKey in propertiesArray){
    newItem[propKey] = propertiesArray[propKey];
  }
}
```

*Example Use*

```js
var newProperties = [];
newProperties.NAME = 'John Doe';
newProperties.EMAIL = 'jdoe@company.com';

createNewItem('WS_CUSTOMERS', newProperties);
```

### **In-Session Scripting**

Manipulates an item spawned by the script itself.

```js
/**
 * add newly spawned item into existing item's tabs. 
 * example, when an itemX is spawned in script1 of itemA, then allow me to add itemX to managed tab of itemA.
 * itemX --> item
*/
var itemX = createItem('WS_SIMPLE');
itemX.TITLE = 'Item X ' + new Date();

//Managed items (Workflow Items)
item.workflowItems.addItem({RELATED:itemX});
//BOMs
item.boms.addBOM({RELATED: itemX, QUANTITY: 1, ITEM_NUMBER: 1});
//Projects
item.project.addTask(itemX);
//Relationships
item.relationships.addRelated(itemX, "Cross-Reference", "Unidirectional", "Description");


/**
* add existing records to a newly spawned item's tabs. 
 * example, when an itemX is spawned in script1 of itemA, then allow me to add itemA to projects tab of newly spawned itemX.
* item --> itemY
*/
var itemY = createItem('WS_SIMPLE');
itemY.TITLE = 'Item Y ' + new Date();

//Managed items (Workflow Items)
itemY.workflowItems.addItem({RELATED:item});
//BOMs, don't add item to itemX to avoid cyclic bom error since itemX had been added to item's bom list above. So we create a new itemY and add item into it.
itemY.boms.addBOM({RELATED: item, QUANTITY: 1, ITEM_NUMBER: 1});
//Projects
itemY.project.addTask(item);
//Relationships
itemY.relationships.addRelated(item, "Cross-Reference", "Unidirectional", "Description");

/**
* add newly spawned records to tabs of other newly spawned items. 
 * example, when an itemX and itemY are spawned in script1 of itemA, 
 * then allow to add itemX to projects tab of itemY AND allow adding itemY to managed tab of itemX, all in the context of that script 1.
* itemY --> itemZ
*/
var itemZ = createItem('WS_SIMPLE');
itemZ.TITLE = 'Item Z ' + new Date();

//Managed items (Workflow Items)
itemZ.workflowItems.addItem({RELATED:itemY});
//BOMs, don't add item to itemX to avoid cyclic bom error since itemX had been added to item's bom list above. So we create a new itemY and add item into it.
itemZ.boms.addBOM({RELATED: itemY, QUANTITY: 1, ITEM_NUMBER: 1});
//Projects
itemZ.project.addTask(itemY);
//Relationships
itemZ.relationships.addRelated(itemY, "Cross-Reference", "Unidirectional", "Description");

/**
* add records to spawned items tabs. eg addRow() to grid tab of a spawned item or create and add milestone to Milestone tab.
*/
//Grid
itemX.grid.addRow({GRID_FIELD:1});
itemX.grid.addRow({GRID_FIELD:2});
//Milestone
var milestone1 = itemX.addMilestone();
milestone1.setWorkflowState('State1'); 
milestone1.milestoneType = 'ENTER'; 
milestone1.milestoneDate = new Date(); 
milestone1.warnThreshold = 10; 
milestone1.progress = 50;
var milestone2 = itemX.addMilestone();
milestone2.setWorkflowState('State2'); 
milestone2.milestoneType = 'ENTER'; 
milestone2.milestoneDate = new Date(); 
milestone2.warnThreshold = 10; 
milestone2.progress = 50;
```
