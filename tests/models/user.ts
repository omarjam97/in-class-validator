import { isString ,inRange, isEmail } from "../../src/rules/base";

export class User{
    @isEmail
    email : any
}
