export class NotFoundError extends Error {
    public statusCode: number;

    constructor(message: string = 'Not Found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}
