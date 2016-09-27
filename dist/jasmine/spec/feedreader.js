/* feedreader.js */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a URL defined for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have a name defined for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* This writes a new test suite named "The menu" */
    describe('The Menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default.
         */
         it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });


         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should change visibility when toggle-clicked', function() {
            var menuIcon = $('.menu-icon-link'),
                slideMenu = $('div.slide-menu');
            $(menuIcon).click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $(menuIcon).click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });


    /* This writes a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have at least one entry', function() {
            expect($('.feed').children()).toBeDefined();
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* This writes a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var oldFeed, newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed .entry').children().html();
                // console.log(oldFeed);
                done();
            });
        });

        it('should change content when a new feed is loaded', function (done) {
            loadFeed(0, function() {
                newFeed = $('.feed .entry').children().html();
                // console.log(newFeed);
                expect(newFeed).not.toMatch(oldFeed);
                done();
            });
        });
    });

}());
