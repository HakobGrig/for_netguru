import {validate} from "class-validator";


export async function validateObject<T extends object>(validatorClass: new () => T, object: any) {
    let body = new validatorClass();
    Object.assign(body, object);

    return await validate(body);
}