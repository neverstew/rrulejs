/*
 * 4.2 Property parameters
 * ...
 * xparam     =x-name "=" param-value *("," param-value)
 */
export class XParam {
    private name: string;
    private value: string | string[];

    constructor({ name, value }: { name: string, value: string | string[] }) {
        this.name = name;
        this.value = value;
    }

    toString() {
        return `${this.name}=${this.joinedValues}`
    }

    get joinedValues() {
        if (Array.isArray(this.value)) {
            return this.value.join(",")
        }
        return this.value;
    }
}