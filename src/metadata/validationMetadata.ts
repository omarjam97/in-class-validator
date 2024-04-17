import { ValidationRule } from "../interfaces/validationRule";
import { ValidationRegistry } from "../utils/validationRegistry";

class ValidationMetadata{

    private static readonly metadataKey = Symbol("in-class-validator");
    private static readonly propertyNamesKey = Symbol("in-class-properties-names");


    public static registerPropertyForClass(target: Object, propertyKey: string){
      const classPropertiesSet: Set<string> = new Set(this.getPropertiesForClass(target));
      classPropertiesSet.add(propertyKey);
      Reflect.defineMetadata(this.propertyNamesKey, Array.from(classPropertiesSet), target);
    }

    public static getPropertiesForClass(target: Object): Array<string> {
        return Reflect.getMetadata(ValidationMetadata.propertyNamesKey, target) || [];
    }


    public static registerValidatorForProperty(target: Object, propertyKey: string, identifier: string): void {
        const validators: string[] = Reflect.getMetadata(ValidationMetadata.metadataKey, target, propertyKey) ?? [];
        validators.push(identifier);
        Reflect.defineMetadata(ValidationMetadata.metadataKey, validators, target, propertyKey);
    }

    public static getValidatorsForProperty(target: Object, propertyKey: string): ValidationRule[] | null {
        const identifiers: string[] = Reflect.getMetadata(ValidationMetadata.metadataKey, target, propertyKey);
        return identifiers ? identifiers.map(id => ValidationRegistry.get(id)).filter(v => v !== undefined) as ValidationRule[] : null;
    }
    
}

export {
    ValidationMetadata
}