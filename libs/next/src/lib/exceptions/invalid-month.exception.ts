export class ZuiInvalidMonthException extends Error {
    constructor(month: number) {
        super(`Invalid month: ${month}`);
    }
}
