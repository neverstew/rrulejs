import { it, expect } from "bun:test";
import { UTCDate } from "@date-fns/utc";
import { iCalDatetime } from "./iCalDatetime";
import { TimeZoneIdentifier } from "./timezone";

it('should format the datetime', () => {
    expect(new iCalDatetime(new UTCDate("2024-01-01T12:00:00Z")).toString()).toEqual("20240101T120000Z");
})

it('should format zoned times', () => {
    expect(
        new iCalDatetime(new UTCDate("2024-01-01T07:00:00"))
        .inTimeZone(new TimeZoneIdentifier("America/New_York"))
        .toString()
    ).toEqual("20240101T120000Z");
})