import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatchService} from "../../service/match.service";
import {Match, PopulatedMatch} from "../../domain/match";
import {Spieler} from "../../domain/spieler";
import {SpielerService} from "../../service/spieler.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  moduleId: module.id,
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  Matches: PopulatedMatch[] = [];
  Spieler: Spieler[] = [];

  constructor(private router: Router,
              private matchService: MatchService,
              private spielerService: SpielerService) {
  }

  ngOnInit() {
    this.spielerService.FindAll().then(s =>
    {
      this.Spieler = s
      this.FindAll();
    });
  }

  FindAll() {
    this.matchService.FindAll().then(ma => {

    });
  }

  /*
  FindAll() {
    this.matchService.FindAll().then(ma => {
      var requestSalvos: {a:any, b:any, c:any, d:any}[] = [];
      ma.forEach(va => {
        requestSalvos.push({
          a: this.spielerService.FindById(va.Team1Player1),
          b: this.spielerService.FindById(va.Team1Player2),
          c: this.spielerService.FindById(va.Team2Player1),
          d: this.spielerService.FindById(va.Team2Player2)
        });
      });

      ma.forEach((va,index) => {
        var m = new PopulatedMatch();
        m.ID = va.ID;
        m.ResultPointsPlayer1 = va.ResultPointsPlayer1;
        m.ResultPointsPlayer2 = va.ResultPointsPlayer2;

        requestSalvos[index].a.then(w => {
          m.Team1Player1 = w;
          requestSalvos[index].b.then(x => {
            m.Team1Player2 = x;
            requestSalvos[index].c.then(y => {
              m.Team2Player1 = y;
              requestSalvos[index].d.then(z => {
                m.Team2Player2 = z;
                this.Matches.push(m);
              });
            });
          });
        });
      });
    });
  }
  */


  onSelect(match: Match): void {
    this.router.navigate(['/matches', match.ID]);
  }

  createMatch(): void {
    this.router.navigate(['/matches/create']);
  }


}
