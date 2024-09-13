import { it, expect } from "bun:test";
import { Exdate } from "./exdate";
import { UTCDate } from "@date-fns/utc";
import { TimeZoneIdentifier } from "./timezone";
import { XParam } from "./xparam";

it('should stringify the spec example', () => {
    expect(
        new Exdate({
            date: [
                new UTCDate("1996-04-02T01:00:00Z"),
                new UTCDate("1996-04-03T01:00:00Z"),
                new UTCDate("1996-04-04T01:00:00Z"),
            ]
        }).toString()
    ).toEqual("EXDATE:19960402T010000Z,19960403T010000Z,19960404T010000Z")
})

it('should parse the spec example', () => {
    const parsed = Exdate.parse("EXDATE:19960402T010000Z,19960403T010000Z,19960404T010000Z");
    expect(parsed.dates).toEqual([
        new UTCDate("1996-04-02T01:00:00Z"),
        new UTCDate("1996-04-03T01:00:00Z"),
        new UTCDate("1996-04-04T01:00:00Z"),
    ])
    expect(parsed.timeZone).toBeUndefined();
    expect(parsed.value).toBeUndefined();
    expect(parsed.xParam).toHaveLength(0);
})

it('should stringify time zone information only in the actual times', () => {
    expect(
        new Exdate({
            timeZone: new TimeZoneIdentifier("America/New_York"),
            date: [
                new UTCDate("1996-04-02T01:00:00Z"),
                new UTCDate("1996-04-03T01:00:00Z"),
                new UTCDate("1996-04-04T01:00:00Z"),
            ]
        }).toString()
    ).toEqual("EXDATE:19960402T060000Z,19960403T060000Z,19960404T060000Z")
})

it('should stringify with single date', () => {
    expect(
        new Exdate({
            date: new UTCDate("1996-04-02T01:00:00Z"),
        }).toString()
    ).toEqual("EXDATE:19960402T010000Z")
})

it('should parse with single date', () => {
    const parsed = Exdate.parse("EXDATE:19960402T010000Z");
    expect(parsed.dates).toEqual([
        new UTCDate("1996-04-02T01:00:00Z"),
    ])
    expect(parsed.timeZone).toBeUndefined();
    expect(parsed.value).toBeUndefined();
    expect(parsed.xParam).toHaveLength(0);
})

it('should stringify date value', () => {
    expect(
        new Exdate({
            date: new UTCDate("1996-04-02T00:00:00Z"),
            value: "DATE",
        }).toString()
    ).toEqual("EXDATE;VALUE=DATE:19960402")
})

it('should parse date value', () => {
    const parsed = Exdate.parse("EXDATE;VALUE=DATE:19960402");
    expect(parsed.dates).toEqual([
        new UTCDate("1996-04-02T00:00:00Z"),
    ])
    expect(parsed.timeZone).toBeUndefined();
    expect(parsed.value).toEqual("DATE");
    expect(parsed.xParam).toHaveLength(0);
})

it('should stringify x params', () => {
    expect(
        new Exdate({
            date: new UTCDate("1996-04-02T01:00:00Z"),
            value: "DATE",
            xParam: new XParam({ name: "x-param", value: "x-value" }),
        }).toString()
    ).toEqual("EXDATE;VALUE=DATE;x-param=x-value:19960402")
})

it('should parse x params', () => {
    const parsed = Exdate.parse("EXDATE;VALUE=DATE;x-param=x-value;x-param-2=x-value-2:19960402");
    expect(parsed.dates).toEqual([
        new UTCDate("1996-04-02T00:00:00Z"),
    ])
    expect(parsed.timeZone).toBeUndefined();
    expect(parsed.value).toEqual("DATE");
    expect(parsed.xParam![0].name).toEqual("x-param");
    expect(parsed.xParam![0].value).toEqual(["x-value"]);
    expect(parsed.xParam![1].name).toEqual("x-param-2");
    expect(parsed.xParam![1].value).toEqual(["x-value-2"]);
})

it('should parse params in any order', () => {
    const parsed = Exdate.parse("EXDATE;x-param=x-value;VALUE=DATE;x-param-2=x-value-2:19960402");
    expect(parsed.dates).toEqual([
        new UTCDate("1996-04-02T00:00:00Z"),
    ])
    expect(parsed.timeZone).toBeUndefined();
    expect(parsed.value).toEqual("DATE");
    expect(parsed.xParam![0].name).toEqual("x-param");
    expect(parsed.xParam![0].value).toEqual(["x-value"]);
    expect(parsed.xParam![1].name).toEqual("x-param-2");
    expect(parsed.xParam![1].value).toEqual(["x-value-2"]);
})