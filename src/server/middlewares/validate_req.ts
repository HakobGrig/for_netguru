import {
    validateObject
} from '../utils/'

export async function validateBody<T extends object>(validatorClass: new () => T, req: any, res: any, next: any) {
    const errors = await validateObject(validatorClass, req.body)
    if (errors.length > 0) {
        next(new Error('validation error'));
    } else {
        next();
    }
}