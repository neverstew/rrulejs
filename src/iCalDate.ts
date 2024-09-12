import { formatISO } from "date-fns";
import { isValid } from "date-fns/isValid";
import { parseISO } from "date-fns/parseISO";
import * as v from "valibot";

export class iCalDate {
    public date: Date;

    static parse(str: string) {
        return v.parse(iCalDateInputSchema, str);
    }

    constructor(date: Date) {
        this.date = date;
    }

    toString() {
        return formatISO(this.date, { format: "basic", representation: "date" })
    }
}

const iCalDateInputSchema = v.pipe(
    v.string(),
    v.transform(input => parseISO(input)),
    v.check(input => isValid(input)),
    v.transform(input => new iCalDate(input)),
)