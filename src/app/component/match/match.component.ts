import {Component, OnInit, Injectable} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {MatchService, MatchPaginateClass} from "../../service/match.service";
import {Match, PopulatedMatch} from "../../domain/match";
import {Spieler} from "../../domain/spieler";
import {SpielerService} from "../../service/spieler.service";

import {TournierService} from "../../service/tournier.service";
import {Tournier} from "../../domain/tournier";


@Component({
  moduleId: module.id,
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  PopulatedMatches: PopulatedMatch[];
  Spieler: Spieler[] = [];
  Matches: Match[] = [];
  Tourniere: Tournier[] = [];
  SpielerList: any[] = [];
  TournierList: any[] = [];

  private numberPerPage: number = 25;
  private numberOfMatches: number;
  private page: number = 1;

  constructor(private router: Router,
              private matchService: MatchService,
              private spielerService: SpielerService,
              private tournierService: TournierService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tournierService.FindAll().then(t => {
      this.Tourniere = t;
      this.Tourniere.forEach(s => {
        this.TournierList[s.ID.toString()] = s;
      });
      this.spielerService.FindAll().then(s => {
        this.Spieler = s;
        this.Spieler.forEach(s => {
          this.SpielerList[s.ID.toString()] = s;
        });
        this.FindAllMatches();
      });
    });
  }

  FindAllMatches() {
    this.route.params
      .switchMap((params: Params) => {
        if (+params['page']) {
          this.page = +params['page'];
        }

        this.PopulatedMatches = [];
        return this.matchService.FindAllByPage(this.page, this.numberPerPage);
      })
      .subscribe(ma => {
        this.numberOfMatches = ma.numberOfMatches;
        console.log(this.numberOfMatches);
        this.Matches = ma.matchList;

        ma.matchList.forEach(match => {
          var m = new PopulatedMatch();
          m.ID = match.ID;

          m.Team1Player1 = this.SpielerList[match.Team1Player1];
          m.Team1Player2 = this.SpielerList[match.Team1Player2];
          m.Team2Player1 = this.SpielerList[match.Team2Player1];
          m.Team2Player2 = this.SpielerList[match.Team2Player2];
          m.Tournier = this.TournierList[match.TournamentId];
          m.ResultPointsPlayer1 = match.ResultPointsPlayer1;
          m.ResultPointsPlayer2 = match.ResultPointsPlayer2;
          m.Finished = match.Finished;
          this.PopulatedMatches.push(m);

        });
        this.PopulatedMatches.sort((t1, t2): number => {
          let a = new Date(t1.Tournier.Timestamp);
          let b = new Date(t2.Tournier.Timestamp);
          return a>b ? -1 : a<b ? 1 : 0;
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
