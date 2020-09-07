import { IProduct } from './products.interfaces';

export interface IOrder {
    id: number;
    userName: string;
    userPhone: string;
    userCity: string;
    userStreet: string;
    userHouse: string;
    ordersDetails: Array<IProduct>;
    totalPayment: number;
    userComment?: string;
    date? : Date;
}