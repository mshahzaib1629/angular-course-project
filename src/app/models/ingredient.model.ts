export class Ingredient {
    // by using public in constructor's parameter, we can create the attributes of Ingredient on the go
    constructor(public name: string, public amount: number){}
}