import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;
  enEspera: boolean = false;
  imagenes: File[] = [];
  siteKey = environment.captchaKey;
  captchaVerificado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private profesionalSvc: ProfesionalService,
    private usuariosSvc: UsuariosService,
    private pacientesSvc: PacienteService,
    private storage: AngularFireStorage,
    private router: Router
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get nombreNoValido(): boolean {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }

  get apellidoNoValido(): boolean {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }

  get correoNoValido(): boolean {
    return this.formulario.get('correo').invalid && this.formulario.get('correo').touched;
  }

  get perfilNoValido(): boolean {
    return this.formulario.get('perfil').invalid && this.formulario.get('perfil').touched;
  }

  get claveNoValida(): boolean {
    return this.formulario.get('clave').invalid && this.formulario.get('clave').touched;
  }

  get especialidades(): FormArray {
    return this.formulario.get('especialidades') as FormArray;
  }

  get esProfesional(): boolean {
    return this.formulario.get('perfil').value === 'profesional';
  }

  get esPaciente(): boolean {
    return this.formulario.get('perfil').value === 'paciente';
  }

  especialidadNoValida(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      perfil : ['', [Validators.required]],
      clave: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  subirImagenes({currentTarget}): void {
    for (const imagen of currentTarget.files)
      this.imagenes.push(imagen);
  }

  agregarEspecialidad(): void {
    this.especialidades.push(this.formBuilder.control('', Validators.required));
  }

  borrarEspecialidad(idx: number): void {
    this.especialidades.removeAt(idx);
  }

  perfilSeleccionado({currentTarget}): void {
    if(currentTarget.value === 'profesional') {
      this.formulario.addControl('especialidades', this.formBuilder.array([]));
    } else {
      this.formulario.removeControl('especialidades');
    }
  }

  async registrar(): Promise<void> {
    if(this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => control.markAllAsTouched());
    }

    const {perfil, especialidades} = this.formulario.value;

    if(!this.captchaVerificado){  
      Swal.fire({
        title: 'Verifique el captcha primero',
        icon: 'warning'
      });

      return;
    }

    if(perfil === 'paciente' && this.imagenes.length !== 2) {
      Swal.fire({
        title: 'Tiene que subir dos imagenes',
        icon: 'warning',
      });

      return;
    }    

    if(perfil === 'profesional' && (!especialidades || especialidades.length === 0)) {
      Swal.fire({
        title: 'Tiene que agregar al menos una especialidad',
        icon: 'warning',
      });

      return;
    }

    if(perfil === 'paciente'){ 
      this.registrarPaciente();
    }else {
      this.registrarProfesional();
    }
  }

  async registrarProfesional(): Promise<void> {
    this.enEspera = true;

    const {nombre, apellido, perfil, clave, correo, especialidades} = this.formulario.value;

    try {
      const credentials = await this.authSvc.register(correo, clave);

      this.usuariosSvc.addUsuarioWithId(credentials.user.uid, {correo, clave, perfil})
  
      const ref = await this.profesionalSvc.guardarProfesional({
        nombre, apellido, especialidades, correo,
        docIdUsuario: credentials.user.uid,
        habilitado: false,
        puedeAtender: false,
      });

      this.profesionalSvc.enviarSolicitudAprobacion(ref.id, correo);
      this.router.navigate(['/perfil']);

    } catch (err) {
      this.alertaErrorRegistro();
    } finally {
      this.enEspera = false;
    }
  
  }

  async registrarPaciente(): Promise<void> {
    this.enEspera = true;

    const {nombre, apellido, perfil, clave, correo} = this.formulario.value;
    const fechaImg = moment().format('DD-MM-YYYY HH:mm:ss');

    try {
      const credentials = await this.authSvc.register(correo, clave);

      const uTask1 =  this.storage.upload(`imagenes/${fechaImg}__${Math.random().toString(36).slice(-8)}`, this.imagenes[0]);
      const uTask2 = this.storage.upload(`imagenes/${fechaImg}__${Math.random().toString(36).slice(-8)}`, this.imagenes[1]);

      const tasks = await Promise.all([uTask1, uTask2]);

      this.usuariosSvc.addUsuarioWithId(credentials.user.uid, {correo, clave, perfil});

      this.pacientesSvc.guardarPaciente({
        correo, nombre, apellido, 
        docIdUsuario: credentials.user.uid,
        imagenes: firestore.FieldValue.arrayUnion(
          await tasks[0].ref.getDownloadURL(),
          await tasks[1].ref.getDownloadURL()
        ),
      });

      this.authSvc.sendEmailVerification(credentials.user);
      this.router.navigate(['/perfil']);
    } catch(err) {
      this.alertaErrorRegistro();
    } finally {
      this.enEspera = false;
    }
  }

  alertaErrorRegistro(): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      icon: 'error',
      title: 'No se pudo registrar el usuario, intentelo de nuevo'
    });
  }
}
