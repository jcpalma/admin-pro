import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Manda a ejecutar la funcion que inicializa todos los plugins del template AdminPro
// que está en el archivo "assets/js/custom.js"
declare function initPlugins(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    initPlugins();
  }

  public ingresar() {
    this.router.navigate(['/dashboard']);
  }

}
