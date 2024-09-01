
class validationError{
    public target?: any
    public value?: any
    constraints : {
        [type : string] : string;
    } = {};

    children?: validationError[];

    constructor(public property: string){}

    addConstraints(identfier : string,errorMessage : string){
        this.constraints[identfier] = errorMessage;
    }

    hasConstraints(){
        return Object.getOwnPropertyNames(this.constraints).length > 0 ;
    }

    toJson(){
        return {
            property: this.property,
            constraints: Object.getOwnPropertyNames(this.constraints).map(key => (this.constraints[key])),
        }
    }

}

export {
    validationError
};