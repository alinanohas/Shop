import { ISize } from '../interfaces/size.interface';

export class Size implements ISize{
    constructor(
        public id : number,
        public sizeName: string,
    ){}
}