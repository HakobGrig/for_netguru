import {validate} from 'class-validator';

export async function validateObject<T extends object>(
  validatorClass: new () => T,
  object: object
) {
  const body = new validatorClass();
  Object.assign(body, object);

  return await validate(body);
}
