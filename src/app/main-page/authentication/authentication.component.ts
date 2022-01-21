import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services-and-shared/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  error?: string
  aSub?: Subscription
  form: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password:new FormControl(null, [Validators.required])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

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
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(() => {
        console.log('Login Succesfull!')
        this.router.navigate(['/userPage/personal-page'])
      },
      error => {
        this.error = error
        console.warn(error)
        this.form.enable()
      }
    )
    this.form.reset()
  }
}
