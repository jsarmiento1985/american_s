import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading : boolean = false;
  loginUsuario : FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router,
    private _serviceFireBase: FirebaseServiceService) { 

    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],
    });

  }

  ngOnInit(): void {
  }

  loguear(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user)=>{
      this.loading = false;
    
      if(user.user?.emailVerified){
         this.router.navigate(['/dashboard']);
         this.toastr.success("Ingreso exitoso.", "Usuario válido")
      }else{
          this.router.navigate(['/verificar_correo']);
      }
     
    }).catch((error)=>{
      this.loading = false;
      this.toastr.error(this._serviceFireBase.firebaseError(error.code),'Error al registrar un usuario');
    });
  }

  

}
