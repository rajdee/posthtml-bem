/* jshint mocha: true, maxlen: false */
var posthtml = require('posthtml'),
    bem = require('../index.js'),
    expect = require('chai').expect;

function test(input, output, done) {
    posthtml()
        .use(bem({
            elemPrefix: '__',
            modPrefix: '_',
            modDlmtr: '_'
        }))
        .process(input)
        .then(function(result) {
            expect(output).to.eql(result.html);
            done();
        }).catch(function(error) {
            done(error);
        });
}

describe('Test for block', function() {
    it('Test block', function(done) {
        test(
            '<div block="animal">Animal</div>',
            '<div class="animal">Animal</div>',
            done
        );
    });

    it('Test boolean mod for block', function(done) {
        test(
            '<div block="animal" mods="moo">Cow</div>',
            '<div class="animal animal_moo">Cow</div>',
            done
        );
    });

    it('Test key_value mod for block', function(done) {
        test(
            '<div block="animal" mods="size:big">Cow</div>',
            '<div class="animal animal_size_big">Cow</div>',
            done
        );
    });

    it('Test key_value + boolean mods for block', function(done) {
        test(
            '<div block="animal" mods="size:big moo">Cow</div>',
            '<div class="animal animal_size_big animal_moo">Cow</div>',
            done
        );
    });

    it('Test key_value mods for block', function(done) {
        test(
            '<div block="animal" mods="size:big horns:two">Cow</div>',
            '<div class="animal animal_size_big animal_horns_two">Cow</div>',
            done
        );
    });

});

describe('Test for element', function() {
    it('Test elem', function(done) {
        test(
            '<div block="animal"><div elem="cow">Cow</div></div>',
            '<div class="animal"><div class="animal__cow">Cow</div></div>',
            done
        );
    });

    it('Test nested element', function(done) {
        test(
            '<div block="animal"><div elem="cow"><div elem="calf"></div></div></div>',
            '<div class="animal"><div class="animal__cow"><div class="animal__calf"></div></div></div>',
            done
        );
    });

    it('Test boolean mod for element', function(done) {
        test(
            '<div block="animal"><div elem="cow" mods="moo">Cow</div></div>',
            '<div class="animal"><div class="animal__cow animal__cow_moo">Cow</div></div>',
            done
        );
    });

    it('Test key_value mod for element', function(done) {
        test(
            '<div block="animal"><div elem="cow" mods="size:big">Cow</div></div>',
            '<div class="animal"><div class="animal__cow animal__cow_size_big">Cow</div></div>',
            done
        );
    });

    it('Test key_value + boolean mods for element', function(done) {
        test(
            '<div block="animal"><div elem="cow" mods="size:big moo">Cow</div></div>',
            '<div class="animal"><div class="animal__cow animal__cow_size_big animal__cow_moo">Cow</div></div>',
            done
        );
    });

    it('Test key_value mods for element', function(done) {
        test(
            '<div block="animal"><div elem="cow" mods="size:big horns:two">Cow</div></div>',
            '<div class="animal"><div class="animal__cow animal__cow_size_big animal__cow_horns_two">Cow</div></div>',
            done
        );
    });
});

describe('Test for mixes', function() {
    it('Test mixes (block) on block', function(done) {
        test(
            '<div block="animal" mix="block:elephant"><div elem="nose" mods="size:long">Nose</div></div>',
            '<div class="animal elephant"><div class="animal__nose animal__nose_size_long">Nose</div></div>',
            done
        );
    });

    it('Test mixes (elem + mods) on block', function(done) {
        test(
            '<div block="animal" mix="block:elephant elem:trunk mods:[size:short]"><div elem="nose" mods="size:long">Nose</div></div>',
            '<div class="animal elephant__trunk elephant__trunk_size_short"><div class="animal__nose animal__nose_size_long">Nose</div></div>',
            done
        );
    });

    it('Test mixes (elem + multiple mods) on block', function(done) {
        test(
            '<div block="animal" mix="block:elephant elem:trunk mods:[size:short color:brown]"><div elem="nose" mods="size:long">Nose</div></div>',
            '<div class="animal elephant__trunk elephant__trunk_size_short elephant__trunk_color_brown"><div class="animal__nose animal__nose_size_long">Nose</div></div>',
            done
        );
    });

    it('Test mixes (elem + multiple mods) on element', function(done) {
        test(
            '<div block="animal"><div elem="nose" mods="size:long" mix="block:elephant elem:trunk mods:[size:short color:brown]">Nose</div></div>',
            '<div class="animal"><div class="animal__nose animal__nose_size_long elephant__trunk elephant__trunk_size_short elephant__trunk_color_brown">Nose</div></div>',
            done
        );
    });

});

describe('Services test', function() {
    it('Test for trimming whitespaces', function(done) {
        test(
            '<div block="animal" mix="block: elephant"><div elem="nose" mods="size:  long">Nose</div></div>',
            '<div class="animal elephant"><div class="animal__nose animal__nose_size_long">Nose</div></div>',
            done
        );
    });
});

describe('Classes test', function() {
    it('Extend classes', function(done) {
        test(
            '<div block="animal" mix="block: elephant" class="clearfix grid"><div elem="nose" mods="size:  long" class="clearfix grid">Nose</div></div>',
            '<div class="animal elephant clearfix grid"><div class="animal__nose animal__nose_size_long clearfix grid">Nose</div></div>',
            done
        );
    });
});



