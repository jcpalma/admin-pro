import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


// Manda a ejecutar la funcion que inicializa todos los plugins del template AdminPro
// que está en el archivo "assets/js/custom.js"
declare function initPlugins(): void;



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  /**
   * Carga el formular para registrar un usuario.
   */
  ngOnInit() {
    initPlugins();
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condition: new FormControl(false)
    }, {
      validators: this.equals('password', 'password2')
    });

    this.form.setValue({
      name: 'Test1',
      email: 'test1@test.com',
      password: '123456',
      password2: '123456',
      condition: true
    });

  }

  /**
   * Validador que compara que dos valores sean iguales.
   * @param value1 es una cadena.
   * @param value2 es una cadena.
   */
  equals(value1: string, value2: string): ValidatorFn {
    return (group: FormGroup) => {
      const pass1 = group.controls[value1].value;
      const pass2 = group.controls[value2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        noEquals: true
      };
    };
  }

  /**
   * Registra un usuario en la aplicacioón.
   */
  signin(): void {
    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.condition) {
      Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-warning'
        },
        buttonsStyling: false
      })
        .fire({
          title: '¡Importante!',
          text: 'Debe de aceptar las condiciones.',
          type: 'warning',
          confirmButtonText: '<i class="fa fa-info-circle"></i> Entiendo'
        });
      return;
    }

    const user: User = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.createUser(user)
      .subscribe(result => this.router.navigate(['/login']));

  }

}
