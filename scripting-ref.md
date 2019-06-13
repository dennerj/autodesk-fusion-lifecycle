# Scripting Reference
## Top-level Functions
**`createItem('WS_WORKSPACE_ID')`**<br>Creates an item Object to add a new item to the workspace specified by '`WS_WORKSPACE_ID`.' The parameter takes the value for Workspace ID as it appears on the Workspace Settings page. Values for Item Detail fields are passed through properties on the object using Field IDs.

**`getPrintView('PRINT_VIEW_NAME')`**<br>Merges data from the associated item with the advanced print view specified by `PRINT_VIEW_NAME`.' The function returns a text string containing the combined result. The print view must b**`e one set up for the associated item's workspace. See `Email()` Object.


**`loadItem(dmsID)`**<br>Returns the workspace item specificed by dmsID. Deprecated.

**`print(), println()`**<br>Print information to a debug me#### ssage when testing.
Important: To improve performance, comment out or delete any debugging code when you finish writing a script.
**`returnValue()`**<br>Returns the "return value" required at the end of Precondition and Validation scripts.
Preset Parameters
**`dmsID`**<br>ID of the item associated with the script.

**`workspaceID`**<br>ID of the associated item's workspace

**`userID`**<br>Login ID of the user triggering the script.

**`transID`**<br>ID of the workflow transition controlled by the script ( System ID in Workflow Editor Transition Properties).

**`newStep`**<br>ID of the item workflow state after the transition is performed ( System ID in Workflow Editor State Properties).
 
## Field Types
|Field Type | Value Type | R/O or R/W | Comments
|---|---|---|---
| **Auto Number** | ID string| R/O
| **Integer** | Whole number | R/W | Rounded down if assigned a float value
|**Float**, Money	Floating point number	R/W	Returns a floating point value, but accepts floating point or integer values
|**Date** | Date|R/W|Accepts and returns JavaScript Date objects
|**Single-line Text, Paragraph, Paragraph w/o Line Breaks**|String|R/W	 
|**Check Box** | Boolean | R/W	 
|**Derived**|String|R/O	 
|**Single-value Pick List**|String|R/W	 
|**Multi-select Pick List** | Array of strings | R/W | - To add individual items `useitem.MULTISELECT.add(someItem)`<br/>- To remove individual items, use `item.MULTISELECT.remove(someItem)`<br/>- To clear the array, use `item.MULTISELECT.clear()`
|**Linking Single-value Pick List**	|Target item object|R/W|Use same syntax as `item` object
|**Linking Multi-select Pick List**	|Array of target item objects|R/W| - To add individual items, use `item.LINKING_MULTISELECT.add(someItem)`<br/>- To remove individual items, use `item.LINKING_MULTISELECT.remove(someItem)`<br/>- To clear the array, use `item.LINKING_MULTISELECT.clear()`
<hr>

 
## item Object
item is a pre-defined, top-level object. The workspace item associated with the script is automatically loaded into the itemobject. Item Details fields are implemented as properties on the object through Field IDs. Field IDs are always uppercase.
### **Methods on item**
**`item.addMilestone()`**<br>Adds a new item milestone to the associated item's Milestones array. See item Milestones array for properties on array objects.

**`item.deleteItem()`**<br>Deletes the item associated with the script. See `item.descriptor.deleted`.

**`item.performWorkflowTransition(transID, 'COMMENTS')`**<br>Performs the workflow transition specified by `transID` (see Transition Properties in the Workflow Editor).
The '`COMMENTS`' parameter is optional. If comments are specified, they are saved with the workflow step in the Workflow Actions tab.

**`item.performWorkflowTransitionByCustomID('CUSTOM_ID', 'COMMENTS')`**<br>Performs a workflow transition by its Custom ID as specified by 'CUSTOM_ID' ( Custom ID in Workflow Editor Transition Properties).
The 'COMMENTS' parameter is optional. If comments are specified, they are saved with the workflow step in the Workflow Actions tab.

### **Descriptor properties on item**
Descriptor properties on the item object (item.descriptor) represent item metadata.
**`item.descriptor.createdBy (string)`**<br>ID of the user who created the item ( Created by in Owner and Change Summary)

**`item.descriptor.createdDate (JavaScript date)`**<br>Date and time the item was created ( Created on in Owner and Change Summary)

**`item.descriptor.deleted (Boolean)`**<br>Is the item deleted? (1 = True; 0 = False).

**`item.descriptor.descriptor (string)`**<br>Item's Descriptor.

**`item.descriptor.dvi`** If the item is revision-controlled, latest version of the item.
- **`item.descriptor.dvi.lifecycleState.stateName (string)`**
Name of the latest version's Lifecycle.
 - **`item.descriptor.dvi.release (string)`**<br>Revision number or letter of latest version (for example, Prod Release A or Eng Release 1).

 - **`item.descriptor.dvi.timeStamp (JavaScript date)`**<br>Date and time on which latest version was created.

 - **`item.descriptor.dvi.working (Boolean)`**<br>Is the latest version the Working version? (1 = True; 0 = False).

**`item.descriptor.lastModifiedOn (JavaScript date)`**<br>Date and time on which the item was last modified.

**`item.descriptor.ownerID (string)`**<br>User ID of the item Owner

 
**`item.descriptor.revisionList (array)`**<br>If the item is revision-controlled, array of item versions.

 - **`item.descriptor.revisionList[i].latest (Boolean)`**<br>Is the specified version in the array the latest version? (1 = True; 0 = False).

 - **`item.descriptor.revisionList[i].lifecycleState.stateName (string)`**<br>Name of Lifecycle of the specified version in the array.

 - **`item.descriptor.revisionList[i].release (string)`**<br>Revision number or letter of the specified version in the array (for example, Prod Release A or Eng Release 1).

 - **`item.descriptor.revisionList[i].timeStamp (JavaScript date)`**<br>Date and time the specified version in the array was created.

 - **`item.descriptor.revisionList[i].working (Boolean)`**<br>Is the specified version in the array the Working version? (1 = True; 0 = False)

 **`item.descriptor.workflowState (string)`**<br>Item's current state in the workflow.
<hr>

## **item Grid array**
The item object Grid array (`item.grid`) is a standard JavaScript array of objects that represent individual rows in the associated item's Grid tab. You get and set Grid row properties through field IDs the same way you access Item Details fields (for example, `item.grid[0].DESCRIPTION`).

You can assign values to Grid properties using properties on the item object. You can also assign values through variables declared in the script, including ones used to add other new rows. You can use this capability to add multiple rows in a single script through cloning. You do not need to assign values to all fields in a row, only to fields you want to populate.
### **Methods on Grid array**

**`item.grid.addRow({FIELD_1:field_1, FIELD_2:field_2, FIELD_N:field_n})`**<br>Adds a row to the item Grid passing values through an associative array of name:value pairs
Note: To add a blank row, do not pass any arguments with the call.

**`item.grid.addRow(row)`**<br>Adds a row to the item Grid passing values in a row object

**`item.grid.clear()`**<br>Empties the Grid array (removes all rows from the Grid tab)

**`item.grid[i].remove()`**<br>Removes the specified row in the array from the Grid tab
<hr>

## **item Relationships array**
The item object Relationships array (item.relationships) is a standard JavaScript array of objects that represent individual rows in the associated item's Relationships tab. You can get and set Relationships properties through properties on array objects, including target item properties (through item.relationships[i].item).
### **Methods on Relationships array**

**`item.relationships.addRelated({RELATED:target, TYPE:typeStr, DIRECTION:'dir',DESCRIPTION:'desc'})`**<br>Adds a row to the Relationships tab passing values as an associative array of name:value pairs. Valid values for DIRECTION are Unidirectional and Bidirectional. For a list of valid TYPE values, seeitem.relationships[i].setRelationshipType('typeStr') item..

**`item.relationships.addRelated(target, typeStr, 'dir', 'desc')`**<br>Adds a row to the Relationships tab passing values through properties on array objects.

**`item.relationships.addRelated(related)`**
Adds a row to the Relationships tab passing values in a related object.

**`item.relationships.clear()`**<br>Empties the array (removes all relationship rows from the Relationships tab).

**`item.relationships[i].remove()`**<br>Remove the specified relationship in the array from the Relationships tab.

**`item.relationships[i].setDescription('desc')`**<br>Sets the DESCRIPTION property of the specified relationship in the array to the string assigned to desc ( Description on the tab).

**`item.relationships[i].setRelationshipType('typeStr')`**<br>Sets the TYPE property of the specified relationship in the array to the string assigned to typeStr ( Relationship Type) on the tab). Returns an error if typeStr is invalid. Valid values are:
- Cross-Reference
- Substitution
- Manufactured
- Application
- Other (see DESCRIPTION)
### **Properties on Relationships array objects**

**`item.relationships[i].description (string)`**<br>Description of the specified relationship in the array ( desc)

**`item.relationships[i].descriptor (string)`**<br>Descriptor of the target item of the specified relationship in the array

**`item.relationships[i].direction (string)`**<br>Direction of the specified relationship in the array ( dir): Unidirectional or Bidirectional

**`item.relationships[i].id (int)`**<br>dmsID of the target item of the specified relationship in the array

**`item.relationships[i].item`**<br>Target item of the specified relationship in the array ( target)

**`item.relationships[i].item.FIELD_ID (string)`**<br>Property on the target item of the specified relationship in the array as specified by FIELD_ID

**`item.relationships[i].type (string)`**<br>Type of the specified relationship in the array. See relationships[i].setRelationshipType('typeStr') for the list of valid types.
<hr>

## **item Attachments array**
The item object Attachments array (item.attachments) is a standard JavaScript array of objects that represent files attached to the associated item in the Attachments tab. You can get attachment properties through properties on array objects.
### **Properties on Attachments array objects**

**`item.attachments[i].checkoutTimeStamp (JavaScript date)`**<br>Date and time of the last or current checkout of the specified attachment in the array

**`item.attachments[i].checkOutUserID (string)`**<br>ID of the user who performed the last or current checkout of the specified attachment in the array

**`item.attachments[i].createdUserID (string)`**<br>ID of the user who created the specified attachment in the array

**`item.attachments[i].fileDescription (string)`**<br>Description of the specified attachment in the array


**`item.attachments[i].fileName (string)`**<br>File name (physical name) of the specified attachment in the array

**`item.attachments[i].fileSize (int)`**<br>File size, in bytes, of the specified attachment in the array

**`item.attachments[i].fileStatus (string)`**<br>Status of the specified attachment in the array (Checked IN, Checked OUT, Locked, Deleted, Archived)

**`item.attachments[i].fileVersion (int)`**<br>Current version of the specified attachment in the array

**`item.attachments[i].folderName`**<br>Name of the folder the specified attachment in the array is "stored" in, if any

**`item.attachments[i].resourceName`**<br>Title of the specified attachment in the array

**`item.attachments[i].timeStamp (JavaScript date)`**<br>Date and time on which the specified attachment in the array was last modified

**`item.attachments[i].versionUserID (string)`**<br>ID of the user who checked in the current the version of the specified attachment in the array
<hr>

## **item BOMs array**
The item object BOMs array (item.boms) is a standard JavaScript array of objects that represent individual entries or line items on the associated item's Bill of Materials tab. You can get and set row values, such as Quantity, through properties on array objects. You can also use 
properties on the array `item.boms[i].item` property to get target item properties.

### *Methods on BOMs array**

**`item.boms.addBOM({RELATED:bomEntry, QUANTITY:quantity, CUSTOM_FIELDS:fields, ITEM_NUMBER:itemNumber, QUOTE:quote})`**<br>Adds an entry to the associated item's Bill of Materials tab passing values through an associative array of name:value pairs.
Note: fields is a JavaScript associative array of custom field ID:value pairs, i.e., {FIELD_1:value_1, FIELD_2:value_2, ...}.

**`item.boms.addBOM(bomItem, quantity, fields, itemNumber, quote)`**<br>Adds an entry to the associated item's Bill of Materials tab passing values as properties on array objects. See note above regarding fields.

**`item.boms.clear()`**<br>Empties the BOMs array (removes all BOM entries from the Bill of Materials tab.

**`item.boms[i].remove()`**<br>Removes the specified BOM entry in the array from the Bill of Materials tab

**`item.boms[i].setQuote(quote)`**<br>Sets the selected Quote for the specified BOM entry in the array, passing values in a quote object. See `item.sourcing[i].quote`.

### **Properties on BOMs array objects**

**`item.boms (JavaScript array)`**<br>Array of objects that represent entries or line items in the associated item's Bill of Materials tab

**`item.boms[i]`**<br>The specified BOM entry in the array

**`item.boms[i].descriptor; item.boms[i].item.descriptor.descriptor (string)`**<br>The Descriptor of the target item of the specified BOM entry in the array (read-only)

**`item.boms[i].id; item.boms[i].item.master.dmsID (string)`**<br>The dsmID of the target item of the specified BOM entry in the array (read-only)

**`item.boms[i].item`**<br>The target item object of the specified BOM entry in the array (read-only)

**`item.boms[i].itemNumber (int)`**<br>The number of the specified BOM entry in the array (the # column on the tab; read-only)

**`item.boms[i].quantity; item.boms[i].qty (int)`**<br>The quantity of the specified BOM entry in the array (the Quantity column on the tab; read-write)

**`item.boms[i].CUSTOM_FIELD (string)`**<br>Value of CUSTOM_FIELD for the specified BOM entry in the array (read-write)

**`item.boms[i].quote`**<br>Object in the Sourcing Quote array for the selected Quote of the specified BOM entry in the array (read-write). Seeitem.sourcing[i].quote.

- **`item.boms[i].quote.comment (string)`**<br>User-provided comment on selected Quote (read-write)

- **`item.boms[i].quote.id (int)`**<br>dsmId of selected Quote (read-only)

- **`item.boms[i].quote.leadTime (string)`**<br>Order lead time associated with the selected Quote (read-write)

- **`item.boms[i].quote.leadTimeType (int)`**<br>Type of order lead time associated with the selected Quote: 1 = Days, 7 = Weeks, 30 = Months, 365 = Years (read-write)

- **`item.boms[i].quote.max (int)`**<br>Maximum number of order units associated with the selected Quote (read-write)

- **`item.boms[i].quote.min (int)`**<br>Minimum number of order units associated with the selected Quote (read-write)

- **`item.boms[i].quote.sourcing.comment (string)`**<br>User-provided comment on the specified BOM entry in the array (read-write)

- **`item.boms[i].quote.sourcing.manufacturer (string)`**<br>Name of the manufacturer associated with the specified BOM entry in the array (read-write)

- **`item.boms[i].quote.sourcing.manufacturerPartNumber (string)`**<br>Manufacturer Part Number associated with the specified BOM entry in the array (read-write)

- **`item.boms[i].quote.sourcing.quote (JavaScript array)`**<br>Entries in the list of quotes for the specified parent BOM entry in the array (read-only)

- **`item.boms[i].quote.sourcing.supplier (string)`**<br>Name of the supplier associated with the specified BOM entry in the array (read-write)

- **`item.boms[i].quote.sourcing.supplierPartNumber (string)`**<br>Supplier Part Number associated with the specified BOM entry in the array (read-write)

- **`item.boms[i].quote.sourcing.CUSTOM_FIELD (string)`**<br>Value of CUSTOM_FIELD for the specified BOM entry in the array (read-write)

- **`item.boms[i].quote.unitCost (string)`**<br>Cost per unit associated with the selected Quote (read-write)

- **`item.boms[i].quote.CUSTOM_ID (string)`**<br>Value of CUSTOM_ID for the selected Quote (read-write)
<hr>

## item Sourcing array
The item object Sourcing array (item.sourcing) is a standard JavaScript array of objects that represent individual entries on the associated item's Sourcing tab. You can get and set entry property values through properties on Sourcing array objects, as noted.
The list of quotes associated with a Sourcing entry are automatically loaded into the array object's item.sourcing[i].quoteproperty as a standard JavaScript array of objects that represent the individual entries in the list (Quote array). You can get and set entry values through properties on Quote array objects, as noted.
### Methods on Sourcing array
item.sourcing.addSourcing({SUPPLIER:supplierItem, SUPPLIER_PART_NUM:manufacturerPartNumber, COMMENT:comment, CUSTOM_FIELDS:fields})
Adds an entry to the associated item's Sourcing tab passing values through an associative array of name:value pairs.
Note: fields is a JavaScript associative array of custom field ID:value pairs, i.e., {FIELD_1:value_1, FIELD_2:value_2, ...}.
item.sourcing.addSourcing(supplierItem, manufacturerPartNumber, comment, fields)
Adds an entry to the associated item's Sourcing tab passing values through properties on array objects. See note above regarding fields.
item.sourcing.addSourcing(supplierItem)
Adds an entry to the associated item's Sourcing tab passing values in a supplierItem object
item.sourcing.clear()
Empties the Sourcing array (removes all entries from the Sourcing tab)
Important: Script code must take into account Quotes that are in use by other items
item.sourcing[i].remove()
Removes the specifed entry in the array from the Sourcing tab
Important: Script code must take into account Quotes that are in use by other items
Methods on Quotes array
item.sourcing[i].addQuote(min, max, leadTime, leadTimeType, unitCost, comment)
Adds an entry to the list of quotes for the specified parent Sourcing entry, passing values through properties on Quote array objects.
leadTimeType = 'DAYS', 'WEEKS', 'MONTHS', 'YEARS'
item.sourcing[i].quote[i].remove()
Removes the specified entry in the Quote array from the parent Sourcing entry's list of quotes
Important: Script code must take into account Quotes that are in use by other items
### Properties on Sourcing array objects
item.sourcing (JavaScript array)
Array of objects that represent individual entries in the associated item's Sourcing tab
item.sourcing[i]
The specified entry in the Sourcing array
item.sourcing[i].comment (string)
User-provided comment on the specified Sourcing entry in the array (read-write)
item.sourcing[i].manufacturer (string)
Name of the manufacturer associated with the specified Sourcing entry in the array (read-write)
item.sourcing[i].manufacturerPartNumber (string)
Manufacturer Part Number associated with the specified Sourcing entry in the array (read-write)
item.sourcing[i].quote (JavaScript array)
Entries in the list of quotes for the specified parent Sourcing entry in the array (read-only)
item.sourcing[i].supplier (string)
Name of the supplier associated with the specified Sourcing entry in the array (read-write)
item.sourcing[i].supplierPartNumber (string)
Supplier Part Number associated with the specified Sourcing entry in the array (read-write)
item.sourcing[i].CUSTOM_FIELD (string)
Value of CUSTOM_FIELD for the specified Sourcing entry in the array (read-write)
Properties on Quotes array objects
item.sourcing[i].quote[i].comment (string)
User-provided comment on the specified Quote entry in the array (read-write)
item.sourcing[i].quote[i].default (Boolean)
Is the specified Quote entry in the array the Default? True = Yes, False = No (read-only)
item.sourcing[i].quote[i].id (int)
dmsID of the specified Quote entry in the array (read-only)
item.sourcing[i].quote[i].leadTime (string)
Order lead time associated with the specified Quote entry in the array (read-write)
item.sourcing[i].quote[i].leadTimeType (int)
Type of lead time associated with the specified Quote entry in the array: 1 = Days, 7 = Weeks, 30 = Months, 365 = Years (read-write)
item.sourcing[i].quote[i].max (int)
Maximum number of order units associated with the specified Quote entry in the array (read-write)
item.sourcing[i].quote[i].min (int)
Minimum number of order units associated with the specified Quote entry in the array (read-write)
item.sourcing[i].quote[i].unitCost (string)
Cost per unit associated with the specified Quote entry in the array (read-write)
item.sourcing[i].quote[i].CUSTOM_FIELD (string)
Value of CUSTOM_FIELD for the specified Sourcing entry in the array (read-write)
<hr>

## **item Workflow Actions array**
The item object Workflow Actions array ( item.workflowActions) is an array of workflow actions that have been performed on the associated item. You can get workflow item values using properties on array objects.
Important: The last performed workflow action is at the 0 index position in the array.
### **Properties on Workflow Actions array objects**

**`item.workflowActions[i].comments (string)`**<br>Comments saved with the specified workflow action in the array

**`item.workflowActions[i].step (int)`**<br>Step number of the specified workflow action in the array

**`item.workflowActions[i].timeStamp (JavaScript date)`**<br>Date and time the specified workflow action in the array was performed

**`item.workflowActions[i].transition`**<br>Transition associated with the specified workflow action in the array

 - **`item.workflowActions[i].transition.customID (string)`**<br>Custom ID of the transition. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.fromState.customID (string)`**<br>Custom ID of the associated item's state before the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.fromState.longName (string)`**<br>Description of the associated item's state before the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.fromState.shortName (string)`**<br>Name of the associated item's state before the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.fromState.stateID (int)`**<br>ID of the associated item's state before the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.shortName (string)`**<br>Name of the transition associated with the specified workflow action in the array. See Transition Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.toState.customID (string)`**<br>Custom ID of the associated item's state after the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.toState.longName (string)`**<br>Description of the associated item's state after the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[1].transition.toState.shortName (string)`**<br>Name of the associated item's state after the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.toState.stateID (int)`**<br>ID of the associated item's state after the occurrence of the transition associated with the specified workflow action in the array. See State Properties in the Workflow Editor.

 - **`item.workflowActions[i].transition.transitionID (int)`**<br>ID of the transition associated with the specified workflow action in the array. See Transition Properties in the Workflow Editor.

**`item.workflowActions[i].userID (string)`**<br>ID of the user who performed the specified workflow action in the array
<hr>

 
## item Workflow Items array
The item object Workflow Items array (item.workflowItems) is a standard JavaScript array of objects that represent the individual linked items on the associated item's Linked Items or Managed Items tab (target items). You can get and set workflow item properties through properties on array objects (for example item.workflowItems[0].COMMENTS). You can also use properties on array objects to get target item data.
Note: In Revisioning Workspaces, the Linked Items tab becomes the Managed Items tab to enable product lifecycle management.
### Methods on Workflow Items array
**`item.workflowItems.addItem({RELATED:workFlowItem, CUSTOM_FIELD_1:value_1, CUSTOM_FIELD_2:value_2})`**<br>Adds a workflow item to the associated item's Linked Items or Managed Items tab, passing values through an associative array of name:value pairs.

**`item.workflowItems.addItem({RELATED:workFlowItem, value_1, value_2, value_n})`**<br>Adds a workflow item to the associated item's Linked Items or Managed Items tab, passing workflow item properties through properties on array objects.

**`item.workflowItems.addItem({RELATED:workFlowItem})`**<br>Adds a workflow item to the associated item's Linked Items or Managed Items tab, passing workflow item properties in aworkFlowItem object.

**Tip:** To set other properties when adding:
```js
var workFlowItem = item.workflowItems.addItem({RELATED:targetItem, [...etc...] });
workFlowItem.lifecycle = 'Lifecycle Transition Name';
workFlowItem.CUSTOM_FIELD_ID = 'CUSTOM_FIELD_VALUE';
```
**Tip:** To modify an existing workflow item:
```js
var workFlowItem = item.workflowItems[i];
workFlowItem.item = newTargetItem;
workFlowItem.lifecycle = 'Lifecycle Transition Name';
workFlowItem.CUSTOM_FIELD_ID = 'CUSTOM_FIELD_VALUE';
```

item.workflowItems.clear()
Empties the workflow items array (removes all workflow items from the Workflow Items tab)
item.workflowItems[i].remove()
Removes the specified workflow item in the array from the Workflow Items tab
### Properties on Workflow Items array objects

**`item.workflowItems[i].item`**<br>
Target item of the specified workflow item in the array
`item.workflowItems[i].item = NEW_TARGET_ITEM` changes the target of the specified workflow item in the array to the value assigned to `NEW_TARGET_ITEM.descriptor` and id properties are also changed accordingly.

**`item.workflowItems[i].descriptor (string)`**<br>
Descriptor of the target item of the specified workflow item in the array (read-only)

**`item.workflowItems[i].id (int)`**<br>
dmsID of the target item of the specified workflow item in the array (read-only)

**`item.workflowItems[i].lifecycle (string)`**<br>
Name of the current Lifecycle transition of the specified workflow item in the array (read-write)
item.workflowItems[i].lifecycle = 'Lifecycle Transition Name' sets the Lifecycle transition of the specified workflow item in the array to the string value assigned to Lifecycle Transition Name.
 

**`item.workflowItems[i].item.CUSTOM_FIELD_ID (string)`**<br>
Value of the user-defined CUSTOM_FIELD_ID field for the target item of the specified workflow item in the array (read-write)
item.workflowItems[i].item.CUSTOM_FIELD_ID = 'NEW_CUSTOM_FIELD_VALUE' changes CUSTOM_FIELD_ID to the string value assigned to NEW_CUSTOM_FIELD_VALUE.
<hr>

## item Milestones array
The item object Milestones array (`item.milestones`) is a standard JavaScript array of objects that represent individual milestones in the item's Milestones tab. You can get milestone properties through properties on array objects.

### Methods on Milestones array

**`item.milestones[i].setWorkflowState('Workflow State Name')`**<br>
Sets the workflow state of the milestone specified in the array (the item.milestones[i].workflowState property) to 'Workflow State Name', which takes as its value the item's milestones[i].workflowState.workflowStateName property.
Note: To add a milestone, see item.addMilestone().
### Properties on Milestones array objects

**`item.milestones[i].milestoneDate (JavaScript date)`**<br>
Target date of the specified milestone in the array ( Target Date in the Milestones tab)

**`item.milestones[i].milestoneType (string)`**<br>
Transition type of the specified milestone in the array. ENTER = transition to the associated workflow state. EXIT = transitionfrom the associated workflow state ( Milestone Event in the Milestones tab)

**`item.milestones[i].progress (int)`**<br>
Percentage of the item's workflow that is complete when the specified milestone in the array is reached ( Workflow Progress (%) in the Milestones tab)

**`item.milestones[i].warnThreshold (int)`**<br>
Warning threshold of the specified milestone in the array, defined as number of days beforeitem.milestones[i].milestoneDate ( Warning Period in the Milestones tab)

**`item.milestones[i].workflowState`**<br>
Workflow state associated with the specified milestone in the array ( Workflow State in the Milestones tab)

**`item.milestones[i].workflowStateName (string)`**<br>
Name of the workflow state associated with the specified milestone in the array (as entered in Workflow Editor State Properties).

**`item.milestones[i].workflowStateID (int)`**<br>
ID of the workflow state associated with the specified milestone in the array (as shown in Workflow Editor State Properties).
<hr>

## **item.project Object**
The item.project object is a property on the item object. Tasks in the associated item's Project Management tab are automatically loaded into item.project as an array (item.project.tasks). Through properties on array objects, you can traverse and read data from the items that tasks are linked to (target items), including workflow- and revision-controlled items, items with milestones, and other project items with their own tasks (children tasks/subtasks).
### **Methods on item.project Tasks array**
`item.project.addTask('title', start_date, end_date, 'progress');`<br>`item.project.addTask(target, start_date, end_date, 'progress');`<br>
Adds a manual task ( title) or a linked task ( target) to the associated item's Project Management tab, passing task properties through properties on array objects.
item.project.addTask(task);
Adds a manual or linked task to the associated item's Project Management tab, passing task properties in a task object.
item.project.clear()
Empties the tasks array (removes all tasks from the Project Management tab)

**`item.project.children[i].remove()`**<br>Removes the specified task in the array from the Project Management tab
### **Properties on item.project Tasks array**
item.project.children[i].children (JavaScript array)
Array of children of the specified task in the array (sub-tasks); only on tasks linked to other project items (project tasks); children tasks can be manual, workflow/revision-controlled, milestone, or other project tasks

**`item.project.children[i].duration (string)`**<br>Duration, in days, of the specified task in the array ( Duration on the Project Management tab)

**`item.project.children[i].end_date (JavaScript date)`**<br>End date of the specified task in the array ( End on the Project Management tab)

**`item.project.children[i].id (int)`**<br>Number of the specified task in the array ( #on the Project Management tab)

**`item.project.children[i].owner (string)`**<br>Item that owns the specified task in the array.

**`item.project.children[i].owner_descriptor (string)`**<br>Descriptor of the item that owns the specified task in the array

**`item.project.children[i].owner_id (int)`**<br>dmsID of the item that owns the specified task in the array

**`item.project.children[i].predecessors (JavaScript array)`**<br>Array of predecessor tasks of the specified task in the array (tasks in Pre column on the Project Management tab)

**`item.project.children[i].priority (string)`**<br>Priority of the status of the specified task in the array

**`item.project.children[i].progress (string)`**<br>Percentage completed to date of the specified task in the array ( % Complete on the Project Management tab)

**`item.project.children[i].start_date (JavaScript date)`**<br>Start date of the specified task in the array ( Start on the Project Management tab)

**`item.project.children[i].state (string)`**<br>Workflow state of the target item of the specified task in the array; only on tasks linked to workflow-controlled items (workflow-controlled tasks)

**`item.project.children[i].status (string)`**<br>Status of the specified task in the array ( Status on the Project Management tab)
 
**`**`item.project.children[i].subTasks (JavaScript array)`**<br>`**Array of children (sub-tasks) of the  - pecified task in the array that return values on:
- `target_id`
- `title`
- `start_date`
- `end_date`
- `duration`
- `progress`
- `predecessors`
- `subTasks`
- `children`
- `status`
- `owner`
- `target`


**`item.project.children[i].target`**<br>Item the specified task in the array is linked to

**`item.project.children[i].target_descriptor (string)`**<br>Descriptor of the target item of the specified task in the array

**`item.project.children[i].target_id (int)`**<br>dmsID of the target item of the specified task in the array

**`item.project.children[i].title (string)`**<br>Title or name of the specified task in the array ( Title/Item on the Project Management tab)

**`item.project.children[i].type (string)`**<br>Type of the specified task in the array
<hr>

## **item.master Object**
The item.master object is a property on the item object. The associated item's ownership data is automatically loaded into item.master for read/write access through properties on the object.
Properties on item.master
item.master.additionalOwners (JavaScript array)
Standard array of IDs of the users who are currently Additional Owners of the associated item
item.master.groupAdditionalOwners (JavaScript array)
Standard array of user groups that are currently Additional Owners of the associated item
item.master.owner (string)
ID of the user who currently owns the associated item
item.master.workspaceID (string)
ID of the workspace for the associated item
item.master.dmsID (string)
ID of the associated item
 
## **Security Object**
Security is a pre-defined top-level object. You can use methods on the object to get information on Security users, groups, and roles.
### **Methods on Security**

**`Security.inGroup(userID, 'GROUP_NAME')`**<br>Checks if the user specified by userID is in the user group specified by 'GROUP_NAME'.

**`Security.inRole(userID, 'ROLE_NAME')`**<br>Checks if the user specified by userID is assigned to the user role specified by 'ROLE_NAME'.

**`Security.listGroups(userID)`**<br>Returns a list of groups the user belongs to.

**`Security.listRoles(userID)`**<br>Returns a list of roles assigned to the user.

**`Security.listUsersInGroup('GROUP_NAME')`**<br>Loads an array of user records from the user group specified by 'GROUP_NAME'.

**`Security.listUsersInRole('ROLE_NAME')`**<br>Loads an array of user records from the user role specified by 'ROLE_NAME'.

**`Security.loadGroup('GROUP_NAME')`**<br>Returns the user group specified by 'GROUP_NAME'.

**`Security.loadUser(userID)`**<br>Returns a user object.

**`Security.searchUsers(userProperties); Security.searchUsers({key:value, ...})`**<br>Returns an array of user records matching the property values passed as a user properties object or as an associative array of name:value pairs. Supported properties are:
- `address1`: 'ADDRESS_1',
- `address2`: 'ADDRESS_2',
- `cellular`: 'CELL_PHONE_NO',
- `city`: 'CITY',
- `country`: 'COUNTRY',
- `dateFormat`: 'PREFERRED_DATE_FORMAT',
- `description`: 'AUTODESK_ACCOUNT_ABOUT_ME',
- `email`: 'EMAIL_ADDRESS',
- `fax`: 'FAX_NO',
- `firstName`: 'FIRST_NAME',
- `groupName`: 'USER_GROUP_NAME',
- `id`: 'AUTODESK_ID',
- `lastName`: 'LAST_NAME',
- `licenseType`: 'LICENSE_TYPE',
- `organization`: 'ORGANIZATION',
- `phone`: 'PHONE_NO',
- `postal`: 'POSTAL/ZIP_CODE',
- `showThumbnailPreference`: 'THUMBNAIL_PREFERENCE' ,
- `title`: 'ORGANIZATION_TITLE',
- `uomPreference`: 'UNIT_OF_MEASURE_PREFERENCE',
- `userStatus`: 'USER_STATUS',
- `userTimeZone`: 'USER_TIME_ZONE',
- `stateProvince`: 'STATE/PROVINCE'.
Values can use wildcards, with '*' matching any substring. Returned user records match ALL properties, with the following exceptions:
- `dateFormat`:  Must match one of "dd/mm/yy", "mm/dd/yy", "yy/mm/dd", or "dd.mm/yy".
- `groupName`:  Must match a user group name, and returned users can belong to ANY of the matching groups.
- `licenseType`:  Must match one of "Professional" or "Participant" (case-insensitive).
- showThumbnailPreference: Must match one of "Y", "Yes", "N", "No", "T", "True", "F", "False" (case-insensitive).
- `userStatus`:  Must match one of "active", "inactive", or "deleted" (case-insensitive).
- `uomPreference`:  Must match one of "english" or "metric".
- `userTimeZone`:  Must match a GMT standard time zone.
<hr>

## **`Sequencer([name],[start],[step]) Object`**
Sequencer() is a pre-defined top-level object. You can create an automatically incrementing sequence by specifying a name (required), a starting number (optional) and a step (optional).
Examples:
- Sequencer(name)
- Sequencer(name,start)
- Sequencer(name, start, step)

If [start] and [step] are not present, the default values are 1 and 1. When setting a start value, [start] must be >= 0. When setting a step value, [step] must be >= 1.

If sequencer [name] does not exist, a new sequencer is created. If sequencer [name] already exists and the provided [step] value matches the existing [step] value, then the existing sequencer object is used. If sequencer [name] exists but the [step] values do not match, then creating the new sequencer fails.

### **Methods on Sequencer()**

**`Sequencer(name[,start[,step]])`**<br>
Gets an existing sequencer if sequencer(name) exists. If sequencer(name) does not exist, a new sequencer is created with the parameters ( name, 1, 1).

**`Sequencer.list()`**<br>
Returns an array of sequencers.

**`nextValue()`**<br>
Returns next increment value for an object of type Sequencer: var seq = seq.nextValue();
 
### **Properties on Sequencer**

**`name`**<br>
A label for the sequence. Read-only

**`start`**<br>
The initial value for the sequence. If omitted, default value is 1. Minimum value is 0. Read-only.

**`step`**<br>
The increment by which to increase the sequence. If omitted, default value is 1. Minimum value is 1. Read-only.

**Warning:** Sequencer scripts always increment the named sequence even when you are testing or debugging the script. When testing, use a test sequence name to avoid increasing numbers on actual named sequences used in production.
## **`Email()` Object**
Email() is a pre-defined top-level object. You create an Email() object to send an email message to one or more email addresses. Message attributes are passed through properties on the object.
### **Methods on Email()**
`Email.send()` - Sends the email message created with the Email() object .
### **Properties on Email()**
Assign a value to a property as a string or as a property on the item object. For example, if the item has an email address as one of its fields (EMAIL_ADDRESS) and you want to send a message to that address, assign the value item.EMAIL_ADDRESS to the toproperty.

**`to`**<br>
Single email address or list of email addresses delimited by a comma (,)

**`bc`**<br>
Same as to but sent in bc header of the message

**`bcc`**<br>
Same as to but sent in bcc header of the message

**`subject`**<br>
Subject of the email message; string or passed as a property on the item object

**`body`**<br>
Body of the email message. HTML or plain text string (see contenttype) OR passed as a property on the item object OR data passed from the associated item via a given Advanced Print View. See getPrintView().

**`contenttype`**<br>
Message header that identifies the format of the message body; supported formats are HTML ( text/html( or plain text (text/plain). The default value is text/html.
<hr>

## **Classifications**
Read-only scripting is supported for Classifications.
### **Text and Number**
**`item.classification.FIELD_ID or item.classification[“FIELD_ID”] (string)`**<br>
Returns the value, or default value, associated with the field.
### **Pick Lists**
**`item.classification.FIELD_ID.displayValue or item.classification.FIELD_ID["displayValue"] (string)`**<br>
Returns the currently selected value in the pick list. The parameter used here, "displayValue", gives you the latest name for the value as specified in the PLM interface. This might not be the same as the original name, which is always retrievable using "value" instead of "displayValue". In other words, if the value has been renamed in the PLM interface, "displayValue" will retrieve this latest name.

**`item.classification.FIELD_ID.value or item.classification.FIELD_ID["value"] (string)`**<br>
Returns the currently selected value in the pick list. The parameter "value" gives you the original name for the value, even if the name has since been changed using the PLM interface. In other words, even if the value has been renamed in the PLM interface, "value" will retrieve the original name.

When retrieving a pick list value, if "value" or "displayValue" is not specified, then [object Object] is returned.
To print the object, use `println(JSON.stringify(item.classification.FIELD_ID));`

