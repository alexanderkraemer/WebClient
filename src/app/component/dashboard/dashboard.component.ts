import { Component, OnInit } from '@angular/core';
import {StatistikService} from "../../service/statistik.service";
import {SpielerService} from "../../service/spieler.service";
import {Statistik} from "../../domain/statistik";
import {stat} from "fs";

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private statisticService : StatistikService,
              private playerService: SpielerService) {
    this.options = {
      title : { text : 'Statistics' },
      series: [],
      /*xAxis : {
        type: 'datetime',
        ordinal: false
      }*/
    };
  }
  series: Object[] = [];
  options: Object;
  ngOnInit() {
    this.playerService.FindAll().then(ps => {
      ps.forEach(p => {
        let player = p.Nickname;
        let playerSeries: Object[] = [];
        playerSeries['name'] = player;

        this.statisticService.FindByPlayer(p.ID).then( st => {
          let statArr : Object[] = [];
          st.forEach(s => {
            let sa = s as Statistik;
            statArr.push([sa.Skill, sa.Skill]);
          });
          playerSeries['data'] = statArr;

        });
        this.series.push(playerSeries);
      });
      this.options['series'] = this.series;
      console.log(this.options);
    });

  }


}
