#!/usr/bin/env node
'use strict';
var program = require('commander'),
    colors = require('colors'),
    pkg = require('./package.json'),
    write = require('./lib/write');

program
    .version(pkg.version)
    .option('-t, --title [string]', 'specified the title')
    .option('-f, --filename [string]', 'specified the filename')
    .option('-c, --check', 'check if there are an update')
    .parse(process.argv);

if (typeof program.title == 'undefined') {
    console.log('Please set a title with -t.'.red);
    program.title = 'Photos';
}

if (program.check) {
    require('check-update')({packageName: pkg.name, packageVersion: pkg.version, isCLI: true}, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
}

require('./lib/template')(program.title, function(content){
    if (typeof program.filename == 'string') {
        write(program.filename, content);
    } else {
        write(Date.now(), content);
    }
});