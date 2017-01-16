    import { Component, OnInit } from '@angular/core';
    import {Spieler} from "../../domain/spieler";
    import {Router, Params} from "@angular/router";
    import {SpielerService} from "../../service/spieler.service";


    @Component({
      selector: 'app-spieler',
      templateUrl: './spieler.component.html',
      styleUrls: ['./spieler.component.css']
    })

    export class SpielerComponent implements OnInit {

      constructor(
        private router: Router,
        private spielerService: SpielerService
      ) {

      }

      onSelect(spieler: Spieler): void {
        this.router.navigate(['/spieler', spieler.ID]);
      }

      FindAll() {
        this.spielerService.FindAll().then(spieler => this.Spieler = spieler);
      }

      ngOnInit(): void {
        this.FindAll();
      }

      Spieler: Spieler[] = PLAYER;

    }

    const PLAYER : Spieler[] = [
      { ID: 1,
        FirstName:"Alex",
        LastName: "Krämer",
        Nickname: "Alex",
        isAdmin: true,
        Skills: 1234,
        PhotoPath: "",
        Password: "pass",
        isMonday: true,
        isTuesday: false,
        isWednesday: false,
        isThursday: true,
        isFriday: true,
        isSaturday: true
      }
    ];
