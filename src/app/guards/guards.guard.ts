import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  dataUser : any;
constructor(private afAuth: AngularFireAuth, private router: Router){

}





 async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  
const user = await this.afAuth.currentUser;
const isAuthenticated = user?.emailVerified ? true :false;

if(isAuthenticated){
  this.dataUser = user;
}else{
  this.router.navigate(['/login']);
}
  
  return isAuthenticated;
}

}
  

