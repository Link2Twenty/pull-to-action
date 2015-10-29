# < pull-to-action >
Have a quick look at the [Component page](http://open-elements.org/elements/pull-to-action) 
or go straight to the  [Demo](http://open-elements.org/elements/pull-to-action?view=demo:demo/index.html)
## What is it?
"pull-to-action" is a polymer element to perform a pull to refresh like animation and action within web apps.

Before we get started here is a little example of what it can look like baked into a real app

![Screenshot](http://s24.postimg.org/f8vng9l5h/new_animation.gif)

## Getting started

### Install with bower

First you need bower, [see their site](http://bower.io/) for details 

```
bower install --save pull-to-action
```

### Attributes

| Attribute Name | Functionality | Default |
|----------------|-------------|-------------|
| action* | A callback function that for which action should be performed | alert("You need to set the action attribute") |
| color | Sets color of the refresh icon | #ccc |
| container | the container element (if identifing with id start with # and . for class) | body |
| distance | How far the user has to drag the screen | 100 |
required*

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
<pull-to-action action="location.reload()" color="red" container="#scrollablecontainer"></pull-to-action>
<h1>So much content</h1>
... <br>
... <br>
... <br>
</div>
</body>
```

Now with very little code we have made a simple red spinning icon to reload the page, in this instance it reload the whole URL but you could easily have a JS function to generate some JSON to repopulate the page, creating a seamless app like experience.

![example image](http://s30.postimg.org/ok5mf53dd/simple.gif)

##### Running Unit Tests

Make sure that you have `wct` installed on your local machine. To get more details about `wct`, please look into the [Unit Testing Polymer Elements](https://www.polymer-project.org/0.5/articles/unit-testing-elements.html) article.

- The unit tests for `pull-to-action` element is in the test folder. You can run the tests by typing the command `wct` from the root folder of the project. 
- To add or remove browsers that needs to be tested, look into `wct.conf.js` file. 
- You can add more test cases in `test/pull-to-action-tests.js`

## Advanced
### Using the actionTimer hook
The actionTimer hook is in place to get the element to keep spinning while you load in your data, it is not needed but makes the app seem more responsive. I will show you a test app twice, once with the hook implemented and once without.

We will be using promises if you don't know what they are or aren't confident with them there is a nice little guide [here](http://www.sitepoint.com/overview-javascript-promises/).

### With actionTimer implemented
Below is a simple function that I will call with action.

```
var actionTrigger; // I have declared the variable at the top level so we can see it
function changeText() { // this is the function we will call with action="changeText()"
	var promise = new Promise(function(resolve, reject) {
		actionTrigger = 1; // the first thing we do is set the actionTrigger variable to 1, this lets pull-to-action know you are getting the data
		var request = new XMLHttpRequest();
		request.open('GET', 'json.js', true);

		request.onload = function() {
			if (this.status >= 200 && this.status < 400) {
				// Success!
				resolve(this.response);
			} else {
				// Not so much =(
				reject(Error(request.statusText));
			};
		}

		request.onerror = function() {
			// Normally means timeout
			reject(Error('Timeout error'));
		};
		
		request.send();
	});
	
	promise.then(function(data) {
		var parseData = JSON.parse(data);
		var out = "";
		var i;
		for(i = 0; i < parseData.update.length; i++) {
			out += '<msg-card>' + parseData.update[i].message + '</msg-card><br>';
		}
		document.getElementById("container").innerHTML = out;
		actionTrigger = 0; // now that the data has been got and we're putting the data in we can let pull-to-action know we are done by setting actionTrigger to 0, this triggers the scaleAway animation
	}).catch(function(error) {
		actionTrigger = 0; // this is stop the spinner persisting if there is an error, you can add anything in here, I quite like having a paper-toast element be called to let us know there is a problem
  });
}
changeText(); // we can use this to populate the page to start with.
```

The code might seem quite a bit longer, but promises are a good habbit to get into anyway, here is a gif of the program.

![Screenshot](http://gifyu.com/images/withactionToggle.gif)

### Without actionTimer implemented
Here we have the same code but without using promises and without using actionTimer

```
function changeText() {
	var request = new XMLHttpRequest();
	request.open('GET', 'json.js', true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
		// Success!
		var data = JSON.parse(this.response);
		var out = "";
		var i;
		for(i = 0; i < data.update.length; i++) {
			out += '<msg-card>' + data.update[i].message + '</msg-card><br>';
		}
		document.getElementById("container").innerHTML = out;
	  } else {
		// We reached our target server, but it returned an error
		alert('well this does not look right');
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	};
	
	request.send();
}
changeText();
```
The code is quite a bit shorter but no matter how long it take to load the data the animation time will be the same. Gif below.

![Screenshot](http://gifyu.com/images/withoutactionToggle.gif)

## Conclusion
If you don't feel confident using promises pull-to-action will work fine without them, but if you know how to use them, or even if you want to learn how to use them, it makes a huge difference to the aesthetics of your app.
