export class DBConnectionError extends Error {
    reason = 'Error connecting to db';
    statusCode = 500;

    constructor() {
        super();

        Object.setPrototypeOf(this, DBConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}