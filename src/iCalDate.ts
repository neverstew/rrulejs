import { formatISO } from "date-fns";

export class iCalDate {
    public date: Date;

    constructor(date: Date) {
        this.date = date;
    }

    toString() {
        return formatISO(this.date, { format: "basic", representation: "date" })
    }
}