# < pull-to-action >
Have a quick look at the [Component page](http://link2twenty.github.io/pull-to-action) 

## What is it?
"pull-to-action" is a polymer element to perform a pull to refresh like animation and action within web apps.

Before we get started here is a little example of what it can look like baked into a real app

![Screenshot](https://media.giphy.com/media/l2JJraDUGjqLQQQyQ/giphy.gif)

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

![example image](https://media.giphy.com/media/3ornk5BJKhkSN6fTbO/giphy.gif)

##### Running Unit Tests

Make sure that you have `wct` installed on your local machine. To get more details about `wct`, please look into the [Unit Testing Polymer Elements](https://www.polymer-project.org/0.5/articles/unit-testing-elements.html) article.

- The unit tests for `pull-to-action` element is in the test folder. You can run the tests by typing the command `wct` from the root folder of the project. 
- To add or remove browsers that needs to be tested, look into `wct.conf.js` file. 
- You can add more test cases in `test/pull-to-action-tests.js`

## Advanced
### Using the actionTimer hook
The actionTimer hook is in place to get the element to keep spinning while you load in your data, it is not needed but makes the app seem more responsive. I will show you a test app twice using iron-ajax and pull-to-action, once with the hook implemented and once without.

Below is a simple element called reddit-scan, it uses iron-ajax to create a list of the lastest posts to reddit 

```
<dom-module id="reddit-scan">
  <template>
    <iron-ajax
      auto id="ajaxGet"
      url="https://www.reddit.com/new/.json"
      handle-as="json"
	  loading={{loading}}
      last-response="{{response}}"></iron-ajax>

	  <paper-material elevation="1">Page is loading content: <b>{{loading}}</b><i></i></paper-material>
      <template is="dom-repeat" items="{{response.data.children}}">
          <paper-material elevation="1">
            <div class="header"><a href="{{item.data.url}}"><b>{{item.data.title}}</b></a></div>
            <span class="subreddit">Posted in <i>{{item.data.subreddit}}</i> by <i>{{item.data.author}}</i></span>
          </paper-material>
      </template>
  </template>
</dom-module>
```

### With actionTimer implemented

Here is the script section, with actionTrigger implemented

```
Polymer({
  is: 'reddit-scan',
	properties: {
		loading: {
			type: String,
			notify: true,
			observer: '_checkLoading' // This will run _checkLoading when loading changes
		},
		error: {
			type: String,
			notify: true,
			observer: '_checkLoading'
		}
	},
  doSend: function () {
		this.$.ajaxGet.generateRequest();
		actionTrigger = 1; 	// This sets actionTrigger to 1 when "document.querySelector('reddit-scan').doSend()" 
												// is called in the main application
	},
	_checkLoading: function() {
		if(!this.loading == true) { // When loading is not true
			actionTrigger = 0; // Set actionTrigger to 0, making the spinner hide.
		}
	}
});
```

![Screenshot](https://media.giphy.com/media/l2JJraDUGjqLQQQyQ/giphy.gif)

### Without actionTimer implemented
Here we have the same code but without using actionTimer

```
Polymer({
  is: 'reddit-scan',
  doSend: function () {
		this.$.ajaxGet.generateRequest();
	}
});
```
The code is quite a bit shorter but no matter how long it take to load the data the animation time will be the same. Gif below.

![Screenshot](https://media.giphy.com/media/l0IpXjo4kJLKcxqdW/giphy.gif)

## Conclusion
If you don't feel confident using actionTrigger pull-to-action will work fine without it, but if you do use it, it can make a huge difference to the aesthetics of your app.
