import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services-and-shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first, Subscription} from "rxjs";
import {AlertService} from "../../services-and-shared/alert.service";

@Component({
  selector: 'app-registred',
  templateUrl: './registred.component.html',
  styleUrls: ['./registred.component.css']
})
export class RegistredComponent implements OnInit, OnDestroy {

  aSub?: Subscription
  form!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private reg: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private alertService: AlertService
              ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.alertService.clear();
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  register() {
    this.submitted = true;
    this.alertService.clear()
    this.form.disable()
    this.aSub = this.reg.registred(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], {
            relativeTo: this.route,
            queryParams: {
              registered: true
            }
          });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
          this.form.enable()
        }
      });

  }
}
