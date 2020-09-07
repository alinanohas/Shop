import { IProduct } from './products.interfaces';

export interface IUser {
     id: string;
     collectionId: string;
     username: string;
     displayName?: string;
     password?: string;
     userCity?: string;
     userHouse?: string;
     userStreet?: string;
     phoneNumber?: string;
     role?: string;
     wishList? : Array<IProduct>;
     shoppingCartItems? : Array<IProduct>;
     
}