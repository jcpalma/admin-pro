import { NgModule } from "@angular/core";
import {FormsModule} from '@angular/forms';

import { ShareModule } from '../shared/shared.module';
import { PageRoutingModule } from './pages.route';

import { PagesComponent } from './pages.component';
import { GraphComponent } from './graph/graph.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';


//Temporal
import {IncrementadorComponent} from '../components/incrementador/incrementador.component';
import { GraphDoughnutComponent } from '../components/graph-doughnut/graph-doughnut.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent,
        IncrementadorComponent,
        GraphDoughnutComponent,
        AccountSettingComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphComponent,
        IncrementadorComponent,
        GraphDoughnutComponent
    ],
    imports: [
        ShareModule,
        PageRoutingModule,
        FormsModule,
        ChartsModule
    ]
})
export class PageModule { }