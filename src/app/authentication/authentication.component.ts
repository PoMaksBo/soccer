import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../user.interface";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  user: User = {
  login: '',
  password: ''
}


  form: FormGroup = new FormGroup({
    log: new FormControl('', [Validators.required]),
    pass:new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
  }

  authentication() {
    this.form.disable()
  }

}
