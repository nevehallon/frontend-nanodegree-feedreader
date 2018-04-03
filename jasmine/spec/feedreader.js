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
    /*A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('and URLs are defined', function() {
      for (let i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe(0);
      }
    });


    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('and names are defined', function() {
      for (let i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe(0);
      }
    });
  });


  /* A test suite named "The menu" */
  describe('The menu', function() {
    /* A test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* A test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * has two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    it('visibility toggles when clicked', function() {
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* A test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    let container = $('.feed'),
      entriesLen;

    beforeEach(function(done) {
      loadFeed($('.feed-list a').data('id'), function() {

        entriesLen = container.children().length;
        done();
      });
    });

    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('are loading', function(done) {
      expect(entriesLen).not.toBe(0);
      done();
    });
  });

  /* A test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {

    let originalTimeout;

    beforeEach(function(done) {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      $(".feed-list a:contains('Linear')").click();
      done();
    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('content is changing', function(done) {
      setTimeout(function() {
        expect($('.header-title').text()).not.toBe("Udacity Blog");
        expect($('.feed').length).not.toBe(0);
        done();
      }, 9000);
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });
}());