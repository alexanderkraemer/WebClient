import {Component, OnInit, Injectable} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Match, PopulatedMatch} from "../../domain/match";
import {Spieler} from "../../domain/spieler";
import {SpielerService} from "../../service/spieler.service";

import {TournierService} from "../../service/tournier.service";
import {Tournier} from "../../domain/tournier";
import {MatchService} from "../../service/match.service";


@Component({
  moduleId: module.id,
  selector: 'app-match',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  PopulatedMatches: PopulatedMatch[] = [];
  Spieler: Spieler[] = [];
  Tourniere: Tournier[] = [];
  SpielerList: any[] = [];
  TournierList: any[] = [];

  constructor(private router: Router,
              private matchService: MatchService,
              private spielerService: SpielerService,
              private tournierService: TournierService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tournierService.FindByDay(new Date()).then(t => {
      this.Tourniere = t;

      t.forEach(s => {
        this.TournierList[s.ID.toString()] = s;
      });
      this.spielerService.FindAll().then(s => {
        this.Spieler = s;
        this.Spieler.forEach(s => {
          this.SpielerList[s.ID.toString()] = s;
        });

        this.matchService.FindAll().then(m => {
          m.matchList.forEach(ma => {
            if(ma.TournamentId.toString() in this.TournierList){
              var m = new PopulatedMatch();
              m.ID = ma.ID;

              m.Team1Player1 = this.SpielerList[ma.Team1Player1];
              m.Team1Player2 = this.SpielerList[ma.Team1Player2];
              m.Team2Player1 = this.SpielerList[ma.Team2Player1];
              m.Team2Player2 = this.SpielerList[ma.Team2Player2];
              m.Tournier = this.TournierList[ma.TournamentId];
              m.ResultPointsPlayer1 = ma.ResultPointsPlayer1;
              m.ResultPointsPlayer2 = ma.ResultPointsPlayer2;
              m.Finished = ma.Finished;
              this.PopulatedMatches.push(m);
            }
          });
        })
      });
    });
  }

  onSelect(match: Match): void {
    this.router.navigate(['/matches', match.ID]);
  }

  createMatch(): void {
    this.router.navigate(['/matches/create']);
  }

  changedPage(page: number) {
    this.router.navigate(['/matches/page', page]);
  }

}
