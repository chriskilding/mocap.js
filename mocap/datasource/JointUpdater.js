"use strict";

define([
    'underscore',
    'js-signals',
    'mocap/datasource/JointExtractor'
], function (_, Signal, JointExtractor) {
  
    function JointUpdater(jointId, broadcaster, options) {
        var opts = options || {};
        
        this.jointId = jointId;
        
        this.vent = {
            joint: new Signal()
        };
    
        var that = this;
        
        if (broadcaster) {
            if (opts.rateLimit) {
                // Do rate limiting
                broadcaster.vent.skeleton.add(_.throttle(that.update, options.rateLimit), this);
            } else {
                broadcaster.vent.skeleton.add(this.update, this);
            }
        }
    }
    
    JointUpdater.prototype.update = function (skeleton) {
        var jointData = JointExtractor.extract(this.jointId, skeleton);
        
        if (jointData) {
            this.vent.joint.dispatch(jointData);
        }
    };
    
    return JointUpdater;
});