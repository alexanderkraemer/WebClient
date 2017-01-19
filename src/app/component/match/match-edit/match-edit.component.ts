import { Component, OnInit } from '@angular/core';
import {PopulatedMatch, Match} from "../../../domain/match";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {SpielerService} from "../../../service/spieler.service";
import {MatchService} from "../../../service/match.service";
import {Location} from '@angular/common';
import {Spieler} from "../../../domain/spieler";
import {TournierService} from "../../../service/tournier.service";
import {Tournier} from "../../../domain/tournier";

@Component({
  moduleId: module.id,
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {

  constructor(
    private spielerService: SpielerService,
    private matchService: MatchService,
    private tournamentService: TournierService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.spielerService.FindAll().then(s => this.Spieler = s);


    this.route.params
      .switchMap((params: Params) => this.matchService.FindById(+params['id']))
      .subscribe(s => {
        this.m = s as Match; // until dropdown is working
        // check if match is already over
        // if so, then no edit is allowed
        if(s.Finished)
        {
          this.router.navigate(['/matches', s.ID]);
        }

        var m = new PopulatedMatch();
        m.ID =  s.ID;
        m.ResultPointsPlayer1 = s.ResultPointsPlayer1;
        m.ResultPointsPlayer2 = s.ResultPointsPlayer2;
        m.Finished = s.Finished;

        this.spielerService.FindAll().then(sp => {
          this.Spieler = sp;
          this.Spieler.forEach(sp => {
            this.SpielerList[sp.ID.toString()] = sp;
          });

          this.tournamentService.FindAll().then(t => {
            this.Tournaments = t;
            this.Tournaments.forEach(f => {
              this.TournierList[f.ID.toString()] = f;
            });

            m.Tournier = this.TournierList[s.TournamentId];

            m.Team1Player1 = this.SpielerList[s.Team1Player1];
            m.Team1Player2 = this.SpielerList[s.Team1Player2];
            m.Team2Player1 = this.SpielerList[s.Team2Player1];
            m.Team2Player2 = this.SpielerList[s.Team2Player2];

            this.match = m;
          });

        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let m = new Match();
    m.ID = this.match.ID;
    m.Finished = this.match.Finished;
    m.ResultPointsPlayer1 = this.match.ResultPointsPlayer1;
    m.ResultPointsPlayer2 = this.match.ResultPointsPlayer2;
    m.Team1Player1 = this.match.Team1Player1.ID;
    m.Team1Player2 = this.match.Team1Player2.ID;
    m.Team2Player1 = this.match.Team2Player1.ID;
    m.Team2Player2 = this.match.Team2Player2.ID;
    m.TournamentId = this.match.Tournier.ID;
    this.matchService.Update(m)
      .then(() => this.goBack());
  }
  m: Match;
  match : PopulatedMatch;
  Spieler: Spieler[];
  Tournaments: Tournier[];
  TournierList: any[] = [];
  SpielerList: any[] = [];
}
