import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/products.interfaces';


export class Order implements  IOrder {
    constructor(
    public id: number,
    public userName: string,
    public userPhone: string,
    public userCity: string,
    public userStreet: string,
    public userHouse: string,
    public ordersDetails: Array<IProduct>,
    public totalPayment: number,
    public userComment?: string,
    public date?: Date,
    ){}
}