#!/usr/bin/env node
'use strict';

var ls = require('./ls'),
    head1 = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="X-UA-Compatible" content="IE=edge;"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>',
    head2 = '</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></head><body><div class="container">',
    body = '</div></body></html>';

module.exports = function (title, cb) {
    var content = head1 + title + head2;

    ls(process.cwd()).forEach(function (img) {
        content += '<img src="' + img.uri + '" alt="' + img.name + '" width="75%">';
    });

    cb(content + body); 
};