// The common configuration required for the shared JS code
// Applies to testing environments as well as production and dev

// Require.js allows us to configure shortcut alias (path)
// If you don't set these here, when you come to use a module with
// 'define'(['jquery']) - for example
// it looks for a local file at js/jquery.js
var require = {
  shim: {
    // At this time (Oct 2012) Underscore and Backbone are not AMD compatible
    "underscore": {
      deps: [],
      exports: "_"
    },
    "zig": {
      deps: [],
      exports: "zig"  //attaches "zig" to the window object
    },
    "socketio": {
      deps: [],
      exports: "io"
    }
  },
  paths: {
    zig: '../lib/zig',
    socketio: '../lib/socketio',
    underscore: '../lib/underscore',
    "js-signals": '../lib/js-signals',
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text'
  }
};