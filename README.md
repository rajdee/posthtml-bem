# PostHTML-bem

> Translate [beman](https://github.com/rajdee/beman) templates based on BEM named class structure

## Install

```
$ npm install --save-dev posthtml-bem
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

## License

MIT
    
    