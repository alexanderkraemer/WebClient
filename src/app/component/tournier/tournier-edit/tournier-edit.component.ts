import { Component, OnInit } from '@angular/core';
import {TournierService} from "../../../service/tournier.service";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {Tournier} from "../../../domain/tournier";

@Component({
  selector: 'app-tournier-edit',
  templateUrl: './tournier-edit.component.html',
  styleUrls: ['./tournier-edit.component.css']
})
export class TournierEditComponent implements OnInit {

  constructor(
    private tournamentService: TournierService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.tournamentService.FindById(+params['id']))
      .subscribe(t => {
        this.tournament = t;
      });
  }

  save() {
    this.tournamentService.Update(this.tournament).then(() => {
      this.router.navigate(['tourniere/', this.tournament.ID]);
    });
  }

  goBack()
  {
    this.router.navigate(['tourniere/', this.tournament.ID]);
  }

  tournament: Tournier;

}
