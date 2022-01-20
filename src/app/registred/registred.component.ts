import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registred',
  templateUrl: './registred.component.html',
  styleUrls: ['./registred.component.css']
})
export class RegistredComponent implements OnInit {
  login? : string
  password? : string

  form: FormGroup = new FormGroup({
    log: new FormControl('', [Validators.required]),
    pass:new FormControl('', [Validators.required])
  })
  constructor() { }

  ngOnInit(): void {
  }

  register() {
    this.form.disable()

  }
}
