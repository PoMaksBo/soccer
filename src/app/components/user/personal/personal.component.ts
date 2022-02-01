import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services-and-shared/auth.service";
import {User} from "../../../_models/user.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { first } from 'rxjs/operators';
import {AlertService} from "../../../services-and-shared/alert.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  isAdmin! : boolean
  id!: number
  form!: FormGroup
  user: User

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.user = this.authService.userValue
    this.isAdmin = JSON.parse(localStorage.getItem('Admin') || 'false')
  }

  ngOnInit(): void {
    this.id = (this.user.id!)
    this.form = this.formBuilder.group({
      username: [this.user.username],
      firstname: [this.user.firstname],
      lastname: [this.user.lastname]
    })
    this.authService.getById(this.id)
      .pipe(first())
      .subscribe(x => this.form.patchValue(x));
  }

  updateUser() {
    this.authService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['/user/personal'])
        },
        error: error => {
          this.alertService.error(error);
          console.warn(error)
        }
      });
  }
}
