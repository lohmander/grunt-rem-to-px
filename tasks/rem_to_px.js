/*
* grunt-rem-to-px
* https://github.com/lohmander/grunt-rem-to-px
*
* Copyright (c) 2013 Hannes Lohmander
* Licensed under the MIT license.
*/

'use strict';

var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rem_to_px', 'Parses CSS and recalculates all values to pixels.', function() {
        var dest = this.data.dest,
            options = this.options();

        function removeFontFace(content) {
            var regex = new RegExp('\@font\-face.*?}', 'g');

            grunt.log.ok('Removed font-face.');

            return content.replace(regex, '');
        };

        function removeMediaQueries(content) {
            var regex = new RegExp('\@media.*?}.*?}', 'g');

            grunt.log.ok('Removed media queries.');

            return content.replace(regex, '');
        }

        this.files[0].src.forEach(function(filepath) {
            grunt.log.writeln('Parsing ' + filepath + '.');

            var filecontent = grunt.file.read(filepath),
                regex = new RegExp('([0-9\\.]+)rem'),
                replacements = 0,
                match;

            // Remove attributes without rem
            filecontent = filecontent.replace(/([^:;{}]*:[^;{}]*)([;}])/g, function(match, contents, ending, offset, s) {
                if (match.match(/rem/i)) {
                    return match;
                }
                if (ending === '}') {
                    return ending;
                }
                return '';
            });

            // Remove comments
            filecontent = filecontent.replace(/\/\*[\S\s]+?\*\//g, '');

            // Remove empty selectors
            while (filecontent.match(/[^;{}]*{[\s]*}/g)) {
                filecontent = filecontent.replace(/[^;{}]*{[\s]*}/g, '');
            }

            // Remove blank lines
            filecontent = filecontent.replace(/^\s*[\r\n]/gm, '');

            // Calculate and replace rem with px
            while (match = regex.exec(filecontent)) {
                var pixelValue = Math.round(parseFloat(match[1]) * options.baseFontSize) + 'px';
                filecontent = filecontent.replace(match[0], pixelValue);

                replacements++;
            }

            if (options.removeFontFace) {
                filecontent = removeFontFace(filecontent);
            }

            if (options.removeMediaQueries) {
                filecontent = removeMediaQueries(filecontent);
            }

            grunt.log.ok(replacements + ' replacement(s) made in ' + filepath + '.');

            grunt.file.write(dest + '/' + path.basename(filepath), filecontent);
        });
    });
};
