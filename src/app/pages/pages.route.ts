import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { PromesasComponent } from './promesas/promesas.component';

import { AccountSettingComponent } from './account-setting/account-setting.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashbaord' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Barras de Progreso' } },
            { path: 'graph', component: GraphComponent, data: { title: 'Gráficas' } },
            { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
            { path: 'settings', component: AccountSettingComponent, data: { title: 'Ajustes' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
