import { it, expect } from "bun:test";
import { TimeZoneIdentifier } from "./timezone";

it('stringifies the time zone', () => {
    expect(new TimeZoneIdentifier("Europe/London").toString()).toEqual("TZID=Europe/London");
})

it('parses the time zone', () => {
    expect(TimeZoneIdentifier.parse("TZID=Europe/London").timeZone).toEqual("Europe/London");
})