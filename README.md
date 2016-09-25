# Feed Reader Testing Project

## To run the Application

1. Download or fork the application from: [https://github.com/jinglebot/frontend-nanodegree-feedreader/tree/master]
2. Copy `dist` folder to local folder
3. Open localhost via python server in local directory
4. Go to localhost in Google Chrome browser
5. Use **hamburger menu icon** to see the feed list.
6. Select a list item to open a new feed.

Or:

1. Download or fork the application from: [https://github.com/jinglebot/frontend-nanodegree-feedreader/tree/master]
2. Click the *Settings* button to get to Settings Page.
3. Under *Github Pages*, click the _Your site is published at [https://jinglebot.github.io/frontend-nanodegree-feedreader/]_ .
4. You will get a _404 error message_. And so, edit the address to include the dist folder: _[https://jinglebot.github.io/frontend-nanodegree-feedreader/_ _**dist**_ _]_ (https://jinglebot.github.io/frontend-nanodegree-feedreader/dist).
5. Use **hamburger menu icon** to see the feed list.
6. Select a list item to open a new feed.


## How I completed this project

After downloading and analyzing the required project assets, I created two files: _src_ and _dist_. I stored the original copy of the project in the _src_ file and made another copy in  the _dist_ file that I refactored to complete this project.
Because of security reasons as stated in the console, the page wouldn't run successfully when I launch it from my github repo. And so, since I made a copy in my local folder, I would launch it instead from my localhost server using python.

> Edit the `allFeeds` variable in **./js/app.js** to make the provided test fail and see how Jasmine visualizes this failure in your application.

I carefully followed the instructions given at the [jasmin/spec/feedreader.js] file and tested the pass and fail functionality of the application in the **Google Chrome** browser. That was the first test.

> Write a test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
> Write a test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.

I used a _forEach_ loop for the two instructions and wrote and the respective `expect` statements:
```
expect(feed.url).toBeDefined();
expect(feed.url).not.toBe(null);

expect(feed.name).toBeDefined();
expect(feed.name).not.toBe(null);
```

> Write a new test suite named `"The menu"`.
> Write a test that ensures the menu element is hidden by default.
> Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.

In this test, I didn't know how many times the menu icon should be clicked to pass. I tried using a _for loop_ so I'd have an exact number of times for clicking the menu icon and placed the `expect` statements inside the click event callback function. But as advised by Karol in the 1:1 Appointment, I only needed to keep it simple and wrote two `click` statements instead followed by an `expect` statement each:
```
$(menuIcon).click();
expect($('body').hasClass('menu-hidden')).toBe(false);
$(menuIcon).click();
expect($('body').hasClass('menu-hidden')).toBe(true);
```

> Write a test suite named `"Initial Entries"`.
> Write a test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.

Since this test is for an async function like `loadFeed`, I just supplied what are required, and those are: to use the `beforeEach` and `done` functions,
```
beforeEach(function(done) {
    loadFeed(0, function() {
        done();
    });
});
```
And then, I wrote the `expect` statements to check that the _feed_ class would have at least one child _entry_ class and not equal to zero.
```
expect($('.feed .entry').length).not.toBe(0);
```

> Write a test suite named `"New Feed Selection"`.
> Write a test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.

To do this test, I figured you only need to compare the content of the page before and after a new feed is loaded. Since it's `async`, I also needed to put the `done()` in the `beforeEach()`. But I don't think I'd be able to get the ajax response as my content copy. So, I tried capturing the `html` content of the page instead. I had problems on how to correctly format the statements and if I needed to check loading each of the feed from `allFeeds`. But, from the forum discussions, I ended up keeping it simple with this:
```
var oldFeed, newFeed;

beforeEach(function(done) {
    loadFeed(0, function() {
        oldFeed = $('.feed .entry').children().html();
        // console.log(oldFeed);
        done();
    });
});

it('should change content when a new feed is loaded', function (done) {
    loadFeed(1, function() {
        newFeed = $('.feed .entry').children().html();
        // console.log(newFeed);
        done();
    });

    expect(newFeed).not.toMatch(oldFeed);
});
```
