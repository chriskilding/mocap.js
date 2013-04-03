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
    "zigjs": {
      deps: [],
      exports: "zig"  //attaches "zig" to the window object
    },
    "socketio": {
      deps: [],
      exports: "io"
    }
  },
  paths: {
     zigjs: '//cdn.zigfu.com/zigjs/zig.min',
    //zigjs: 'vendor/zig',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min',
    socketio: '//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.10/socket.io.min',
    'js-signals': '//cdnjs.cloudflare.com/ajax/libs/js-signals/0.8.1/js-signals.min',
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text'
  }
};