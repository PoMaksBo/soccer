import {Component, DoCheck, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from "../../../_models/user.interface";
import {AuthService} from "../../../services-and-shared/auth.service";
import {first, Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit, DoCheck, OnDestroy {

  @Output() gameDate!: Date

  player2!: User
  player3!: User
  player4!: User
  activeUser: User
  users!: User[]
  player2form = new FormControl()
  player3form = new FormControl()
  player4form = new FormControl()

  // players: FormGroup = new FormGroup({
  //   player2form : new FormControl(),
  //   player3form : new FormControl(),
  //   player4form : new FormControl(),
  // })
  // private playersFormSubscription!: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.activeUser = this.authService.userValue
  }

  ngOnInit() {
    this.authService.getAll().pipe(first()).subscribe(users =>{
      this.users = users
      let id = +this.activeUser.id!
      this.users = this.users.filter((x) => x.id !== id).filter((x) => x.username !== 'admin')
    })
    // this.subscribeToPlayerForms()
  }

  ngDoCheck(): void {
    if (this.player2form.value) {
      this.users = this.users.filter((user) => {
        if (user.username === this.player2form.value) {
          this.player2 = user
        }
        return user.username !== this.player2form.value
      })
    }
    if (this.player3form.value) {
      this.users = this.users.filter((x) => {
        if (x.username === this.player3form.value) {
          this.player3 = x
        }
        return x.username !== this.player3form.value
      })
    }
    if (this.player4form.value) {
      this.users = this.users.filter((x) => {
        if (x.username === this.player4form.value) {
          this.player4 = x
        }
        return x.username !== this.player4form.value
      })
    }
  }

  ngOnDestroy(): void {
    // this.playersFormSubscription.unsubscribe()
  }

  // private subscribeToPlayerForms(): void {
  //   this.playersFormSubscription = this.players.valueChanges
  //     .subscribe( selectedPlayers => {
  //       this.checkPlayerForm(selectedPlayers.player2form)
  //       this.checkPlayerForm(selectedPlayers.player3form)
  //       this.checkPlayerForm(selectedPlayers.player4form)
  //       this.player2 = this.saveSelectedUser(selectedPlayers.player2form)
  //       this.player3 = this.saveSelectedUser(selectedPlayers.player3form)
  //       this.player4 = this.saveSelectedUser(selectedPlayers.player4form)
  //     });
  // }

  public clearPlayer(userForm: FormControl, formValue: User): void {
    userForm.reset()
    this.users.push(formValue)
  }

  // public clearPlayer(formControl: AbstractControl, formValue: User): void {
  //   this.users.push(formValue)
  //   formControl.reset()
  // }

  public createGame(): void {
    this.gameDate = new Date()
    console.log(`Игра была создана ${this.gameDate}`)
    this.router.navigate(['../game/results'])
  }


  // private saveSelectedUser(userNameFromForm: string): User {
  //   let userInForm
  //   for (let player of this.users) {
  //     if (player.username === userNameFromForm) {
  //       userInForm = player
  //     } else break
  //   }
  //   if (userInForm === undefined) {
  //     throw new Error('Переменная не определена')
  //   }
  //   return userInForm
  // }

  //  private checkPlayerForm (userNameFromForm: string): void {
  //   if (userNameFromForm) {
  //     this.users = this.users.filter((user) => user.username !== userNameFromForm)
  //   }
  // }

}
