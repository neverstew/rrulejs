import { it, expect } from "bun:test";
import { iCalDate } from "./iCalDate";
import { UTCDate } from "@date-fns/utc";

it('should stringify the date', () => {
    expect(new iCalDate(new UTCDate("2024-01-01")).toString()).toEqual("20240101");
})

it('should parse the date', () => {
    expect(iCalDate.parse("2024-01-01").date).toEqual(new UTCDate("2024-01-01"));
    expect(iCalDate.parse("20240101").date).toEqual(new UTCDate("2024-01-01"));
})