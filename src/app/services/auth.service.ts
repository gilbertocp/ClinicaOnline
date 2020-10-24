import { Injectable } from '@angular/core';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<Usuario>;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.collection<Usuario>('usuarios').doc(user.uid).snapshotChanges().pipe(
            filter(actions => {
            return actions.payload.id === user.uid;
            }),
            map(actions => {
              const obj: Usuario = {
                docId: actions.payload.id,
                ...(actions.payload.data() as Usuario)
              };
              return obj;
            })
          );
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

  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState.pipe(first());
  }

  sendEmailVerification(firebaseUser: User): Promise<void> {
    return firebaseUser.sendEmailVerification();
  }
}
