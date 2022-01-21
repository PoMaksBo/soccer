import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services-and-shared/auth.service";
import {User} from "../../_interfaces/user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registred',
  templateUrl: './registred.component.html',
  styleUrls: ['./registred.component.css']
})
export class RegistredComponent implements OnInit, OnDestroy {

  aSub?: Subscription
  form: FormGroup = new FormGroup({
    log: new FormControl('', [Validators.required]),
    pass:new FormControl('', [Validators.required])
  })
  constructor(private reg: AuthService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  register() {
    this.form.disable()
    this.aSub = this.reg.registred(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )

  }
}
