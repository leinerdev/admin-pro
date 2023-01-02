import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Principal', url: '/' },
        { title: 'Progress Bar', url: '/dashboard/progress' },
        { title: 'Gráficas', url: '/dashboard/grafica1' },
        { title: 'Promesas', url: '/dashboard/promises' },
        { title: 'RxJs', url: '/dashboard/rxjs' },
      ]
    }
  ];

  constructor() { }
}
