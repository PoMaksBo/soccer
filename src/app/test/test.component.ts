import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, tap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services-and-shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../services-and-shared/alert.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../_models/user.interface";
import {environment} from "../../environments/environment";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  user!: User
  aSub?: Subscription
  form: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name:new FormControl(null, [Validators.required])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService,
              private http: HttpClient
  ) {
    this.auth.user.subscribe(x => this.user = x)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  public correctData(): void {
    this.auth.update(1, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log(' Успешно изменено')
        },
        error: error => {
          console.warn(error)
        }
      });
  }

  private getAllUsers(): Observable<any> {
    return this.http.get<any>('http://172.25.0.22:8000/players/')
  }

  public getdata() {
   this.getAllUsers().subscribe((x: any) => console.log(x))
    console.log(this.user.id)
    // this.http.get('http://172.25.0.22:8000/players/').subscribe((x: any) => console.log(x))
  }


}
