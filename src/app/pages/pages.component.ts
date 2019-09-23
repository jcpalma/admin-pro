import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings/settings.service';

// Manda a ejecutar la funcion que inicializa todos los plugins del template AdminPro
// que está en el archivo "assets/js/custom.js"
declare function initPlugins(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(public settingService: SettingsService) { }

  ngOnInit() {
    initPlugins();
  }

}
