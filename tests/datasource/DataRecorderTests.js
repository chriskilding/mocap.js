define(function (require) {
    "use strict";

	// Import dependencies.
	var DataRecorder = require("mocap/datasource/DataRecorder");
	
    var recorder;
  
	// Define the QUnit module and lifecycle.
	QUnit.module("datasource/DataRecorder", {
        setup: function () {
            // Testing timeouts is messy
            // so don't bother with the custom time value for now
            recorder = new DataRecorder();
        },
        teardown: function () {
            recorder = null;
        }
	});
	
	QUnit.test("start - atomic scenario", 1, function (assert) {
        recorder.start();
        assert.ok(recorder.isRecording, true);
	});

    QUnit.test("start, then stop", 1, function (assert) {
        recorder.start();
        recorder.stop();
        assert.ok(!recorder.isRecording, true);
    });

    QUnit.test("getHistory - does in fact return a clone", 1, function (assert) {
        assert.notStrictEqual(recorder.getHistory(), recorder.history, true);
	});

    QUnit.test("update - if not started, does not add", 1, function (assert) {
        var before = recorder.getHistory();
        
        recorder.update([1, 1, 1]);
        
        var after = recorder.getHistory();
        
        // After should not contain the new vector
        assert.deepEqual(before, after, true);
	});

    QUnit.test("update - if started, does add", 1, function (assert) {
        recorder.start();
        
        var before = recorder.getHistory();
        
        recorder.update([1, 1, 1]);
        
        var after = recorder.getHistory();
        
        // After should contain the vector that before doesn't
        assert.notDeepEqual(before, after, true);
	});
    
    QUnit.test("clear - basic scenario", 1, function (assert) {
        recorder.start();
        
        var data = [1, 1, 1];
        
        recorder.update(data);
                
        recorder.clear();
        
        var actual = recorder.getHistory();
        
        assert.deepEqual(actual, [], true);
	});
});