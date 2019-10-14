import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  NgZone
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { CLIENT_ID } from '../config/config';

// Manda a ejecutar la funcion que inicializa todos los plugins del template AdminPro
// que está en el archivo "assets/js/custom.js"
declare function initPlugins(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  /**
   * Indica si guarda el último correo de la autentificación.
   */
  public remember: boolean = false;

  /**
   * Contiene el correo actual.
   */
  public email: string;

  /**
   * Una instancia de GoogleAuth para realizar el Google SingIn.
   */
  public auth2: gapi.auth2.GoogleAuth;

  /**
   * Para hacer el focus en el campo contraseña.
   */
  @ViewChild('pwd', { static: false })
  public passwordElement: ElementRef;

  /**
   * Crea una instancia de loginComponent.
   * @param userService una instancia del servicio de usuarios.
   * @param router una instancia de Router.
   * @param ngZone una instancia de NgZone.
   */
  constructor(
    private readonly userService: UserService,
    private readonly ngZone: NgZone,
    private readonly router: Router
  ) { }

  /**
   * Inicializa el componente y el Google API.
   */
  ngOnInit() {
    initPlugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email) {
      this.remember = true;
    }
    this.googleInit();
  }

  /**
   * Establece el foco en el campo de contraseña.
   */
  ngAfterViewInit(): void {
    if (this.email) {
      this.passwordElement.nativeElement.focus();
    }
  }

  /**
   * Para hacer un login normal.
   * @param form contiene la información del correo y contraseña para hacer el login.
   */
  public ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user: User = new User('', form.value.email, form.value.password);
    this.userService
      .login(user, form.value.remember)
      .subscribe(result => this.router.navigate(['/dashboard']));
  }

  /**
   * Inicializa el Sing-In de Google y lo almacena en auth2.
   */
  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        cookie_policy: 'none',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  /**
   * Realiza la autentificación con Google.
   * @param element hace referencia al boton.
   */
  private attachSignIn(element: HTMLElement) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: gapi.auth2.GoogleUser) => {
        // const profile = googleUser.getBasicProfile();
        const token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(token).subscribe(result => {
          this.auth2.disconnect();
          this.ngZone.run(() => this.router.navigate(['/dashboard']).then());
          // window.location.href = '/dashboard';
        });
      },
      () => { }
    );
  }
}
