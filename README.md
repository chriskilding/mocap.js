# mocap.js
A unified 3D motion capture interface in JavaScript, which abstracts several data sources behind a single interface so you need not think about their internal details.

## Data source support
So far, the following sources are supported:

- ZigDataSource: allows direct capture from a local copy of the ZigFu zig.js plugin, and a locally connected compatible sensor like the Microsoft Kinect.
- NetworkDataSource: allows streaming motion capture over a socket.io network connection from any compatible source; originally this was designed for use with the [reconstruct-o-matic server](https://github.com/themasterchef/reconstruct-o-matic). If you have a locally installed sensor you can send your data stream up to this server to assist in the reconstruction of the skeleton; more sensors will increase the accuracy of the result. If you do not have a locally connected sensor, you can subscribe to a NetworkDataSource in read-only mode.

We plan to add more sources as we progress.

## Loading the library
This library can be used either the 'normal' way (with global variables) or with AMD / require.js, where you should require the 'mocap' module for use in your code.

## Dependencies
**Core dependencies:** this library *must* have access to the following third-party libraries:

- underscore (for some throttling / binding functionality)
- js-signals (for raising events with mocap data that your app can listen to)

**Optional dependencies:** depending on the data source backends that you choose to work with, the library also needs one or more of the following:

- socket.io client, to support streaming mocap data over the network
- zig.js, if using the ZigFu browser plugin

## To build
1. First install Node.js from your favorite source.
2. `cd` into the project directory.
3. Run `npm install` if necessary to obtain the necessary dependencies for building.
4. Run `node tools/r.js -o tools/build.js`.
5. The built (concatenated and minified) version of the library will be a single file under the `dist` folder.

## Tests
Unit testing is done with the QUnit and Sinon.js frameworks. To run the tests:

- open index.html in the `test` folder to test the code in a development environment, which will pull in the library files individually from the `mocap` folder.
- open index-dist-amd.html in the `test` folder to test the code in a production environment, which will test the concatenated and minified version of the library in `dist/mocap.js`.

## Module descriptions
- Broadcaster: instances of this module contain event emitters that will hand a stream of skeleton data to their listeners, as data arrives. A 'raw' input data stream is also available for clients wishing to use extra vendor-proprietary metadata emitted from their chosen back-end data source. The Broadcaster is independent of the back-end you choose to wire it up to, providing a single clean interface to bring data into your app.
- DataRecorder: this is a fairly simple utility class which is intended to be wired up to your Broadcaster or JointUpdater of choice, and records the data stream from the moment you call `start()` to the moment you call `stop()`.
- JointExtractor: this provides utility methods for filtering the data stream from a Broadcaster down to just the Joint of interest.
- JointGroups: in some applications, it may be useful to track not only an individual Joint but also its neighboring joints, particularly if analysing patterns of motion localised to some part of the body. JointGroups is a convenience which links every Joint to its neighbors.
- Joints: a convenience enumeration of all the tracked body joints, mapping human-readable names e.g. RightHand to their (arbitrary and hard to remember) numerical ID in the received data packets. This may help you to write less error-prone code when using mocapjs.
- JointUpdater: place an instance of this between a Broadcaster and your code which is only interested in looking at a certain Joint, then subscribe to the JointUpdater's events in your own code to receive a filtered stream of data.