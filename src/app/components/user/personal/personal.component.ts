import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services-and-shared/auth.service";
import {User} from "../../../_models/user.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  id!: number
  form!: FormGroup
  user: User
  constructor(
    private acc: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.user = this.acc.userValue
  }

  ngOnInit(): void {
    this.id = (this.user.id!)
    this.form = this.formBuilder.group({
      username: [this.user.username],
      firstname: [this.user.firstname],
      lastname: [this.user.lastname],
      qwerty: []
    })
    this.acc.getById(this.id)
      .pipe(first())
      .subscribe(x => this.form.patchValue(x));
  }



  updateUser() {
    this.acc.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert(`Данные игрока обновлены`)
          this.router.navigate(['../login'])
        },
        error: error => {
          // this.alertService.error(error);
          // this.loading = false;
          console.warn(error)
        }
      });
  }
}
