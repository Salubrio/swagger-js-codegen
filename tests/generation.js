'use strict';

var assert = require('assert');
var vows = require('vows');
var fs = require('fs');
var ffs = require('final-fs');

var CodeGen = require('../lib/codegen').CodeGen;

var batch = {};
var list = ffs.readdirSync('tests/apis');
list.forEach(function(file){
    file = 'tests/apis/' + file;
    batch[file] = function(){
        var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
        var result = CodeGen.getNodeCode({
            className: 'Test',
            swagger: swagger
        });
        assert(typeof(result), 'string');
        result = CodeGen.getAngularCode({
            moduleName: 'Test',
            className: 'Test',
            swagger: swagger
        });
        assert(typeof(result), 'string');
    };
});
vows.describe('Test Generation').addBatch(batch).export(module);