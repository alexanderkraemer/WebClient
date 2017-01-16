import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-spieler-detail',
  templateUrl: './spieler-detail.component.html',
  styleUrls: ['./spieler-detail.component.css']
})
export class SpielerDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.id = this.route.params['id'];
        /*
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero);
        */

  }

  private id: number;
}
