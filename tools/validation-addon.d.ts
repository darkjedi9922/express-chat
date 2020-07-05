/// <reference types="express" />

interface ValidationError {
    value: any,
    msg: string,
    param: string,
    location: string
}

declare namespace Express {
    export interface Request {
        errors: ValidationError[]
    }
}