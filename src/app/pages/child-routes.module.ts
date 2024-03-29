import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Mantenimientos
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchesComponent } from './searches/searches.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
    { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'My Profile' } },
    { path: 'progress', component: ProgressComponent,data : { title: 'Barra de progreso' } },
    { path: 'grafica1', component: Grafica1Component,data : { title: 'Gráficas' } },
    { path: 'account-settings', component: AccountSettingsComponent,data : { title: 'Ajustes de cuenta' } },
    { path: 'search/:term', component: SearchesComponent,data : { title: 'Búsquedas' } },
    { path: 'promises', component: PromisesComponent,data : { title: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent,data : { title: 'RxJS' } },

    // Mantenimientos
    { path: 'hospitals', component: HospitalsComponent, data : { title: 'Mantenimiento de hospitales' } },
    { path: 'doctors', component: DoctorsComponent, data : { title: 'Mantenimiento de médicos' } },
    { path: 'doctor/:id', component: DoctorComponent, data : { title: 'Mantenimiento de médico' } },
      
    // Rutas de admin
    { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data : { title: 'Mantenimiento de usuarios' } },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
