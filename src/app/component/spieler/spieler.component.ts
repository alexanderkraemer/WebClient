    import { Component, OnInit } from '@angular/core';
    import {Spieler} from "../../domain/spieler";
    import {Router, Params} from "@angular/router";
    import {SpielerService} from "../../service/spieler.service";

    @Component({
      moduleId: module.id,
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

      createPlayer(): void{
        this.router.navigate(['/spieler/create']);
      }

      Spieler: Spieler[];

    }
