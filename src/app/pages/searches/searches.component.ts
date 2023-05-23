import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.globalSearch(term);
    });
  }

  globalSearch(term: string) {
    this.searchesService.globalSearch(term).subscribe((res: any) => {
      console.log(res)
      this.users = res.users;
      this.doctors = res.doctors;
      this.hospitals = res.hospitals;
    })
  }

}
