import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from './400error';
import { NotFoundError } from './404error';
import { UnauthorizedError } from './401error';
import { ForbiddenError } from './403error';
import { ConflictError } from './409error';
import { JoiError } from './joiError';
import axios, { AxiosError } from 'axios';

// Express middleware for error handling
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (
        err instanceof NotFoundError ||
        err instanceof BadRequestError ||
        err instanceof UnauthorizedError ||
        err instanceof ForbiddenError ||
        err instanceof ConflictError
    ) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof JoiError) {
        return res
            .status(err.statusCode)
            .json({ message: `${err.name}: ${err.message}`.replace(' Error:', '') });
    } else if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNREFUSED') {
            const connectError = err as CustomConnectError;

            return res.status(500).json({
                message: `Cannot connect to ${connectError.address}:${connectError.port}`,
            });
        }
        const axiosError = err as CustomAxiosError;

        return res.status(axiosError.response.status).json({
            message: axiosError.response.data.message,
        });
    } else {
        return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
};

export type CustomAxiosError = {
    response: {
        data: {
            message: string;
        };
        status: number;
    };
};

export type CustomConnectError = AxiosError & {
    code: string;
    address: string;
    port: number;
};
