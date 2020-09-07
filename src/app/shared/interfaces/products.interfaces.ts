

export interface IProduct {
    id: number;
    category: string;
    subcategory: string;
    size: string;
    color: string;
    vendor: string;
    name: string;
    description: string;
    oldPrice: number;
    newPrice: number;
    image: Array<string>;
    count: number;
    userID?: string;
    status?:boolean ;


    // id: number;
    // category: ICategory;
    // subcategory: ISubcategory;
    // size: ISize;
    // color: IColor;
    // vendor: IVendor;
    // name: string;
    // description: string;
    // price: number;
    // image: string;
}