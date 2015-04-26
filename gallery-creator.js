#!/usr/bin/env node
'use strict';
var program = require('commander'),
    colors = require('colors'),
    pkg = require('./package.json'),
    fs = require('fs');

program
    .version(pkg.version)
    .option('-t, --title [string]', 'specified the title')
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
    var time = Date.now();
    fs.writeFile(process.cwd() + '/' + time + '.html', content, function (err) {
        if (err) {
            console.log('There was an error.'.red);
            process.exit(1);
        }
        console.log(colors.green('Done! Generated in ' + time + '.html'));
    });
});