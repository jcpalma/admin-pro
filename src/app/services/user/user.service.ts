import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public token: string = '';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.getLocalStorage();
  }

  /**
   * Obtiene la información del token y user del localStorage.
   */
  private getLocalStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user')) as User;
    } else {
      this.user = null;
      this.token = '';
    }
  }

  /**
   * Guarda información del Login de la aplicación.
   * @param id es el id del usuario en base de datos.
   * @param token es el token generado por el Backend.
   * @param user es el usuario de base de datos.
   */
  private saveLocalStorage(id: string, token: string, user: User): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  /**
   * Indica si ha iniciado sesión el usuario.
   */
  public isLogin(): boolean {
    if (this.token) {
      return true;
    }
    return false;
  }

  /**
   * Cierra sesión y limpia el localStorage.
   */
  public logout(): void {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  /**
   * Inicia sesión con la autentificación de google.
   */
  public loginGoogle(token: string) {
    const url: string = `${URL_API}/login/google`;
    return this.http.post(url, { token }).pipe(
      map((result: any) => {
        // TODO ¿Cambiar el email del localStorage?
        if (localStorage.getItem('email')) {
          localStorage.setItem('email', result.user.email);
        }
        this.saveLocalStorage(result.id, result.token, result.user);
        return result;
      })
    );
  }

  /**
   * Inicia sesion de un usuario local.
   * @param user contiene la información del usuario.
   * @param remember indica si el correo debe quedar guardado.
   */
  public login(user: User, remember: boolean) {
    const url: string = `${URL_API}/login`;
    return this.http.post(url, user).pipe(
      map((result: any) => {
        if (remember) {
          localStorage.setItem('email', user.email);
        } else {
          localStorage.removeItem('email');
        }
        this.saveLocalStorage(result.id, result.token, result.user);
        return true;
      })
    );
  }

  /**
   * Registra un usuario a la aplicación.
   * @param user contiene la información del registro de un usuario.
   */
  public createUser(user: User) {
    const url: string = `${URL_API}/users`;
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success'
          },
          buttonsStyling: false
        }).fire({
          title: '¡Registro exitoso!',
          text: `${user.email} está registrado.`,
          type: 'success'
        });
        return resp.user;
      })
    );
  }
}
