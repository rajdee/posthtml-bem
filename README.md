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

_**Attention:** Please use "mods" for the attribute modifiers instead of "mod" and a space as a separator of modifiers instead of a comma._

```html
<div block="MadTeaParty">
    <div elem="march-hare" mods="type:mad">March Hare</div>
    <div elem="march-hare" mods="mad">March Hare</div>
</div>
```


This would render like

```html
<div class="MadTeaParty">
    <div class="MadTeaParty__march-hare MadTeaParty__march-hare_type_mad">
        March Hare
    </div>
    <div class="MadTeaParty__march-hare MadTeaParty__march-hare_mad">
        March Hare
    </div>
</div>
```

### Mixes

You can mix block, element or modifiers.

```html
<div block="animal" mix="block:elephant elem:trunk mods:[size:short broken]">
    <div elem="nose" mods="size:long">Nose</div>
</div>
```

This would render like

```html
<div class="animal elephant__trunk elephant__trunk_size_short elephant__trunk_broken">
    <div class="animal__nose animal__nose_size_long">Nose</div>
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
    html = '<div block="mad-tea-party"><div elem="march-hare" mods="type:mad">March Hare</div><div elem="hatter" mods="type:mad">Hatter</div><div elem="dormouse" mods="state:sleepy">Dormouse</div></div>';

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

## With Jade and Gulp

jade template
```html
div(block='animals')
    div(elem='rabbit' mods='type:scurrying color:white')
    div(elem='dormouse' mods='type:sleeper color:red')
```

guplfile.js
```javascript
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    posthtml = require('gulp-posthtml');
    
gulp.task('default', function () {
    return gulp.src('before.jade')
        .pipe(jade({
            pretty: true
        }))
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

## Predecessors

This plugin was inspired by the syntax and the idea of using custom attributes from [BEML](https://github.com/zenwalker/node-beml) and [bemto](https://github.com/kizu/bemto).


## License

MIT
