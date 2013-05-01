define(function (require) {
    "use strict";

	// Import dependencies.
	var DataRecorder = require("mocap/datasource/DataRecorder");
	
    var user = JSON.parse(require("text!mocap/sample-user.json"));
    
    var recorder;
  
	// Define the QUnit module and lifecycle.
	QUnit.module("datasource/DataRecorder", {
        setup: function () {
            // Testing timeouts is messy
            // so don't bother with the custom time value for now
            recorder = new DataRecorder();
            //sinon.spy(bcaster.vent.rawData, "dispatch");
        },
        teardown: function () {
            //bcaster.vent.rawData.dispatch.restore(); // For safety
            recorder = null;
        }
	});
	
	QUnit.test("start - atomic scenario", 1, function (assert) {
        recorder.start();
        assert.ok(recorder.isRecording, true);
	});
	
});