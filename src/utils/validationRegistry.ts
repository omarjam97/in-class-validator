import { ValidationRule } from "../interfaces";

export namespace ValidationRegistry {
    export const decoratorsContainer = new Map<string, ValidationRule>();

    /**
     * Registers a new validation rule in the registry.
     * @param {ValidationRule} validator The validation rule to register.
     * @throws {Error} Throws an error if a validation rule with the same identifier already exists.
     * @returns {never}
     */
    export function register(validator: ValidationRule): void | never {
        if (decoratorsContainer.has(validator.identifier)) {
            throw new Error(`A validation rule with the identifier '${validator.identifier}' already exists. Each validation rule must have a unique identifier.`);
        }
        decoratorsContainer.set(validator.identifier, validator);
    }

    /**
     * Retrieves a validation rule by its identifier.
     * @param identifier The identifier of the validation rule to retrieve.
     * @returns The validation rule if found, otherwise undefined.
     */
    export function get(identifier: string): ValidationRule | undefined {
        return decoratorsContainer.get(identifier);
    }
}
