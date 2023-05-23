import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Principal', url: '/' },
  //       { title: 'Progress Bar', url: '/dashboard/progress' },
  //       { title: 'Gráficas', url: '/dashboard/grafica1' },
  //       { title: 'Promesas', url: '/dashboard/promises' },
  //       { title: 'RxJs', url: '/dashboard/rxjs' },
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: 'users' },
  //       { title: 'Hospitales', url: 'hospitals' },
  //       { title: 'Médicos', url: 'doctors' },
  //     ]
  //   }
  // ];
}
