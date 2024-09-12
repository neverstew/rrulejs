import { it, expect } from 'bun:test'
import { XParam } from './xparam'

it('stringifies with single values', () => {
    expect(new XParam({ name: "x-param", value: "x-value" }).toString()).toEqual("x-param=x-value");
})

it('parses with single values', () => {
    const parsed = XParam.parse("x-param=x-value");
    expect(parsed.name).toEqual("x-param");
    expect(parsed.value).toEqual(["x-value"]);
})

it('stringifies with multiple values', () => {
    expect(new XParam({ name: "x-param", value: ["x-value1", "x-value-2"] }).toString())
        .toEqual("x-param=x-value1,x-value-2");
})

it('parses with multiple values', () => {
    const parsed = XParam.parse("x-param=x-value-1,x-value-2");
    expect(parsed.name).toEqual("x-param");
    expect(parsed.value).toEqual(["x-value-1", "x-value-2"]);
})