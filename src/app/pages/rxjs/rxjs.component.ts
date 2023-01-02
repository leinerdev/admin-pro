import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubscription!: Subscription;

  constructor() {
    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe({
    //   next: value => console.log('Subs: ', value),
    //   error: error => console.warn('Error: ', error),
    //   complete: () => console.info('Obs terminado')
    // });
    this.intervalSubscription = this.returnInterval().subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(250).pipe(
      map(value => value + 1), // Sirve para transformar la data de mi Observable
      filter(value => (value % 2 === 0) ? true : false), // Sirve para la filtrar la data, en este caso dejamos pasar los pares solamente
      take(10), // Sirve para definir cuantas emisiones de mi Observable necesito
    );
  }

  // Observable manual
  returnObservable(): Observable<number> {
    let i = 0;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          clearInterval(interval);
          observer.error('i llegó al valor de 2');
        }
      }, 1000)
    });
  }

}
