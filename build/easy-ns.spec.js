"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var easy_ns_1 = require("./easy-ns");
var chai_1 = require("chai");
require("mocha");
describe('Hello function', function () {
    it('should return "hello wolrd !"', function () {
        var res = easy_ns_1.hello();
        chai_1.expect(res).to.equal('hello world !');
    });
});
