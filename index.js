module.exports = function (config) {
    'use strict';

    var config = config ||
        {
            elemPrefix: '__',
            modPrefix: '_',
            modDlmtr: '_'
        },
        _createBlockClass,
        _createElemClass,
        _createModClass,
        _createClassList,
        _assignClassList;

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
            .replace(/\s/g, '')
            .replace(/\:/g, config.modDlmtr)
            .split(',')
            .forEach(function (mod) {
                modClass = baseClass + config.modPrefix + mod;
                className += ' ' + modClass;
            });
        return className;
    };

    _createClassList = function (selector) {
        var result = '',
            block,
            elem;
        if (selector.block && !selector.elem) {
            block = _createBlockClass(selector.block);
            result += block;

            if (selector.mods) {
                result += _createModClass(selector.block, selector.mods);
            }
            return result;
        } else if (selector.block && selector.elem) {
            elem = _createElemClass(selector.block, selector.elem);
            result += elem;

            if (selector.mods) {
                result += _createModClass(elem, selector.mods);
            }
            return result;
        }

    };

    _assignClassList = function (attr, classSet, attributes, node) {
        var classes;

        if (attr in attributes) {
            classSet[attr] = attributes[attr];
            delete node.attrs[attr];
        }

        if ('mod' in attributes) {
            classSet.mods = attributes.mod;
            delete node.attrs.mod;
        }

        classes = _createClassList(classSet);

        if (classes) {
            node.attrs.class = classes;
            return classSet;
        };
    };

    return function (tree) {
        tree.match({attrs: {block: true}}, function (node) {
            var classSet = {
                    block: '',
                    elem: '',
                    mods: '',
                    mix: ''
                },
            elemAttrs,
            block,
            elem,
            mix;

            block = _assignClassList('block', classSet, node.attrs, node);
            
            if (node.content && Array.isArray(node.content)) {
                node.content.forEach(function (children) {
                    if (children.attrs.elem) {
                      elem = _assignClassList('elem', block, children.attrs, children);
                    }
                });
            }
            return node;
        });
        return tree;
    };
};
