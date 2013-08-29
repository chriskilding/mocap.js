{
    "baseUrl": "../lib",
    "paths": {
        "mocap": "../mocap"
    },
    "include": ["../tools/almond", "mocap"],
    "exclude": ["js-signals", "underscore", "socketio"],
    "out": "../dist/mocap.js",
    "wrap": {
        "startFile": "wrap.start",
        "endFile": "wrap.end"
    }
}
