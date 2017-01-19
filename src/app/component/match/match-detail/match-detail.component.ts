import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Spieler} from "../../../domain/spieler";
import { Router } from '@angular/router'

import {Location} from '@angular/common';
import {MatchService} from "../../../service/match.service";
import {Match, PopulatedMatch} from "../../../domain/match";
import {SpielerService} from "../../../service/spieler.service";
import {TournierService} from "../../../service/tournier.service";


@Component({
  moduleId: module.id,
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  constructor(
    private matchService: MatchService,
    private tournierService: TournierService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private spielerService: SpielerService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.matchService.FindById(+params['id']))
      .subscribe(s => {
        var m = new PopulatedMatch();
        m.ID =  s.ID;
        m.ResultPointsPlayer1 = s.ResultPointsPlayer1;
        m.ResultPointsPlayer2 = s.ResultPointsPlayer2;
        m.Finished = s.Finished;

        var requestSalvos: {a:any, b:any, c:any, d:any, e:any};

        requestSalvos = ({
          a: this.spielerService.FindById(s.Team1Player1),
          b: this.spielerService.FindById(s.Team1Player2),
          c: this.spielerService.FindById(s.Team2Player1),
          d: this.spielerService.FindById(s.Team2Player2),
          e: this.tournierService.FindById(s.TournamentId)
        });

        requestSalvos.a.then(w => {
          m.Team1Player1 = w;
          requestSalvos.b.then(x => {
            m.Team1Player2 = x;
            requestSalvos.c.then(y => {
              m.Team2Player1 = y;
              requestSalvos.d.then(z => {
                m.Team2Player2 = z;
                requestSalvos.e.then(a => {
                  m.Tournier = a;
                  this.match = m;
                });
              });
            });
          });
        });

      });
  }

  goBack(): void {
    this.location.back();
  }

  goToEditForm(spieler: Spieler): void {
    this.router.navigate(['/matches', spieler.ID, 'edit']);
  }

  match: PopulatedMatch;
}
