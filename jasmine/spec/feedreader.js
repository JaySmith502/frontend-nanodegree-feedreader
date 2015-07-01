// TODO:  explain/personalize my code in the TODO blocks--DONE;
// TODO:  correct implementation of Math.random in the final suite--DONE;
// TODO:  remove empty line at line 85-87--DONE;
// TODO:  remove done(); it's unnecessary--DONE;
// TODO:  implement the empty() in the New Feed Selection suite to keep old tests from impacting current test--DONE;
// TODO:  delete done() from end of 'New Feed Selection' suite--DONE;
// TODO:  rerun code through jsbeautifier.org, likely have messed it up a bit with these corrections;
// TODO:  rewrite README and remove stock wording;

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
        //breaking the allFeeds in html causes the test to fail
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         **space
         **Used allFeeds.forEach to iterate through each instance of the feeds
         **toBeDefined worked as needed here, and used not.toBe(0) to ensure something there as needed
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
        //**do this the same as the URL test above, works as above
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        //assign local variable to menuVisibility and menuClicker for global use within this suite
        var menuVisibility = $('body').attr("class");
        var menuClicker = $(".menu-icon-link");
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         * separate TODO from my comments
         **check for the css class 'menu-hidden' which tells us this element is not visible
         */
        it('is hidden by default', function() {
            expect(menuVisibility).toBe('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        //**clicks on the menu to open and close it to check it's inheritance of 'menu-hidden' or lack thereof
        it("toggles visibility", function() {

            menuClicker.click();
            expect($('body').hasClass("menu-hidden")).toEqual(false);

            menuClicker.click();
            expect($('body').hasClass("menu-hidden")).toEqual(true);

        });
    });

    /* TODO: Write a new test suite named "Initial Entries"*/
    describe('Initial Entries', function() {
        /* use beforEach to call the feeds before the test runs
         * this will load up the first feed in the array, which will allow 'it' to check it against our criteria
         */
        beforeEach(function(done) {

            loadFeed(0, done);
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         * space
         **after the beforeEach function loads the feed, below checks to see if it has length>0, which indicates something is there
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
        //according to Udacity reviewer my use of Math.random is buggy because it only returns between 0 and 1, so I'm going to scrap that and go with something a little more direct
        //var feedChoice = Math.random(1, 3);--Buggy needs to be replaced
        //replaced old feedChoice with Math.floor(Math.random() * 3) + 1;
        var feedChoice = Math.floor(Math.random() * 3) + 1;
        //create global variable within this scope to push from beforeEach function;
        var oldFeedContent;
        //use .empty() to refresh feed container and keep test from being impacted by leftover content from previous test
        beforeEach(function(done) {
            loadFeed(0, function() {
                $('.feed').empty();
                oldFeedContent = $('.feed').html();
                loadFeed(feedChoice, done);
            });
        });
        // use expect to see if the newly chosen .feed is different than the original invoked in the beforeEach function above
        it('actually displays new content', function() {
            expect($('.feed').html()).not.toBe(oldFeedContent);
        }, 2000);

    });

}());
