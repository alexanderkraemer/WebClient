import { Component, OnInit } from '@angular/core';
import {TournierService} from "../../service/tournier.service";
import {Tournier} from "../../domain/tournier";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tournier',
  templateUrl: './tournier.component.html',
  styleUrls: ['./tournier.component.css']
})
export class TournierComponent implements OnInit {

  constructor(
    private router: Router,
    private tournamentService: TournierService,
  ) { }

  Tournaments : Tournier[] = [];

  ngOnInit() {
    this.tournamentService.FindAll().then(ts => {
      this.Tournaments = ts;
      this.Tournaments.sort((t1, t2): number => {
          let a = new Date(t1.Timestamp);
          let b = new Date(t2.Timestamp);
          return a>b ? -1 : a<b ? 1 : 0;
      })
    });
  }
  createTournament()
  {
    this.router.navigate(['/tourniere/create']);
  }

  onSelect(tournament: Tournier) {
    this.router.navigate(['/tourniere', tournament.ID]);
  }
}
