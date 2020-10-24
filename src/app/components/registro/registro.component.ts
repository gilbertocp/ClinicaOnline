import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { firestore } from 'firebase/app';
import { UsuariosService } from '../../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  perfil: string;
  correo: string;
  clave: string;
  imagenes = [];
  especialidad: string = '';  
  especialidades: string[] = [];
  ocultar = true;
  enEspera = false;
  @ViewChild('inputFile', {static: false}) inputFile: ElementRef;

  constructor(
    private authSvc: AuthService, 
    private storage: AngularFireStorage,
    private _snackBar: MatSnackBar,
    private usuariosSvc: UsuariosService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registrar() {
    if(this.perfil === 'paciente' && this.imagenes.length !== 2) {
      this._snackBar.open('Tiene que subir dos fotos', 'X', {
        duration: 2000
      });
      return;
    }


    if(this.perfil === 'profesional' && this.especialidades.length === 0 ) {
      this._snackBar.open('Debe agregar al menos una especialidad', 'X', {
        duration: 2000
      });
      return;
    }

    this.enEspera = true;

    this.authSvc.register(this.correo, this.clave).then(cred => {

      if(this.perfil === 'profesional') {
        this.usuariosSvc.addUsuarioWithId(cred.user.uid,{
          correo: this.correo,
          clave: this.clave,
          especialidades: firestore.FieldValue.arrayUnion(...this.especialidades),
          habilitado: false,
          perfil: 'profesional'
        });

        this.enEspera = false;
        this.router.navigate(['perfil']);
      } 

      if(this.perfil === 'paciente') {
        const fecha = new Date();
        const fechaYHoraStr = `${fecha.getDay()}-${fecha.getMonth()}-${fecha.getFullYear()}` + 
                              ` ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

        const uTask1 = this.storage.upload(`imagenes/${fechaYHoraStr}__${Math.random().toString(36).slice(-8)}`, this.imagenes[0]);
        const uTask2 = this.storage.upload(`imagenes/${fechaYHoraStr}__${Math.random().toString(36).slice(-8)}`, this.imagenes[1]);

        Promise.all([uTask1, uTask2]).then(async tasks =>  {

          this.usuariosSvc.addUsuarioWithId(
            cred.user.uid, 
            {
              correo: this.correo,
              clave: this.clave,
              imagenes : firestore.FieldValue.arrayUnion(
                await tasks[0].ref.getDownloadURL(),
                await tasks[1].ref.getDownloadURL()
              ),
              habilitado: false,
              perfil: 'paciente'
            }
          );

          this.authSvc.sendEmailVerification(cred.user);
          this.router.navigate(['perfil']);

        }).catch(err => {
          console.log(err.message);
        }).finally(() => {
          this.enEspera = false;
        });
      }
    });
  
  }

  imagenesSubidas({currentTarget}): void {
    for(const imagen of currentTarget.files) {
      this.imagenes.push(imagen);
    }
  }

  agregarEspecialidad(): void {
    if(this.especialidad !== '' && !this.especialidades.includes(this.especialidad)) {
      console.log(this.especialidad);
      
      this.especialidades.push(this.especialidad.trim());
      this.especialidad = '';
    }
  }

  eliminarEspecialidad(especialidad: string): void {
    this.especialidades.splice(this.especialidades.indexOf(especialidad), 1);    
  }

}
