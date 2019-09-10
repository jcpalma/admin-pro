import { NgModule } from "@angular/core";
import {FormsModule} from '@angular/forms';

import { ShareModule } from '../shared/shared.module';
import { PageRoutingModule } from './pages.route';

import { PagesComponent } from './pages.component';
import { GraphComponent } from './graph/graph.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//Temporal
import {IncrementadorComponent} from '../components/incrementador/incrementador.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent,
        IncrementadorComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent,
        IncrementadorComponent
    ],
    imports: [
        ShareModule,
        PageRoutingModule,
        FormsModule
    ]
})
export class PageModule { }