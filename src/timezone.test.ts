import { it, expect } from "bun:test";
import { TimeZoneIdentifier } from "./timezone";

it('prints the time zone', () => {
    expect(new TimeZoneIdentifier("Europe/London").toString()).toEqual("TZID=Europe/London")
})