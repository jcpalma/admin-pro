import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      subMenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráfica', url: '/graph' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    }
  ];

  constructor() { }
}
