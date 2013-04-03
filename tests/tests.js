/*global require, define, test, expect, strictEqual, location */

if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'mocap': '../mocap'
        },
        shim: {
            'underscore': {
                exports: '_'
            }
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of mocap to the dist location
        require.config({
            paths: {
                'mocap': '../dist/mocap'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['mocap', 'jquery'], factory);
    } else {
        // Browser globals
        factory(root.mocap, root.jQuery);
    }
}(this, function (mocap, $) {
    'use strict';

    test('version test', function () {
        expect(1);
        strictEqual(mocap.version,
            '0.0.1, jQuery version is: ' + $.fn.jquery,
            'Version concatenated');
    });

    test('conversion test', function () {
        expect(1);
        strictEqual(mocap.convert('Harry & Sally'),
            'Harry &amp; Sally',
            'Ampersand converted');
    });
}));
