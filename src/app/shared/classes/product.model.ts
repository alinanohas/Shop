import { IProduct } from '../interfaces/products.interfaces';
import { ICategory } from '../interfaces/category.interface';
import { ISize } from '../interfaces/size.interface';
import { IColor } from '../interfaces/color.interface';
import { IVendor } from '../interfaces/vendor.interface';
import { ISubcategory } from '../interfaces/subcategory.interface';

export class Product implements IProduct {
    constructor(
        public id: number,
  
        public category: string,
        public subcategory: string,
        public size: string,
        public color: string,
        public vendor: string,
        public name: string,
        public description: string,
        public oldPrice: number,
        public newPrice: number,
        public image: Array<string>,
        public count: number = 1,
        public userID?: string,
        public status?:boolean,

    ) { }

    // constructor(
    //     public id: number,
    //     public category: ICategory,
    //     public subcategory: ISubcategory,
    //     public size: ISize,
    //     public color: IColor,
    //     public vendor: IVendor,
    //     public name: string,
    //     public description: string,
    //     public price: number,
    //     public image: string,

    // ) { }
}