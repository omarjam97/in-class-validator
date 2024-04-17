export interface ValidationRule{
    identifier: string;
    execute : (value : any) => boolean;
    errorMessage : string;
}