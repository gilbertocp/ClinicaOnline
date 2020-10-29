import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { firestore } from 'firebase/app';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { PacienteService } from 'src/app/services/paciente.service';

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
  siteKey = environment.captchaKey;
  // cambiado a true para debuggear
  captchaVerificado: boolean = true;
  @ViewChild('inputFile', {static: false}) inputFile: ElementRef;

  constructor(
    private authSvc: AuthService, 
    private storage: AngularFireStorage,
    private usuariosSvc: UsuariosService,
    private profesionalesSvc: ProfesionalService,
    private pacientesSvc: PacienteService,
    private router: Router
  ) { } 

  ngOnInit(): void {
  }

  cambiado() {
    console.log(this.perfil);
  }

  registrar() {
    if(!this.perfil) {
      this.mostrarAlert('Tiene que especificar el tipo de perfil a registrar', 2000);
      return;
    }

    if(!this.captchaVerificado) {
      this.mostrarAlert('Verifique el captcha primero', 2000);
      return;
    }

    if(this.perfil === 'paciente' && this.imagenes.length !== 2) {
      this.mostrarAlert('Tiene que subir dos fotos para ingresar', 2000);
      return;
    }

    if(this.perfil === 'profesional' && this.especialidades.length === 0 ) {
      this.mostrarAlert('Tiene que agregar al menos una especialidad', 2000);
      return;
    }

    this.enEspera = true;

    this.authSvc.register(this.correo, this.clave).then(cred => {

      if(this.perfil === 'profesional') {
        this.usuariosSvc.addUsuarioWithId(cred.user.uid,{
          correo: this.correo,
          clave: this.clave,
          perfil: 'profesional'
        });

        this.profesionalesSvc.guardarProfesional({
          especialidades: firestore.FieldValue.arrayUnion(...this.especialidades),
          docIdUsuario: cred.user.uid,
          correo: this.correo,
          habilitado: false,
          puedeAtender: false,
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
              perfil: 'paciente'
            }
          );

          this.pacientesSvc.guardarPaciente({
            correo: this.correo,
            docIdUsuario: cred.user.uid,
            imagenes: firestore.FieldValue.arrayUnion(
              await tasks[0].ref.getDownloadURL(),
              await tasks[1].ref.getDownloadURL()
            ),
          });

          this.enEspera = false;
          this.authSvc.sendEmailVerification(cred.user);
          this.router.navigate(['perfil']);

        }).catch(err => {
          console.log(err.message);
        });
      }
    }).catch(() =>  {
      this.enEspera = false;

      this.mostrarAlert('No se ha podido registrar el usuario, por favor verifique que los campos ingresados sean correctos', 3000);
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

  mostrarAlert(errMsj: string, duracion: number = 1000): void {
    const alert = document.querySelector('#alert-form');
    document.querySelector('#alert-text').innerHTML = errMsj;
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), duracion);
  }

}
