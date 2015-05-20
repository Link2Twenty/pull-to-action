# pull-to-action

This polymer element performs a "pull to refresh" animation with a callback to the action that needs to be performed when a user pulls down the screen from the top.

## Attributes

| Attribute Name | Description | Default |
|----------------|-------------|-------------|
| action | A callback function that for which action should be performed | alert("You need to set the action attribute") |
| color | Sets color of the refresh icon | #ccc |
| distance | How far the user has to drag the screen | 100 |
| container | ID of container element, if this is to be body you need to give body the id body | body |

## Install with bower

First you need bower, [see their site](http://bower.io/) for details 

```
bower install --save pull-to-action
```

### How to use

If you are looking at useing other peoples custom polymer elements I am going to guess you have some idea what's going on already. If not have a look at the [polymer site](http://polymer-project.org).

Put a link to pull to action in your header, it should look something like.
```html
<link rel="import" href="bower_components/pull-to-action/pull-to-action.html">
```

Now that you have imported it you can get to using it on your page
```html
<body>
<div id="scrollablecontainer">
<pull-to-action action="location.reload()" color="red" container="scrollablecontainer"></pull-to-action>
<h1>So much content</h1>
... <br>
... <br>
... <br>
</div>
</body>
```

Now with very little code we have made a simple red spinning icon to reload the page, in this instance it reload the whole URL but you could easily have a JS function to generate some JSON to repopulate the page, creating a seamless app like experience.

![example image](http://s8.postimg.org/9d6yced8l/example.png)

#### Running Unit Tests

Make sure that you have `wct` installed on your local machine. To get more details about `wct`, please look into the [Unit Testing Polymer Elements](https://www.polymer-project.org/0.5/articles/unit-testing-elements.html) article.

- The unit tests for `pull-to-action` element is in the test folder. You can run the tests by typing the command `wct` from the root folder of the project. 
- To add or remove browsers that needs to be tested, look into `wct.conf.js` file. 
- You can add more test cases in `test/pull-to-action-tests.js`

#### What you can make

Here is a little example of what it can look like baked into a real app
![Screenshot](http://gifyu.com/images/firstPatch.gif)

I hope you get some good use out of this, and please don't feel embarrassed to submit bug reports, or pull requests.
