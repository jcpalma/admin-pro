import { NgModule } from "@angular/core";

import { ShareModule } from '../shared/shared.module';
import { PageRoutingModule } from './pages.route';

import { PagesComponent } from './pages.component';
import { GraphComponent } from './graph/graph.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent
    ],
    imports: [
        ShareModule,
        PageRoutingModule
    ]
})
export class PageModule { }