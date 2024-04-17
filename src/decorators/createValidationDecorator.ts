import { ValidationDecoratorOptions } from "../interfaces/validationDecoratorOptions";
import { ValidationMetadata } from "../metadata/validationMetadata";
import { ValidationRegistry } from "../utils/validationRegistry";



function createValidationDecorator(options : ValidationDecoratorOptions): PropertyDecorator{

    ValidationRegistry.register(options.ValidationRule);

    return (target : Object, propertyKey : symbol | string) : void => {
        ValidationMetadata.registerPropertyForClass(target,String(propertyKey));
        ValidationMetadata.registerValidatorForProperty(target,String(propertyKey),options.ValidationRule.identifier);
    };

}

export {
    createValidationDecorator
}