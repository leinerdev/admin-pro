import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(users => {
      console.log(users);
    })
  }

  getUsers() {
    const promise = new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2')
        .then(respo => respo.json())
        .then(body => resolve(body.data));
    });

    return promise;
  }

}
