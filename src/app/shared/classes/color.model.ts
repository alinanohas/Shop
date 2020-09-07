import { IColor } from '../interfaces/color.interface';

export class Color implements IColor{
    constructor(
        public id : number,
        public colorName: string,
        public selected: boolean,
    ){}
}