import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services-and-shared/auth.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services-and-shared/alert.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../_models/user.interface";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnDestroy {
  hide = true
  aSub?: Subscription
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password:new FormControl(null, [Validators.required])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService,
              private http: HttpClient
  ) { }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  public authentication(): void {
    // reset alerts on submit
    this.alert.clear();
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(x => {
      console.log('Login Succesfull!')
      this.auth.user.subscribe()
      this.router.navigate(['/user/personal'])
      },
      error => {
      this.alert.error(error);
      console.log(error)
      this.form.enable()
      }
    )
    this.form.reset()
  }

}
