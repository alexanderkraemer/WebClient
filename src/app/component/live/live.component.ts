import {Component, OnInit, Injectable} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Match, PopulatedMatch} from "../../domain/match";
import {Spieler} from "../../domain/spieler";
import {SpielerService} from "../../service/spieler.service";

import {TournierService} from "../../service/tournier.service";
import {Tournier} from "../../domain/tournier";
import {MatchService} from "../../service/match.service";
import {AuthenticationService} from "../../service/authentication.service";


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
  loggedInPlayer: Spieler;

  private socket: WebSocket;
  private currentMatch: PopulatedMatch;


  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private matchService: MatchService,
              private spielerService: SpielerService,
              private tournierService: TournierService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe( value => {
      if(value) {
        this.loggedInPlayer = value;
      }
      else {
        this.loggedInPlayer = null;
      }
    });


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
          m.forEach(ma => {
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

    this.socket = new WebSocket('ws://localhost:42382/api/websocket');

    this.socket.onmessage = (message) => {
      let val1 = message.data.replace(/^[0-9]+/g,"");;
      let val;
      let obj;
      if(this.isJson(val1) && val1 != "")
      {
        val = this.JsonPrepate(val1);
        obj = JSON.parse(val) as SocketObj;

        this.incrementMatch(obj);
      }
    }
  }

  getMatchIndexById(id: number): number
  {
    let i = 0;
    this.PopulatedMatches.forEach(m => {
      if(m.ID == id)
      {
        return i;
      }
      i++;
    });
    return null;
  }

  incrementMatch(obj) {
    this.PopulatedMatches.forEach(m => {
      if(m.ID == obj.match)
      {
        if(obj.team == 1)
        {
          m.ResultPointsPlayer1++;
        }
        else if(obj.team == 2)
        {
          m.ResultPointsPlayer2++;
        }
      }
    });
  }

  t2Inc(match: PopulatedMatch) {
    var obj = new SocketObj();
    obj.match = match.ID;
    obj.team = 2;
    this.socket.send(JSON.stringify(obj));
  }

  t1Inc(match: PopulatedMatch) {
    var obj = new SocketObj();
    obj.match = match.ID;
    obj.team = 1;
    this.socket.send(JSON.stringify(obj));
  }

  JsonPrepate(str): string{
    return str.substring(str.indexOf(": ") + 1);
  }

  isJson(str): boolean {
    if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      return true;
    }else{
      return false;
    }
}
}


class SocketObj{
  public match: number;
  public team: number;
  public value: number;
}
