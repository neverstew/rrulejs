import { it, expect } from "bun:test";
import { iCalDate } from "./iCalDate";
import { UTCDate } from "@date-fns/utc";

it('should format the date', () => {
    expect(new iCalDate(new UTCDate("2024-01-01")).toString()).toEqual("20240101");
})