# mocap.js
3D motion capture in Javascript, which abstracts several data sources behind a single interface.

## Data source support
So far, the following sources are supported:

- Direct capture from a local copy of the ZigFu zig.js plugin, and locally connected compatible sensor like the Microsoft Kinect.
- Streaming capture over the network from the reconstruct-o-matic server; if you have a locally installed sensor you can send your data stream up to this server, and receive a reconstructed skeleton from it. If you do not have a local sensor, you can subscribe to that server in read-only mode.

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