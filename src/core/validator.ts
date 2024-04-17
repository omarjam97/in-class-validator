import { validationOptions } from "../interfaces";
import { ValidationMetadata } from "../metadata/validationMetadata";
import { validationError } from "../models/validationError";

const defaultOptions: validationOptions = {
    skipMissingProperties: false,
    returnOptions: {
        target: true,
        value: true
    }
};

class Validator {

    static validate(target: Object, options: validationOptions = defaultOptions): validationError[] | null {
        const properties = ValidationMetadata.getPropertiesForClass(target);
        const validationErrors: validationError[] = properties.map(property => this.validateProperty(target, property, options))
                                                              .filter((error): error is validationError => error !== null);

        return validationErrors.length > 0 ? validationErrors : null;
    }

    static validateOrFail(target: Object, options: validationOptions = defaultOptions): validationError | null {
        const properties = ValidationMetadata.getPropertiesForClass(target);
        for (let property of properties) {
            const validationResult = this.validateProperty(target, property, options);
            if (validationResult) return validationResult;
        }
        return null;
    }

    static validateOrThrow(target: Object, options: validationOptions = defaultOptions): null {
        const validationError = this.validateOrFail(target,options);
        if(validationError){
            throw validationError;
        }
        return null
    }

    private static validateProperty(target: Object, property: string, options: validationOptions): validationError | null {
        const propertyValue = target[property as keyof typeof target]; 
        const _validationError = new validationError(property);

        this.applyReturnOptions(_validationError, target, propertyValue, options); 

        if (typeof propertyValue !== 'undefined') {
            this.applyValidators(_validationError, target, property, propertyValue);
 

        } else if (!options.skipMissingProperties) {
            _validationError.addConstraints("required", "This property is required");
 

        }

        return _validationError.hasConstraints() ? _validationError : null;
    }

    private static applyReturnOptions(validationError: validationError, target: Object, propertyValue: any, options: validationOptions): void {
        if (options?.returnOptions?.target) {
            validationError.target = target;
        }
        if (options?.returnOptions?.value) {
            validationError.value = propertyValue;
        }
    }

    private static applyValidators(validationError: validationError, target: Object, property: string, propertyValue: Object): void {
        const validators = ValidationMetadata.getValidatorsForProperty(target, property);
        //make sure that validaotrs exists
        validators?.forEach(validator => {
            if (!validator.execute(propertyValue)) {
                validationError.addConstraints(validator.identifier, validator.errorMessage);
            }
        });
    }
}

export { Validator };
