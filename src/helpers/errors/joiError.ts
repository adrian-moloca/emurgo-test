export class JoiError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'JoiError';
        this.statusCode = 400;
    }
}
