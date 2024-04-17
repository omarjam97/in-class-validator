import { createValidationDecorator } from "../decorators/createValidationDecorator";

export const createValidationDecoratorRegex = (regex: string, options: { identifier: string, errorMessages: string }) => {
    return createValidationDecorator({
        ValidationRule: {
            identifier: options.identifier,
            execute: (value: any) => {
                return new RegExp(regex).test(value); // Using RegExp to test the value against the regex
            },
            errorMessage: options.errorMessages // Using the custom error message
        }
    })
};