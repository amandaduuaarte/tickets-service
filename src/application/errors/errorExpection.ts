export class BadRequestException extends Error {
    public readonly statusCode = 400;
    public readonly code;

    constructor(message: string, code: number) { 
        super(message);
        this.message = message;
        this.code = code;
    }
}