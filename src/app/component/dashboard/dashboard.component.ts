import { Component, OnInit } from '@angular/core';
import {StatistikService} from "../../service/statistik.service";
import {SpielerService} from "../../service/spieler.service";
import {Statistik} from "../../domain/statistik";

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

  ngOnInit() {
    this.playerService.FindById(1811).then(p => {

      this.statisticService.FindByPlayer(p.ID).then( st => {
        st.forEach(s => {
          let sa = s as Statistik;


        });

      });
    });
  }


}
