import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {



    this.contar().then((mensaje) => {
      console.log('Terminó...', mensaje);
    }).catch(err => console.error('Error en la promesa', err));

  }

  ngOnInit() {
  }

  contar(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log('Contador: ', contador);
        if (contador === 3) {
          resolve('OK');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
