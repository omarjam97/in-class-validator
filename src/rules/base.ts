import { createValidationDecorator } from "../decorators/createValidationDecorator";
import { createValidationDecoratorRegex } from "../decorators/createValidationDecoratorRegex";

export const isInt = createValidationDecorator({
    ValidationRule : {
        identifier : "isInt",
        execute : (value : any) => {
            return typeof value === "number";
        },
        errorMessage : "the Property Need To Be Of Type Int"
    }
})
  


export const isString = createValidationDecorator({
    ValidationRule : {
        identifier : "isString",
        execute : (value : any) => {
            return typeof value === "string";
        },
        errorMessage : "the Property Need To Be Of Type String"
    }
})


export const inRange = (min : number, max: number) => {
    return createValidationDecorator({
        ValidationRule : {
            identifier : "inRange",
            execute : (value : any) => {
                return typeof value === "number" && value >= min && value <= max;
            },
            errorMessage : `the Property Need To Be Between ${min} and ${max}`
        }
})
    
}

export const isEmail = createValidationDecoratorRegex( "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" , {
    identifier: "isEmail",
    errorMessages : "the property must be an email"
})

// URL Validation
export const isUrl = createValidationDecoratorRegex(
    "^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?$",
    { identifier: "isUrl", errorMessages: "The property must be a valid URL." }
);

// US Phone Number Validation
export const isPhoneNumber = createValidationDecoratorRegex(
    "^\\+?1?\\s?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$",
    { identifier: "isPhoneNumber", errorMessages: "The property must be a valid US phone number." }
);

// US Postal Code Validation
export const isPostalCode = createValidationDecoratorRegex(
    "^\\d{5}(-\\d{4})?$",
    { identifier: "isPostalCode", errorMessages: "The property must be a valid US postal code." }
);

// Integer Validation
export const isInteger = createValidationDecoratorRegex(
    "^-?\\d+$",
    { identifier: "isInteger", errorMessages: "The property must be an integer." }
);

// Positive Integer Validation
export const isPositiveInteger = createValidationDecoratorRegex(
    "^\\d+$",
    { identifier: "isPositiveInteger", errorMessages: "The property must be a positive integer." }
);

// Negative Integer Validation
export const isNegativeInteger = createValidationDecoratorRegex(
    "^-\\d+$",
    { identifier: "isNegativeInteger", errorMessages: "The property must be a negative integer." }
);

// Decimal Number Validation
export const isDecimal = createValidationDecoratorRegex(
    "^-?\\d*\\.\\d+$",
    { identifier: "isDecimal", errorMessages: "The property must be a decimal number." }
);

// Credit Card Number Validation
export const isCreditCard = createValidationDecoratorRegex(
    "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$",
    { identifier: "isCreditCard", errorMessages: "The property must be a valid credit card number." }
);

// IPv4 Address Validation
export const isIPv4 = createValidationDecoratorRegex(
    "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$",
    { identifier: "isIPv4", errorMessages: "The property must be a valid IPv4 address." }
);

// IPv6 Address Validation
export const isIPv6 = createValidationDecoratorRegex(
    "^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$",
    { identifier: "isIPv6", errorMessages: "The property must be a valid IPv6 address." }
);

// Date (YYYY-MM-DD) Validation
export const isDate = createValidationDecoratorRegex(
    "^(\\d{4})-(\\d{2})-(\\d{2})$",
    { identifier: "isDate", errorMessages: "The property must be a valid date in YYYY-MM-DD format." }
);

// Hex Color Code Validation
export const isHexColor = createValidationDecoratorRegex(
    "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
    { identifier: "isHexColor", errorMessages: "The property must be a valid hex color code." }
);

export const isSSN = createValidationDecoratorRegex(
    "^(?!000|666|9\\d\\d)\\d{3}-(?!00)\\d{2}-(?!0000)\\d{4}$",
    {
        identifier: "isSSN",
        errorMessages: "The property must be a valid U.S. Social Security Number."
    }
);


export const isAlphanumeric = createValidationDecoratorRegex(
    "^[a-zA-Z0-9]+$",
    {
        identifier: "isAlphanumeric",
        errorMessages: "The property must be alphanumeric (letters and numbers only)."
    }
);

export const isStrongPassword = createValidationDecoratorRegex(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    {
        identifier: "isStrongPassword",
        errorMessages: "The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
);

export const isMACAddress = createValidationDecoratorRegex(
    "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
    {
        identifier: "isMACAddress",
        errorMessages: "The property must be a valid MAC address."
    }
);


export const isJsonString = createValidationDecoratorRegex(
    "^(?:\\{\\s*\\\"(?:[^\\\"]|\\\\\\\")*\\\"\\s*:\\s*(?:true|false|null|\"(?:[^\\\"]|\\\\\\\")*\"|\\d+|\\{(?:\\s*\\\"(?:[^\\\"]|\\\\\\\")*\\\"\\s*:\\s*(?:true|false|null|\"(?:[^\\\"]|\\\\\\\")*\"|\\d+|\\[.*?\\]|\\{.*?\\}))*\\}|\\[.*?\\])\\s*,\\s*)*\\}$",
    {
        identifier: "isJsonString",
        errorMessages: "The property must be a valid JSON string."
    }
);

export const isLatitude = createValidationDecoratorRegex(
    "^([-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))$",
    {
        identifier: "isLatitude",
        errorMessages: "The property must be a valid latitude."
    }
);

export const isLongitude = createValidationDecoratorRegex(
    "^([-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?))$",
    {
        identifier: "isLongitude",
        errorMessages: "The property must be a valid longitude."
    }
);
