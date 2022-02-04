import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services-and-shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first, Subscription} from "rxjs";
import {AlertService} from "../../services-and-shared/alert.service";


@Component({
  selector: 'app-registred',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})

export class RegisteredComponent implements OnInit, OnDestroy {

  hideRepeat = true
  hide = true
  aSub?: Subscription
  form!: FormGroup;
  repeatPassword!: FormControl

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.repeatPassword = new FormControl('', Validators.required)
    this.alertService.clear();
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  public register(): void {
    this.alertService.clear()
    this.form.disable()
    this.aSub = this.authService.registred(this.form.value)
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
          this.form.enable()
        }
      });
  }

}
