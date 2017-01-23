import { Component, OnInit } from '@angular/core';
import {SpielerService} from "../../../service/spieler.service";
import {TournierService} from "../../../service/tournier.service";
import {MatchService} from "../../../service/match.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Spieler} from "../../../domain/spieler";
import {Tournier} from "../../../domain/tournier";
import {Match} from "../../../domain/match";
import {Location} from "@angular/common";

@Component({
  selector: 'app-match-generate',
  templateUrl: './match-generate.component.html',
  styleUrls: ['./match-generate.component.css']
})
export class MatchGenerateComponent implements OnInit {

  constructor(
    private playerService: SpielerService,
    private tournamentService: TournierService,
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    var serviceArr: { b:any, c:any};

    this.route.params
    .switchMap((params: Params) => this.tournamentService.FindById(+params['id']))
    .subscribe(t => {
      this.tournament = t;

      serviceArr = ({
        b: this.playerService.FindAll(),
        c: this.matchService.FindAll(),
      });

      var indexArr = [];

      this.playerService.FindByDay(new Date()).then(d => {
        this.playerForDay = d;


        serviceArr.b.then(p => {
          d.forEach(ps => {
            indexArr.push(ps.ID);
            //if(!this.contains(this.playerForDay, ps)
          });
          console.log(indexArr);
          p.forEach(ps => {

            if(indexArr.indexOf(ps.ID) === -1){
              this.players.push(ps);
            }
          });

          serviceArr.c.then(m => {
            this.matches = m;


            // all fetched...

          });
        });
      });
    });
  }

  selectPlayer(player) {
    this.removeItem(this.players, player);
    this.playerForDay.push(player);
  }

  deselectPlayer(player){
    this.removeItem(this.playerForDay, player);
    this.players.push(player);
  }

  removeItem(array, item){
    for(var i in array){
      if(array[i]==item){
        array.splice(i,1);
        break;
      }
    }
  }

  contains(arr, needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    arr.forEach(p => {
      if(needle.ID == p.ID)
      {
        return true;
      }
    });
    return false;
    /*
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(needle) {
        var i = -1, index = -1;

        for(i = 0; i < arr.length; i++) {
          var item = arr[i];

          if((findNaN && item !== item) || item === needle) {
            index = i;
            break;
          }
        }

        return index;
      };
    }
    return indexOf.call(this, needle) > -1;
    */
  }

  generate(){
    this.matchService.Generate(this.numberToGenerate, this.playerForDay, this.tournament.ID)
      .then(() => this.router.navigate(['matches']));
  }

  numberToGenerate: number = 0;
  tournament: Tournier;
  players: Spieler[] = [];
  playerForDay: Spieler[];
  matches: Match[];
}
