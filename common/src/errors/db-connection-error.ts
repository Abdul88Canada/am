import { CustomError } from "./custom-error";

export class DBConnectionError extends CustomError{
    reason = 'Error connecting to db';
    statusCode = 500;

    constructor() {
        super('Error connecting to db');

        Object.setPrototypeOf(this, DBConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}