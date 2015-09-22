var compot = require('compot'),
    gutil = require('gulp-util'),
    path  =require('path'),
    through2 = require('through2');

module.exports = function(option) {

    function transform(file, encoding, callback) {
        var self = this;

        if (file.isNull()) {
            return callback(null, file)
        }

        if (file.isStream()){
            return callback(new gutil.PluginError('gulp-compot', 'Streaming not supported'), null)
        }

        compot.render(file.contents.toString(encoding), {
            root: path.dirname(file.path)
        }, function(err, res){
            if (err) {
                return callback(err, null)
            }

            file.contents = new Buffer(res, encoding);
            return callback(null, file)
        });
    }

    var th2 = through2.obj(transform);

    return th2;
};
