import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subs: Subscription;

  constructor() {
    this.subs = this.getObservable().subscribe(
      numero => {
        console.log('Subs:', numero);
      },
      error => {
        console.error('Error en el observer', error);
      },
      () => {
        console.log('El observador terminó...!');
      }
    );
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    console.log('Saliendo de la página');
    this.subs.unsubscribe();
  }

  getObservable(): Observable<any> {
    return new Observable<any>(observer => {
      let contador: number = 0;
      const intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };
        observer.next(salida);
        // observer.next(contador); // Retorna el contador
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map(e => e.valor),
      filter((valor, index) => {
        //// console.log('Filter', {valor, index});
        if (valor % 2 === 1) {
          return true;
        }
        return false;
      })
    );
  }
}
