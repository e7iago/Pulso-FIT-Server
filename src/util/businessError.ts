export default class BusinessError extends Error {
    public readonly statusCode: number;
    public readonly details?: string[];

    constructor(message: string, statusCode: number = 400, details?: string[]) {
        super(message);
        this.statusCode = statusCode;
        this.details = details || [];

        Object.setPrototypeOf(this, BusinessError.prototype);
    }
}