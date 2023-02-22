import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { GetUsers } from 'src/app/interfaces/get-users.interface';
import { User } from 'src/app/models/user.model';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  public totalUsers: number = 0;
  public from: number = 0;
  public isLoading: boolean = true;
  public usersTemp: User[] = []
  public imgSubs!: Subscription;

  constructor(
    protected userService: UserService,
    protected searchService: SearchService,
    protected modalService: ImageModalService
  ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();
    this.imgSubs = this.modalService.newImagenNotification.pipe(
      delay(1000)
    ).subscribe(() => this.getUsers())
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

  deleteUser(user: User) {
    if (user._id === this.userService.uid) {
      Swal.fire({
        title: 'Error',
        text: 'No puede borrarse a sí mismo',
        icon: 'error'
      });
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Estas a punto de borrar a ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe({
          next: () => {
            this.getUsers();
            Swal.fire({
              title: 'Usuario borrado',
              text: `El usuario ${ user.name } ha sido eliminado.`,
              icon: 'success'
            });
          }
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.saveUser(user).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error',
          text: error.statusText,
          icon: 'error'
        });
      }
    });
  }

  openModal(user: User) {
    this.modalService.openModal('users', user._id!, user.img!)
  }

}
