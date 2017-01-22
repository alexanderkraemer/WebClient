import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./service/authentication.service";
import {Spieler} from "./domain/spieler";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe( value => {
      if(value) {
        this.loggedInPlayer = value;
      }
      else {
        this.loggedInPlayer = null;
      }
    });
  }

  signIn(){
    this.router.navigate(['/login']);
  }
  signOut(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  loggedInPlayer: Spieler;
}
