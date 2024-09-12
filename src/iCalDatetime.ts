import { formatISO } from "date-fns";
import { TimeZoneIdentifier } from "./timezone";
import { fromZonedTime } from "date-fns-tz";

export class iCalDatetime {
    public date: Date;
    public timeZone?: TimeZoneIdentifier;

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