    import { Component, OnInit } from '@angular/core';
    import {Spieler} from "../../domain/spieler";
    import {Router} from "@angular/router";

    @Component({
      selector: 'app-spieler',
      templateUrl: './spieler.component.html',
      styleUrls: ['./spieler.component.css']
    })

    export class SpielerComponent implements OnInit {

      constructor(private router: Router) {

      }

      onSelect(spieler: Spieler): void {
        this.router.navigate(['/spieler', spieler.id]);
      }

      ngOnInit() {
      }

      Spieler: Spieler[] = PLAYER;

    }

    const PLAYER : Spieler[] = [
      { id: 1,
        FirstName:"Alex",
        LastName: "Krämer",
        Nickname: "Alex",
        isAdmin: true,
        Skills: 1234,
        Photopath: "",
        Password: "pass",
        isMonday: true,
        isTuesday: false,
        isWednesday: false,
        isThursday: true,
        isFriday: true,
        isSaturday: true
      }
    ];