#!/usr/bin/env node
'use strict';

var ls = require('./ls'),
    head1 = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="X-UA-Compatible" content="IE=edge;"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>',
    head2 = '</title><style>:root,body{font-family:"Open Sans","Helvetica Neue",Helvetica,"Lucida Grande",sans-serif}h1,h2,h3{font-weight:500}body,h5{font-size:1.6rem}h4,h5,h6{font-weight:600}a,a:focus,a:hover{text-decoration:none}img,select[multiple],video{max-width:100%;height:auto;vertical-align:middle}</style></head><body>',
    body = '</body></html>';

module.exports = function (title, cb) {
    var content = head1 + title + head2;

    ls(process.cwd()).forEach(function (img) {
        content += '<img src="' + img.uri + '" alt="' + img.name + '" width="75%">';
    });

    cb(content + body); 
};