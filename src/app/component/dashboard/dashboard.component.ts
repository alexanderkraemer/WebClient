import { Component, OnInit } from '@angular/core';
import {StatistikService} from "../../service/statistik.service";
import {SpielerService} from "../../service/spieler.service";
import {Statistik} from "../../domain/statistik";
import {stat} from "fs";
import {AppModule} from "../../app.module";

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private statisticService : StatistikService,
              private playerService: SpielerService) {
  }

  optionsbfgjhk = {
    chart: {
      zoomType: 'xy'
    },
    title : { text : 'simple chart' },
    series : [{
      animation: false,
      name: "asdf",
      type: 'line',
      data: [
        [-1743913407000, 29.5],
        [-1743813407000, 28.5],
        [-1743713407000, 27.5],
        [-1743613407000, 26.5],
        [-1743513407000, 25.5],
        [-1743413407000, 24.5],
        [-1743313407000, 23.5],
        [-1743213407000, 22.5],
        [-1743113407000, 20.5],
        [-1743013407000, 21.5],
        [-1742913407000, 22.5],
        [-1742813407000, 23.5],
        [-1742713407000, 24.5],
        [-1742613407000, 25.5],
        [-1742513407000, 26.5],
        [-1742413407000, 27.5],
        [-1742313407000, 28.5],
        [-1742213407000, 29.5]
      ]
    }],
    xAxis : {
      type: 'datetime',
      ordinal: false
    }
  };

  options: Object = {};
  option : Object;


  ngOnInit() {
    this.playerService.FindAll().then(ps => {
      let data: Object[] = [{}];
      ps.forEach(p => {
        let player = p.Nickname;

        let statArr : any[] = [];
        this.statisticService.FindByPlayer(p.ID).then( st => {
          st.forEach(s => {
            let sa = s as Statistik;
            statArr.push([-Date.parse(sa.Timestamp), sa.Skill]);

          });
          // playerSeriesData.push(statArr);
          data.push({data: statArr, type: 'line', animation: false, name: player});
        });
      });
      this.options = {
        chart: {
          zoomType: 'xy'
        },
        title: { text: 'Statistics'},
        series: data,
        xAxis: { type: 'datetime', ordinal: false},

      }
    });
  }
}
