import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Leiner Barrios', [Validators.required, Validators.minLength(3)]],
    email: ['leiner.barrios@gmail.com', [Validators.required, Validators.email]],
    password: ['1234567', [Validators.required]],
    re_password: ['1234567', [Validators.required]],
    terms: [false, [Validators.required]],
  }, {
    validators: this.samePasswords('password', 're_password')
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  createUser() {
    this.formSubmitted = true;
    if(this.registerForm.valid && this.registerForm.get('terms')?.value == false) return;

    // Realizar la creación
    this.userService.createUser(this.registerForm.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Perfecto',
          text: 'Usuario creado exitosamente',
          icon: 'success'
        })
        this.router.navigateByUrl('/');
      },
      error(err) {
        Swal.fire({
          title: 'Error',
          text: err.error.msg,
          icon: 'error'
        })
      },
    })

  }

  fieldNotValid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsNotValid(): boolean {
    const password1 = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('re_password')?.value;

    if ((password1 !== password2) && this.formSubmitted) return true;

    return false;
  }

  aceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  samePasswords(pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control!.value === pass2Control!.value) {
        pass1Control!.setErrors(null)
      } else {
        pass2Control!.setErrors({
          notSamePasswords: true
        })
      }
    }

  }

}
