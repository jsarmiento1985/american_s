import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code_error';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  constructor() { }

  firebaseError(code: string) {
    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse :
        return 'El usuario ya existe';
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'Constraseña muy débil';
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo inválido';
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Password inválido';
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Usuario inválido';
      case FirebaseCodeErrorEnum.MissingPassword:
        return 'Password inválido';

      default:
        return 'Error desconocido: ' + code;
    }
  }
}
