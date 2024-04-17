# Class Property Validator (Educational Project)

This TypeScript library offers a straightforward approach to validating class properties using decorators, designed specifically for educational purposes. Learn how decorators work in TypeScript for enforcing data validation rules, inspired by the robust features of the well-known `class-validator` library.

## Disclaimer

**Important**: This package is intended for educational use only and is **not suitable for production environments**. It was developed to demonstrate how data validation frameworks can be implemented in TypeScript. For production applications, please consider using [class-validator](https://github.com/typestack/class-validator), a mature and feature-rich library.

## Features

- **Educational Tool**: Great for learning how decorators can be used for validating class properties.
- **Simple Usage**: Easy to understand and use, providing a basic set of validators.
- **Inspired by class-validator**: Concepts borrowed from a well-established library to provide a practical learning experience.

## Installation

```bash
npm install in-class-validator
```

Ensure that your TypeScript configuration (tsconfig.json) supports decorators:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Usage

First, import the validators you need from the package:

```typescript
import { isEmail, isInt, isString } from 'in-class-validator';
```

Then, apply these validators to your class properties:

```typescript
import  {  isString,  Validator,  isEmail,  isIPv4,  inRange}  from  "in-class-validator"

class User {
    @isEmail
    email: string;

    @inRange(18,100)
    age: number;

    @isString
    name: string;
}

const user = new User();
user.name = "John"; //should Pass
user.age = 30; //should Pass
user.email = "notEmail.com"; //should Fail

const errors = Validator.validate(user); 

if (errors) { 
	console.error(errors); 
} else { 
	console.log("Validation passed!"); 
}
```

## Core Concepts

### `validationOptions`
This object allows customization of the validation process. Here are its properties:
- **`skipMissingProperties`**: `boolean` (default: `false`)  
  If set to `true`, the validator ignores any properties that are missing on the validation target.
- **`returnOptions`**: Object that specifies what should be included in the `validationError`:
  - **`target`**: `boolean` (default: `true`)  
    Includes the target object where the error occurred.
  - **`value`**: `boolean` (default: `true`)  
    Includes the value that failed validation.

### `validationError`
This class represents errors that occur during validation. It includes:
- **`property`**: The name of the property that failed validation.
- **`constraints`**: An array or object detailing the failed rules and their messages.
- **`target`** (optional): The object containing the validated property, included based on `validationOptions`.
- **`value`** (optional): The value that failed validation, included based on `validationOptions`.

#### Usage Example
```typescript
if (errors) {
    errors.forEach(error => {
        console.log(`Validation failed for property: ${error.property}, Message: ${error.constraints.join(", ")}`);
    });
}
```

## Detailed Method Descriptions

### `validate`
Validates an object's properties based on the decorators applied to them. If any property fails validation, it compiles and returns an array of `validationError` objects.
#### Usage
```typescript
const errors = Validator.validate(user);
if (errors) {
    console.error(errors);
} else {
    console.log("Validation passed!");
}
```

### `validateOrFail`
This method attempts to validate an object like `validate`, but instead of collecting all errors, it returns only the first `validationError` encountered. This is useful for cases where you need to fail fast and do not require details of all validation errors.
#### Usage
```typescript
try {
    const error = Validator.validateOrFail(user);
    if (error) {
        console.error("Validation failed", error);
    }
} catch (error) {
    console.error("An error occurred during validation", error);
}
```

### `validateOrThrow`
Similar to `validateOrFail`, this method throws an error immediately when a validation fails. This is ideal in scenarios where invalid input must prevent further execution, such as in transaction processing or critical data entry applications.
#### Usage
```typescript
try {
    Validator.validateOrThrow(user);
    console.log("Validation passed!");
} catch (error) {
    console.error("Validation error", error);
}
```

## Available Validators

- **isEmail**: Validates that the property is a valid email address.
- **inRange(min, max)**: Validates that the property is a number within a specified range, inclusive. The `min` and `max` parameters are defined when the decorator is applied, allowing for dynamic range validation.
- **isUrl**: Validates that the property is a valid URL.
- **isPhoneNumber**: Validates that the property is a valid US phone number.
- **isPostalCode**: Validates that the property is a valid US postal code.
- **isInteger**: Validates that the property is an integer.
- **isPositiveInteger**: Validates that the property is a positive integer.
- **isNegativeInteger**: Validates that the property is a negative integer.
- **isDecimal**: Validates that the property is a decimal number.
- **isCreditCard**: Validates that the property is a valid credit card number.
- **isIPv4**: Validates that the property is a valid IPv4 address.
- **isIPv6**: Validates that the property is a valid IPv6 address.
- **isDate**: Validates that the property is a valid date in YYYY-MM-DD format.
- **isHexColor**: Validates that the property is a valid hex color code.
- **isString**: Validates that the property is a string.

Each validator can be imported and applied as a decorator to class properties.


## Extending the Library

This section explains how to create custom validators using our library's tools. These utilities facilitate the implementation of both standard and parameter-specific validation rules to ensure flexibility and adaptability for various validation needs.

### `createValidationDecorator`

**Purpose**: This function is the core tool for creating custom validation decorators. It allows you to define validation logic and associate it directly with class properties using decorators.

**How It Works**:

-   **Integration**: Integrates directly with the class's metadata to register validation rules.
-   **Customization**: Allows developers to define unique validation logic and error messages.
-   **Application**: Useful for creating validators that do not require external parameters and have a fixed validation criterion.

**Usage Example**:

```typescript
import { createValidationDecorator } from 'in-class-validator';

export const isString = createValidationDecorator({
    ValidationRule: {
        identifier: "isString",
        execute: (value: any) => typeof value === "string",
        errorMessage: "The property must be a string"
    }
});
   
class User {
    @isString
    name: string;
}
```
This decorator, `isString`, ensures that the `name` property of a `User` instance is a string.

### `createValidationDecoratorRegex`

**Purpose**: Simplifies the creation of regex-based validation decorators, making it easier to validate properties against specific patterns.

**How It Works**:

-   **Ease of Use**: Provides a straightforward way to implement common pattern validations such as emails, URLs, or custom regex patterns.
-   **Flexibility**: Users only need to supply a regex pattern and the corresponding error message.

**Usage Example**:


```typescript
import { createValidationDecoratorRegex } from 'in-class-validator';

export const isEmail = createValidationDecoratorRegex(
    "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    {
        identifier: "isEmail",
        errorMessages: "The property must be a valid email address."
    }
);

class Contact {
    @isEmail
    email: string;
}` 
```
This example creates an `isEmail` decorator that validates whether a property is a valid email address.

### Parameterized Custom Validators (`inRange` Example)

**Purpose**: Allows for the creation of decorators that accept parameters, enabling dynamic validation rules that can be adjusted according to the use case.

**How It Works**:

-   **Dynamic Parameters**: You can pass parameters at the time of decoration to tailor the validation logic to specific needs.
-   **Versatility**: Ideal for validations where the criteria vary, such as numeric ranges or string length limits.

**Usage Example**:
```typescript
import { createValidationDecorator } from 'in-class-validator';

export const inRange = (min: number, max: number) => {
    return createValidationDecorator({
        ValidationRule: {
            identifier: "inRange",
            execute: (value: any) => typeof value === "number" && value >= min && value <= max,
            errorMessage: `The property needs to be between ${min} and ${max}`
        }
    });
};

class Product {
    @inRange(1, 100)
    quantity: number;
}`` 
```
This `inRange` validator dynamically ensures that the `quantity` of a `Product` falls within the specified range.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with your enhancements, or open issues for bugs and feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
