
import { IUser } from '../interfaces/user.interface';
import { IProduct } from '../interfaces/products.interfaces';

export class User implements IUser {
    constructor(
        public id: string,
        public collectionId: string,
        public username: string,
        public displayName: string,
        public password: string,
        public userCity: string,
        public userHouse: string,
        public userStreet: string,
        public phoneNumber: string,
        public role: string,
        public wishList: Array<IProduct>,
        public shoppingCartItems: Array<IProduct>,
    ) { }
}
