# pull-to-action

This polymer element performs a pull to refresh animation with a callback to the action that needs to be performed when a user pulls down the screen from the top.

## Attributes

| Attribute Name | Description | Default |
|----------------|-------------|-------------|
| action | A callback function that says what action should be performed | alert("You need to set the action attribute") |
| color | Sets color of the refresh icon | #ccc |
| distance | How far the user has to drag the screen | 100 |
| container | ID of container element, if this is to be body to need you give body the id body | body |
