import { Component, OnInit } from '@angular/core';
import {Tournier} from "../../../domain/tournier";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {TournierService} from "../../../service/tournier.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-tournier-detail',
  templateUrl: './tournier-detail.component.html',
  styleUrls: ['./tournier-detail.component.css']
})
export class TournierDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tournamentService: TournierService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.tournamentService.FindById(+params['id']))
      .subscribe(t => {
        this.tournament = t;
      });
  }

  goBack() {
    this.location.back();
  }

  generateMatches() {
    this.router.navigate(['/matches/generate', this.tournament.ID]);
  }

  editTournier() {
    this.router.navigate(['/tourniere', this.tournament.ID, 'edit']);
  }

  tournament: Tournier;
}
