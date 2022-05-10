import {
    validateObject
} from '../utils/'
import {ValidationError} from "../../common/errors";

export async function validateBody<T extends object>(validatorClass: new () => T, req: any, res: any, next: any) {
    const errors = await validateObject(validatorClass, req.body)
    if (errors.length > 0) {
        next(new ValidationError(`Invalid property: ${errors[0].property}`));
    }
    next();
}