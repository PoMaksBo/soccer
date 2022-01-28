import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../services-and-shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first, Subscription} from "rxjs";
import {AlertService} from "../../services-and-shared/alert.service";
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-registred',
  templateUrl: './registred.component.html',
  styleUrls: ['./registred.component.css']
})
export class RegistredComponent implements OnInit, OnDestroy {

  hideRepeat = true
  hide = true
  aSub?: Subscription
  form!: FormGroup;
  loading = false;
  submitted = false;
  repeatPassword: FormControl

  matcher = new MyErrorStateMatcher()
  checkPasswordsFields!: boolean
  constructor(private reg: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              ) {
    this.repeatPassword = new FormControl('', Validators.required)
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.alertService.clear();
    this.checkPasswordsFields = false
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  public register(): void {
    // let body = JSON.stringify(this.form.value)
    // console.log(this.form.value)
    // console.log(body)
    // this.http.post(`${environment.apiUrl}/registr/`, this.form.value).subscribe((x) => console.log("Прошел пост ", x))
    this.PasswordsFields()
    this.submitted = true;
    this.alertService.clear()
    this.form.disable()
    this.aSub = this.reg.registred( this.form.value)
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

  private PasswordsFields() {
    console.log(this.form.value.password)
    console.log(this.repeatPassword.value)
    if (this.form.value.password === this.repeatPassword.value) {
      this.checkPasswordsFields = false
    }
    this.checkPasswordsFields = true
  }
}
