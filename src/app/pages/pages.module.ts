import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { PipesModule } from "../pipes/pipes.module";
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchesComponent } from './searches/searches.component';

@NgModule({
    declarations: [
        DashboardComponent,
        Grafica1Component,
        PagesComponent,
        ProgressComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalsComponent,
        DoctorsComponent,
        DoctorComponent,
        SearchesComponent,
    ],
    exports: [
        DashboardComponent,
        Grafica1Component,
        PagesComponent,
        ProgressComponent,
        AccountSettingsComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        PipesModule
    ]
})
export class PagesModule { }
