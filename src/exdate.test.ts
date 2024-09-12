import { it, expect } from "bun:test";
import { Exdate } from "./exdate";
import { UTCDate } from "@date-fns/utc";
import { TimeZoneIdentifier } from "./timezone";
import { XParam } from "./xparam";

it('should handle the spec example', () => {
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

it('should include time zone information only in the actual times', () => {
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

it('should work with single date', () => {
    expect(
        new Exdate({
            date: new UTCDate("1996-04-02T01:00:00Z"),
        }).toString()
    ).toEqual("EXDATE:19960402T010000Z")
})

it('should handle date value', () => {
    expect(
        new Exdate({
            date: new UTCDate("1996-04-02T01:00:00Z"),
            value: "DATE",
        }).toString()
    ).toEqual("EXDATE;VALUE=DATE:19960402")
})

it('should handle x params', () => {
    expect(
        new Exdate({
            date: new UTCDate("1996-04-02T01:00:00Z"),
            value: "DATE",
            xParam: new XParam({ name: "x-param", value: "x-value" }),
        }).toString()
    ).toEqual("EXDATE;VALUE=DATE;x-param=x-value:19960402")
})