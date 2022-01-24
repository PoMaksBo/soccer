import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services-and-shared/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AlertService} from "../../services-and-shared/alert.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  aSub?: Subscription
  loading = false;
  submitted = false;
  form: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password:new FormControl(null, [Validators.required])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //Теперь вы можете зайти в свой аккаунт
      } else if (params['accessDenied']) {
        //Для начала авторизуйтесь
      }
    })
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  authentication() {
    this.submitted = true;

    // reset alerts on submit
    this.alert.clear();
    this.form.disable()
    this.loading = true;
    this.aSub = this.auth.login(this.form.value.userName, this.form.value.password).subscribe(() => {
        console.log('Login Succesfull!')
        this.router.navigate(['/userPage/personal-page'])
      },
      error => {
      this.alert.error(error);
      this.loading = false;
        this.form.enable()
      }
    )
    this.form.reset()
  }
}
