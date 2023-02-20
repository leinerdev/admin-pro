import { Component, OnInit } from '@angular/core';
import { GetUsers } from 'src/app/interfaces/get-users.interface';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public totalUsers: number = 0;
  public from: number = 0;
  public isLoading: boolean = true;
  public usersTemp: User[] = []

  constructor(
    protected userService: UserService,
    protected searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.from).subscribe({
      next: (response: GetUsers) => {
        if (response.users.length !== 0) {
          this.totalUsers = response.total;
        }
        this.users = response.users;
        this.usersTemp = response.users;
        this.isLoading = false;
      } 
    });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value; 
    }

    this.getUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users = [...this.usersTemp];
      return;
    }
    this.searchService.search('users', term).subscribe({
      next: (response) => this.users = response
    })
  }

}
