/*
 * 4.2 Property parameters
 * ...
 * xparam     =x-name "=" param-value *("," param-value)
 */
import * as v from "valibot";

const XParamInputSchema = v.pipe(
    v.string(),
    v.regex(/.+=.+/),
    v.transform(input => {
        const [name, values] = input.split('=')
        return new XParam({ name, value: values.split(',') });
    }),
)

export class XParam {
    public name: string;
    public value: string[];

    static parse(str: string) {
        return v.parse(XParamInputSchema, str);
    }

    constructor({ name, value }: { name: string, value: string | string[] }) {
        this.name = name;
        this.value = Array.isArray(value) ? value : [value];
    }

    toString() {
        return `${this.name}=${this.joinedValues}`
    }

    get joinedValues() {
        return this.value.join(",")
    }
}