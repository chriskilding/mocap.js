/*global define */

/**
 * The main module that defines the public interface for mocap,
 * a made-up library to demonstrate how to construct a source from components.
 */
define(function (require) {
    'use strict';

    var $ = require('jquery'),
        convert = require('mocap/convert');

    //Return the module value.
    return {
        version: '0.0.1, jQuery version is: ' + $.fn.jquery,
        convert: convert
    };
});
