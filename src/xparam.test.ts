import { it, expect } from 'bun:test'
import { XParam } from './xparam'

it('works with single values', () => {
    expect(new XParam({ name: "x-param", value: "x-value" }).toString()).toEqual("x-param=x-value");
})

it('works with multiple values', () => {
    expect(new XParam({ name: "x-param", value: ["x-value1", "x-value-2"] }).toString())
        .toEqual("x-param=x-value1,x-value-2");
})