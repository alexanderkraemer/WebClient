import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Spieler} from "../../../domain/spieler";
import {SpielerService} from "../../../service/spieler.service";
import { Router } from '@angular/router'

import {Location} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-spieler-detail',
  templateUrl: 'spieler-detail.component.html',
  styleUrls: ['spieler-detail.component.css']
})
export class SpielerDetailComponent implements OnInit{

  constructor(
    private spielerService: SpielerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.spielerService.FindById(+params['id']))
      .subscribe(s => this.spieler = s);
  }

  goBack(): void {
    this.location.back();
  }

  goToEditForm(spieler: Spieler): void {
    this.router.navigate(['/spieler', spieler.ID, 'edit']);
  }

  public spieler: Spieler;

}
