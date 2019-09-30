import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
// import {} from ''
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnInit {

  public paginaActual: string = '';

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRouter().subscribe(data => {
      //// console.log(data);
      if (data.title) {
        this.paginaActual = data.title;
        this.title.setTitle(`DWH - ${this.paginaActual}`);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.paginaActual
        };
        this.meta.updateTag(metaTag);

      }
    });
  }

  ngOnInit() {
  }

  /**
   * Devuelve el objeto data de la ruta.
   */
  public getDataRouter(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map(event => event as ActivationEnd),
      filter(event => event.snapshot.data.title),
      map(event => event.snapshot.data)
    );
  }

}
