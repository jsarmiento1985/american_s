import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuardsGuard }from './guards/guards.guard';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'registrar_usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar_correo',  component: VerificarCorreoComponent},
  { path: 'recuperar_password', component: RecuperarPasswordComponent},
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate:[GuardsGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
