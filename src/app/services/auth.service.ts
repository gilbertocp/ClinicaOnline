import { Injectable } from '@angular/core';
import { first, map, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
import { User } from 'firebase/app';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Profesional } from '../models/profesional';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // para autenticar perfil usuario
  public user$: Observable<Usuario>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<Usuario>('usuarios/' + user.uid).snapshotChanges().pipe(map(actions => {
            const obj: Usuario = {
              docId: user.uid,
              ...actions.payload.data()
            };
            return obj;
          }));
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

  logout(): void {
    localStorage.removeItem('login_user_clinica_online');
    this.router.navigate(['/iniciarSesion']);
    this.afAuth.signOut();
  }

  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState.pipe(first());
  }

  getCurrentUserData(tipoUsuario: string): Observable<Profesional | Paciente> {

    return this.afAuth.authState.pipe(
      switchMap((user: User) => {

        if (user) {
          if (tipoUsuario === 'paciente') {
            return this.db
            .collection<Paciente>('pacientes', ref => ref.where('docIdUsuario', '==', user.uid))
            .valueChanges({idField: 'docId'});
          }

          if (tipoUsuario === 'profesional') {
            return this.db
            .collection<Profesional>('profesionales', ref => ref.where('docIdUsuario', '==', user.uid))
            .valueChanges({idField: 'docId'});
          }

          return null;
        }

        return of(null);
      })
    );
  }

  sendEmailVerification(firebaseUser: User): Promise<void> {
    return firebaseUser.sendEmailVerification();
  }

}
