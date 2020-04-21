module.exports = function (config) {
    'use strict';
    var logger = require('fancy-log');

    var _createBlockClass,
        _createElemClass,
        _createModClass,
        _createMixClass,
        _createClassList,
        _assignClassList;

    config = config ||
        {
            elemPrefix: '__',
            modPrefix: '_',
            modDlmtr: '_'
        };

    _createBlockClass = function (block) {
        return block;
    };

    _createElemClass = function (blockClass, elemName) {
        return blockClass + config.elemPrefix + elemName;
    };

    _createModClass = function (baseClass, mods) {
        var className = '',
            modClass;
        mods
            .replace(/\s{2,}/g, ' ') // remove more than one whitespace
            .replace(/\:\s?/g, config.modDlmtr) // remove whitespace after the semicolon
            .split(' ')
            .forEach(function (mod) {
                modClass = baseClass + config.modPrefix + mod;
                className += ' ' + modClass;
            });
        return className;
    };

    _createMixClass = function (baseClass, mix) {
        var mixClass = '',
            block,
            elem,
            mods,
            mixes,
            blockRegExp = /block\:([\S]*)\b/,
            elemRegExp = /elem\:([\S]*)\b/,
            modRegExp = /mods\:\[(.*)\]/;

        mixes = mix
                .replace(/\s{2,}/g, ' ') // remove more than one whitespace
                .replace(/\:\s/g, ':') // remove whitespace after the semicolon
                .replace(/\,\s/g, ',') // remove whitespace after the comma
                .split(',');

        mixes.forEach(function (mix) {
            block = blockRegExp.exec(mix) || [];
            elem = elemRegExp.exec(mix) || [];
            mods = modRegExp.exec(mix) || [];

            if (!block) {
                logger.log('Please add block attribute to a mix definition: ', mixes);
            }

            mixClass += ' ' +  _createClassList({
                block: block[1],
                elem: elem[1],
                mods: mods[1],
                mix: ''
            });
        });

        return mixClass;
    };

    _createClassList = function (selector) {
        var result = '',
            block,
            elem;

        if (selector.block && !selector.elem) {
            block = _createBlockClass(selector.block);
            result = block;
        }

        if (selector.block && selector.elem) {
            elem = _createElemClass(selector.block, selector.elem);
            result = elem;
        }

        if (selector.mods) {
            result += _createModClass(result, selector.mods);
        }

        if (selector.mix) {
            result += _createMixClass(result, selector.mix);
        }

        return result;
    };

    _assignClassList = function (attributes, node) {
        var classes,
            classSet = {
                        block: '',
                        elem: '',
                        mod: '',
                        mix: ''
                    };

        ['block', 'elem', 'mods', 'mix'].forEach(function (attr) {
            if (attr in attributes) {
                classSet[attr] = attributes[attr];
                delete node.attrs[attr];
            }
        });

        classes = _createClassList(classSet);

        if (classes) {
            node.attrs.class = node.attrs.class ?
                [classes, node.attrs.class].join(' ') :
                classes;
            return classSet;
        }
    };

    return function posthtmlBem(tree) {
        tree.match({attrs: {block: true}}, function (node) {
            var nodeAttrs;

            nodeAttrs = _assignClassList(node.attrs, node);

            if (node.content && Array.isArray(node.content)) {
                node.content.forEach(function (children) {
                    if (children.attrs && children.attrs.elem && !children.attrs.block) {
                        children.attrs.block = nodeAttrs.block;
                    }
                });
            }
            return node;
        });
        return tree;
    };
};
