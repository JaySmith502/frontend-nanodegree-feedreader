/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs and they are defined', function() {
            //had to use lower case url instead of URL, this throws a Jasmine error
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        //do this the same as the URL test above
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {

        var menuVisibility = $('body').attr("class");
        var menuClicker = $(".menu-icon-link");
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(menuVisibility).toBe('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("toggles visibility", function() {

            menuClicker.click();
            expect($('body').hasClass("menu-hidden")).toEqual(false);

            menuClicker.click();
            expect($('body').hasClass("menu-hidden")).toEqual(true);

        });
    });




    /* TODO: Write a new test suite named "Initial Entries"*/
    describe('Initial Entries', function() {
        //use beforEach to call the feeds before the test runs
        beforeEach(function(done) {

            loadFeed(0, done);
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('show at least a single entry at completion of call', function(done) {

            expect($(".entry").length).not.toBe(0);
            done();

        });
    });
    /* TODO: Write a new test suite named "New Feed Selection"*/

    describe('New Feed Selection', function() {
        /** TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.*/

         //used Math.random so test could iterate through any feed choice on the current menu, for future iterations a counter could be used to address the addition of more feeds or just hard code the end number
        var feedChoice = Math.random(1, 3);
        var oldFeedContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeedContent = $('.feed').html();
                loadFeed(feedChoice, done);
            });

            done();

        });

        it('actually displays new content', function() {
            expect($('.feed').html()).not.toBe(oldFeedContent);
        }, 2000);

    });

}());