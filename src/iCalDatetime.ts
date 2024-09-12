import { formatISO } from "date-fns";
import { TimeZoneIdentifier } from "./timezone";
import { fromZonedTime } from "date-fns-tz";
import * as v from "valibot";
import { parseISO } from "date-fns/parseISO";
import { isValid } from "date-fns/isValid";

export class iCalDatetime {
    public date: Date;
    public timeZone?: TimeZoneIdentifier;

    static parse(str: string) {
        return v.parse(iCalDatetimeInputSchema, str);
    }

    constructor(date: Date) {
        this.date = date;
    }

    inTimeZone(timeZone: TimeZoneIdentifier): typeof this {
        this.timeZone = timeZone;
        return this;
    }

    toString() {
        const date = this.timeZone
            ? fromZonedTime(this.date, this.timeZone.timeZone)
            : this.date;

        return formatISO(date, { format: "basic" })
    }
}

const iCalDatetimeInputSchema = v.pipe(
    v.string(),
    v.transform(input => parseISO(input)),
    v.check(input => isValid(input)),
    v.transform(input => new iCalDatetime(input)),
)