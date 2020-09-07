import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userID: any;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  public currentUser: any;
  password: string;
  email: string;
  user: Array<IUser> = [];
  products: Array<any> = [];
  sale: number = 0;
  modalRef: BsModalRef;
  product: IProduct;
  uID: any;
  id: any; dat: any;
  active : "userInfo";
  
  constructor(private auth: AuthService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private modalService: BsModalService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private cartService: CartService, ) { }

  ngOnInit(): void {

    // this.getWishes();
    this.getUser();
    // this.updateLocalProducts();

  }
  private getUser(): void {

    this.firestore.collection('users').snapshotChanges().subscribe(
      collection => {
        // this.user =  
        collection.map(users => {
          const data = users.payload.doc.data() as IUser;
          const uid = users.payload.doc.id;
          const user = JSON.parse(localStorage.getItem('user'));

          data['unic'] = uid;

          if (data.id === user.id) {
            this.user.push(data);
            this.uID = uid;
          };

          console.log('data', data);

          return this.user;
          // return { uid, ...data };

        })
      }
    )


  }

  addInfo(): void {

    // this.id = user.id;
    const user = JSON.parse(localStorage.getItem('user'));

    // const currentUser = this.afAuth.auth.currentUser;
    const curID = document.querySelector('#uID').innerHTML;
;

    const users = {
      // uid: user.uid,
      displayName: this.userName,
      phoneNumber: this.userPhone,
      // email: user.email,
      // photoURL: user.photoURL,
      // providerId: user.providerId,
      userCity: this.userCity,
      userStreet: this.userStreet,
      userHouse: this.userHouse,
    };

    // user.providerData.splice(0,1,users);
    // this.afAuth.auth.updateCurrentUser(user)

    this.firestore.doc('users/' + this.uID).update(users);
    // console.log( 'this.id', this.id);

  }
}
