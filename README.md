# PostHTML-bem

[PostHTML](https://github.com/posthtml/posthtml) plugin for support to simplify the maintenance of [BEM](http://bem.info) naming structure in html

> Translate [beman](https://github.com/rajdee/beman) templates based on BEM named class structure

## Install

```
$ npm install --save-dev posthtml-bem
```


##Features

### Blocks

```html
<div block="MadTeaParty">
    Mad Tea Party
</div>
```

This would render like

```html
<div class="MadTeaParty">
    Mad Tea Party
</div>
```


### Elements

```html
<div block="MadTeaParty">
    <div elem="march-hare">March Hare</div>
</div>
```

This would render like

```html
<div class="MadTeaParty">
    <div class="MadTeaParty__march-hare">March Hare</div>
</div>
```

### Modifiers

```html
<div block="MadTeaParty">
    <div elem="march-hare" mod="type:mad">March Hare</div>
</div>
```

This would render like

```html
<div class="MadTeaParty">
    <div class="MadTeaParty__march-hare MadTeaParty__march-hare_type_mad">
        March Hare
    </div>
</div>
```


## Usage

```javascript
var posthtml = require('posthtml'),
    config = {
        elemPrefix: '__',
        modPrefix: '_',
        modDlmtr: '--'
    },
    html = '<div block="mad-tea-party"><div elem="march-hare" mod="type:mad">March Hare</div><div elem="hatter" mod="type:mad">Hatter</div><divelem="dormouse" mod="state:sleepy">Dormouse</div></div>';

posthtml()
    .use(require('posthtml-bem')(config))
    .process(html)
    .then(function (result) {
        console.log(result.html);
    });
```

## With Gulp

```javascript
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    posthtml = require('gulp-posthtml');

gulp.task('default', function () {
    return gulp.src('before.html')
        .pipe(posthtml([
            require('posthtml-bem')({
                elemPrefix: '__',
                modPrefix: '_',
                modDlmtr: '--'
            })
        ]))
    .pipe(rename('after.html'))
    .pipe(gulp.dest('.'));
});
```

## License

MIT
