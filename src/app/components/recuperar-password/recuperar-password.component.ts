import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  loading : boolean = false;
  recuperarUsuario : FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router,
    private _serviceFireBase: FirebaseServiceService) { 

    this.recuperarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  ngOnInit(): void {
  }

  recuperar(){
    this.loading = true;
    const email = this.recuperarUsuario.value.email;
    this.afAuth.sendPasswordResetEmail(email).then(()=> {
      this.loading = false;
      this.toastr.success('Envíamos un email para recuperar su password.','Recuperar password');
      this.router.navigate(['/login']);
      

    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this._serviceFireBase.firebaseError(error.code),'Error al registrar un usuario');
    });
  }


}
