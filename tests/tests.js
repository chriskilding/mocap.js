/*global require, define, test, expect, strictEqual, location */
(function () {

    // Defer Qunit so RequireJS can work its magic and resolve all modules.
    QUnit.config.autostart = false;

    // Configure RequireJS so it resolves relative module paths
    require.config({
      baseUrl: '../mocap'
    });
    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
      //Set location of mocap to the dist location
      require.config({
        paths: {
          'mocap': '../dist/mocap'
        }
      });
    }

	// A list of all QUnit test Modules.  Make sure you include the `.js` 
	// extension so RequireJS resolves them as relative paths rather than using
	// the `baseUrl` value supplied above.
	var testModules = [
    "BroadcasterTests.js",
    "JointUpdaterTests.js",
    "JointUpdaterDepTests.js"
	];
	
    // Resolve all testModules and then start the Test Runner.
	require(testModules, QUnit.start);
}());

