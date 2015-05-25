#!/usr/bin/env node
'use strict';
var fs = require('fs');
var join = require('path').join;
var shiny = function (name) {
    name = name.charAt(0).toUpperCase()  + name.substring(1).toLowerCase();
    name = name.replace('.jpg', '');
    name = name.replace('.png', '');
    name = name.replace(/-/g, ' ');
    name = name.replace(/ã©/g, 'é');
    name = name.replace(/ã§/g, 'ç');
    return name;
};
var slugify = function (name) {
    name = name.toLowerCase();
    name = name.replace(/ /g, '-');
    name = name.replace(/_/g, '-');
    name = name.replace(/ã©/g, 'é');
    name = name.replace(/ã§/g, 'ç');
    return name;
};
module.exports = function (root) {
    var result = [];
    var queue = ['/'];
    while (queue.length) {
        var d = queue.shift();
        fs.readdirSync(join(root, d)).sort().forEach(function (entry) {
            var f = join(root, d, entry);
            var stat = fs.statSync(f);
            if (stat.isDirectory() && entry != 'node_modules') {
                queue.push(join(d, entry));
            } else {
                if (/.png/i.test(entry) || /.jpg/i.test(entry)) {
                    var filename = slugify(entry);
                    fs.renameSync(f, join(root, d, filename));
                    if (d == '/') {
                        result.push({
                            uri: '.' + d + filename,
                            name: shiny(entry)
                        });
                    } else {
                        result.push({
                            uri: '.' + d + '/' + filename,
                            name: shiny(entry)
                        });
                    }
                }
            }
        });
    }
    return result;
};