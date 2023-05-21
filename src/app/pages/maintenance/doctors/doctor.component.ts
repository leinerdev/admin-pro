import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital?: Hospital;
  public selectedDoctor?: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));
    this.loadHospitals();
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.doctorForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.selectedHospital = this.hospitals.find(hospital => hospital._id === hospitalId);
    });
  }

  loadDoctor(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.doctorService.getDoctorById(id).pipe(
      delay(100)
    ).subscribe((doctor: any) => {
      if (!doctor) {
        this.router.navigateByUrl(`/dashboard/doctors`);
      }
      const { name, hospital:{_id} } = doctor;
      this.selectedDoctor = doctor;
      this.doctorForm.setValue({name, hospital: _id});
    });
  }

  loadHospitals() {
    this.hospitalService.getHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;

    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }
      this.doctorService.updateDoctor(data).subscribe(res => {
        Swal.fire({
          title: 'Actualizado',
          text: `${ name } actualizado correctamente`,
          icon: 'success'
        });
      })
    } else {
      this.doctorService.createDoctor(this.doctorForm.value).subscribe(res => {
        Swal.fire({
          title: 'Creado',
          text: `${ name } creado correctamente`,
          icon: 'success'
        });
        this.router.navigateByUrl(`/dashboard/doctor/${res.doctor._id}`)
      });
    }
  }

}
