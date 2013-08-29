// Another networked skeleton data source;
// this allows one-way streaming capture from a Server-Sent Events data source
// (SSE is also known as the EventSource API).
// Remember, SSE just sends and receives strings, but mocap data is in JSON...
// so this class will perform JSON.parse() before forwarding any data onwards.
// BE SURE YOUR MOCAP SERVER IS SENDING JSON FIRST!
define([
    'underscore'
], function (_) {
    'use strict';
    
    function ServerSentEventsSource(bcaster, url) {
        this.source = new EventSource(url);
        
        this.bcaster = bcaster;
    }

    ServerSentEventsSource.prototype.start = function () {
        this.source.addEventListener('message', _.bind(function (e) {            
            // No point broadcasting null or invalid data
            if (e && e.data) {
                this.bcaster.broadcastUser(JSON.parse(e.data));
            }
        }, this), false);
    };
    
    ServerSentEventsSource.prototype.stop = function () {
        this.source.removeEventListener('message');
    };
        
    return ServerSentEventsSource;
});