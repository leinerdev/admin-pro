import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user: User;
  public uploadImage!: File;
  public imgTemp: any = '';

  constructor(
    protected fb: FormBuilder,
    protected userService: UserService,
    protected fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateUser( this.profileForm.value ).subscribe({
      next:  () => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    })
  }

  changeImage(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage = file;

    if (!file) {
      this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  onUploadImage() {
    this.fileUploadService.updateImage(this.uploadImage, 'users', this.user._id!).then(img => {
      this.user.img = img; 
      Swal.fire('Guardado', 'La imagen ha sido actualizada', 'success');
    })
  }
}
