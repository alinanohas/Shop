import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../classes/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;
  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  public checkAdminLogin: boolean;
  public checkUserLogin: boolean;

  constructor(private router: Router,
              private ngZone: NgZone, 
              private http: HttpClient, 
              private afAuth: AngularFireAuth,
              private firestore: AngularFirestore) {
    // this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUser.asObservable();
    // this.url = 'http://localhost:3000/login';
  }

  //   setUserStatus(userStatus: any): void {
  //     this.userStatus = userStatus;
  //     this.userStatusChanges.next(userStatus);
  //   }

  //   public get currentUserValue(): User {
  //     return this.currentUserSubject.value;
  // }

  // login(email: string, password: string) {
  //   return this.http.post<{ currentUser: string }>(this.url, { email, password }).pipe(tap(res => {
  //     localStorage.setItem('currentUser', res.currentUser);
  //   }))
  // }

  // register(email: string, password: string) {
  //   return this.http.post<{ access_token: string }>(this.url, { email, password }).pipe(tap(res => {
  //     this.login(email, password)
  //   }))
  // }

  // logout() {
  //   localStorage.removeItem('currentUser');
  // }

  // public get loggedIn(): boolean {
  //   return localStorage.getItem('currentUser') !== null;
  // }
  //  public get currentUserValue(): User {
  //       return this.currentUser.value;
  //   }
  // login(username: string, password: string) {
  //     return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
  //         .pipe(map(user => {
  //             // store user details and jwt token in local storage to keep user logged in between page refreshes
  //             localStorage.setItem('currentUser', JSON.stringify(user));
  //             this.currentUserSubject.next(user);
  //             return user;
  //         }));
  // }

  signUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        // add the user to the "users" database
        const user = {
          id: userResponse.user.uid,
          username: userResponse.user.email,
          role: 'user'
        };
        //add the user to the database
        this.firestore.collection('users').add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              // this.router.navigate(['/profile']);
              this.login(email, password);
            });
          }).catch(err => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('An error ocurred: ', err);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        this.firestore.collection('users').ref.where('username', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            console.log('userRef', userRef.data());
            this.currentUser = userRef.data();
            this.currentUser.collectionId = userRef.id;
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            if (userRef.data().role !== 'admin') {
              this.checkUserLogin = true;
              this.userStatusChanges.next('user');
              this.router.navigate(['/profile']);
            } else {
              this.checkAdminLogin = true;
              this.userStatusChanges.next('admin');
              this.router.navigate(['/admin']);
            }
          });
        });
      }).catch(err => err)
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('user signed Out successfully');
        localStorage.removeItem('user');
        this.userStatusChanges.next('logout');
        this.checkAdminLogin = false;
        this.checkUserLogin = false;
        this.ngZone.run(() => this.router.navigate(['/']));
      }).catch((err) => {
        console.log(err);
      })
  }

  isAdminLogin(): boolean {
    return this.checkAdminLogin;
  }

  isUserLogin(): boolean {
    return this.checkUserLogin;
  }

}
