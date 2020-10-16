import { Injectable } from '@angular/core';
import { first, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc(`usuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getCurrentUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
