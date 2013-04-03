{
    "baseUrl": "../lib",
    "paths": {
        "mocap": "../mocap"
    },
    "include": ["../tools/almond", "mocap"],
    "exclude": ["jquery", "underscore"],
    "out": "../dist/mocap.js",
    "wrap": {
        "startFile": "wrap.start",
        "endFile": "wrap.end"
    }
}
