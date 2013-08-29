// Another networked skeleton data source;
// this allows one-way streaming capture from a Server-Sent Events data source
// (SSE is also known as the EventSource API).
define([
    'underscore'
], function (_) {
    'use strict';
    
    function ServerSentEventsSource(inputBcaster, outputBcaster, url) {
        this.source = new EventSource(url || '/skeleton');
        
        this.outputBcaster = outputBcaster;
        inputBcaster.vent.rawData.add(this.sendMessage, this);
    }

    ServerSentEventsSource.prototype.start = function () {
        this.source.addEventListener('message', _.bind(function (e) {
            console.log(e);
            
            // No point broadcasting null or invalid data
            if (e && e.data) {
                this.outputBcaster.broadcastUser(e.data);
            }
        }, this), false);
    };
    
    ServerSentEventsSource.prototype.stop = function () {
        this.socketInstance.off('response');
    };
        
    return ServerSentEventsSource;
});