# gulp-compot

The gulp plugin of [compot](https://github.com/Kiikurage/compot).

## usage

```js
var compot = require('gulp-compot');

gulp.task('compot', function(){
    gulp.src('path/to/src')
        .pipe(compot())
        .pipe(gulp.dest('path/to/dest'));
})
```
