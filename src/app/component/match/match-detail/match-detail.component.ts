import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Spieler} from "../../../domain/spieler";
import { Router } from '@angular/router'

import {Location} from '@angular/common';
import {MatchService} from "../../../service/match.service";
import {Match} from "../../../domain/match";


@Component({
  moduleId: module.id,
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.matchService.FindById(+params['id']))
      .subscribe(s => this.match = s);
  }

  goBack(): void {
    this.location.back();
  }

  goToEditForm(spieler: Spieler): void {
    this.router.navigate(['/match', spieler.ID, 'edit']);
  }

  match: Match;
}
