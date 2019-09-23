import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajuste: Ajustes = {
    temaURL: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private doc) {
    this.cargar();
  }

  guardar(): void {
    localStorage.setItem('ajustes', JSON.stringify(this.ajuste));
  }

  cargar(): void {
    // console.log('Cargando color del tema...');
    if (localStorage.getItem('ajustes')) {
      this.ajuste = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Color:', this.ajuste.tema);
    }
    this.doc.getElementById('theme').setAttribute('href', this.ajuste.temaURL);
    this.guardar();
  }

  aplicarColor(color: string) {
    const url = `assets/css/colors/${color}.css`;
    this.doc.getElementById('theme').setAttribute('href', url);
    this.ajuste.tema = color;
    this.ajuste.temaURL = url;
    this.setCheck();
    this.guardar();

  }

  setCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.ajuste.tema;
    // console.log('Marcando el color del tema:', tema);
    for (const ref of selectores) {
      ref.classList.remove('working');
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
      }
    }
  }

}

interface Ajustes {
  temaURL: string;
  tema: string;
}
