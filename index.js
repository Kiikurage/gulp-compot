var compot = require('compot'),
    gutil = require('gulp-util'),
    through2 = require('through2');

module.exports = function(option) {

    function transform(file, encoding, callback) {
        if (file.isNull()) {
            return callback()
        }

        if (file.isStream()){
            this.emit('error', new gutil.PluginError('gulp-compot', 'Streaming not supported'));
            return callback()
        }

        var input = file.contents.toString(encoding);

        compot.render(input, function(err, output){
            if (err) {
                this.emit('error', new gutil.PluginError('gulp-compot', err));
                return callback()
            }

            file.contents = new Buffer(output, encoding);
            return callback(null, file)
        });
    }

    var th2 = through2.obj(transform);

    return th2;
};
