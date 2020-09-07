import { IVendor } from '../interfaces/vendor.interface';

export class Vendor implements IVendor{
    constructor(
        public id : number,
        public vendorName: string,
    ){}
}