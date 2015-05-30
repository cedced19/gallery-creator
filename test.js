var template = require('./lib/template'),
    write = require('./lib/write'),
    fs = require ('fs');

describe('galleryCreator', function () {

    it('should create a html file', function () {
        fs.writeFileSync('test.png', '');
        template('Photos', function(content){
            write(Date.now(), content);
        });
    }); 

});