#!/usr/bin/env node
'use strict';

var colors = require('colors'),
    fs = require('fs');

module.exports = function (name, content) {
    fs.writeFile(process.cwd() + '/' + name + '.html', content, function (err) {
        if (err) {
            console.log('There was an error.'.red);
            process.exit(1);
        }
        console.log(colors.green('Done! Generated in ' + name + '.html'));
    });
};