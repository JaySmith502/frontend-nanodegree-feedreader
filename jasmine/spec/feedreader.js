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
        /**Used allFeeds.forEach to iterate through each instance of the feeds
         **toBeDefined worked as needed here, and used not.toBe(0) to ensure something there as needed
         */
        it('have URLs and they are defined', function() {
            //had to use lower case url instead of URL, this throws a Jasmine error
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        //**do this the same as the URL test above, works as above
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The Menu', function() {
        //assign local variable to menuVisibility and menuClicker for global use within this suite
        var menuVisibility = $('body').attr("class");
        var menuClicker = $(".menu-icon-link");
        //check for the css class 'menu-hidden' which tells us this element is not visible
        it('is hidden by default', function() {
            expect(menuVisibility).toBe('menu-hidden');
        });
        //**clicks on the menu to open and close it to check it's inheritance of 'menu-hidden' or lack thereof
        it('toggles visibility', function() {

            menuClicker.click();
            expect($('body').hasClass("menu-hidden")).toEqual(false);

            menuClicker.click();
            expect($('body').hasClass("menu-hidden")).toEqual(true);

        });
    });

    describe('Initial Entries', function() {
        /* use beforeEach to call the feeds before the test runs (SETUP)
         * this will load up the first feed in the array, which will allow 'it' to check it against our criteria
         */
        beforeEach(function(done) {

            loadFeed(0, done);
        });
        //after the beforeEach function loads the feed, below checks to see if it has length>0, which indicates something is there
        it('show at least a single entry at completion of call', function(done) {

            expect($(".entry").length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        //used Math.random so test could iterate through any feed choice on the current menu, for future iterations a counter could be used to address the addition of more feeds or just hard code the end number
        //according to Udacity reviewer my use of Math.random is buggy because it only returns between 0 and 1, so I'm going to scrap that and go with something a little more direct
        //var feedChoice = Math.random(1, 3);--Buggy needs to be replaced
        //replaced old feedChoice with Math.floor(Math.random() * 3) + 1;
        var feedChoice = Math.floor(Math.random() * 3) + 1;
        //create global variable within this scope to push from beforeEach function;
        var oldFeedContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeedContent = $('.feed').html();
                loadFeed(feedChoice, done);
            });
        });
        //use afterEach (var  =  0 or null) to refresh feed container and keep test from being impacted by leftover content from previous test, using .empty() kept breaking the code
        afterEach(function() {
            oldFeedContent = 0;
        });
        // use expect to see if the newly chosen .feed is different than the original invoked in the beforeEach function above
        it('actually displays new content', function() {
            expect($('.feed').html()).not.toBe(oldFeedContent);
        }, 2000);

    });

}());
