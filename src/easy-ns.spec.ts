
import { hello } from './easy-ns'
import { expect } from 'chai'
import 'mocha'

describe('Hello function', () => {
    it('should return "hello wolrd !"', () => {
        const res = hello()
        expect(res).to.equal('hello world !')
    })
})