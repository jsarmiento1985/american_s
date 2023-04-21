import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';


@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  formsRegistrarUser: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router,
    private _serviceFireBase: FirebaseServiceService ) {
    this.formsRegistrarUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      repetirPassword: ['',Validators.required],

    });
   }

  ngOnInit(): void {
  }

  registrarUsuario(){
    const email = this.formsRegistrarUser.value.email;
    const password = this.formsRegistrarUser.value.password;
    const repetirPassword = this.formsRegistrarUser.value.repetirPassword;

    if(password !== repetirPassword){
      this.toastr.error('Las contraseñas ingresadas deben ser idénticas','Registro de usuario');
      return;
    }

    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(email, password).then(()=> {
      this.verificarCorreo();

    }).catch((error)=> {
      this.loading = false;
      this.toastr.error(this._serviceFireBase.firebaseError(error.code),'Error al registrar un usuario');
    });

    
  }

  verificarCorreo(){
    this.afAuth.currentUser
          .then(user => user?.sendEmailVerification().then())
          .then(() =>{
            this.toastr.info('Enviado un correo electrónico para su verificación','Verificar correo');
            this.router.navigate(['/login']);
          });
                                  
                                  
                                  
    }

  

    

}
