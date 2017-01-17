import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Spieler} from "../../domain/spieler";
import {SpielerService} from "../../service/spieler.service";

import {Location} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-spieler-edit',
  templateUrl: './spieler-edit.component.html',
  styleUrls: ['./spieler-edit.component.css']
})

export class SpielerEditComponent implements OnInit{

  constructor(
    private spielerService: SpielerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.spielerService.FindById(+params['id']))
      .subscribe(s => this.spieler = s);
  }


  goBack(): void {
    this.location.back();
  }


  save(spieler: Spieler): void {
    this.spielerService.Update(spieler)
      .then(() => this.goBack());
  }

  isMonday(i: boolean)
  {
    this.spieler.isMonday = i;
  }

  public spieler: Spieler;

}
