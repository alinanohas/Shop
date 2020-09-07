import { ISubcategory } from '../interfaces/subcategory.interface';

export class Subcategory implements ISubcategory{
    constructor(
        public id : number,
        public subcategoryName: string,
    ){}
}