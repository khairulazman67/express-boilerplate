
import { ZodError } from 'zod';

interface errorMessages {
    [key: string]: string;
}
  
export const formatZodError = (err: ZodError) => {
    const { fieldErrors } = err.flatten();
    const errors: errorMessages = {};

    for (let key of Object.keys(fieldErrors)) {
        const errorMsg = fieldErrors[key];
        if (errorMsg != undefined) {
            errors[key] = errorMsg[0];
        }
    }

    return errors;
};