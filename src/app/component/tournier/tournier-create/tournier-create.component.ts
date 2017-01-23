import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Tournier} from "../../../domain/tournier";
import {Location} from '@angular/common';
import {TournierService} from "../../../service/tournier.service";

@Component({
  selector: 'app-tournier-create',
  templateUrl: 'tournier-create.component.html',
  styleUrls: ['tournier-create.component.css']
})
export class TournierCreateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tournamentService: TournierService
  ) { }

  ngOnInit() {
    var t = new Tournier();
    this.tournier = t;
  }

  save()
  {
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' +
      ('00' + date.getUTCHours()).slice(-2) + ':' +
      ('00' + date.getUTCMinutes()).slice(-2) + ':' +
      ('00' + date.getUTCSeconds()).slice(-2);

    console.log(date);
    this.tournier.Timestamp = date;
    this.tournamentService.Insert(this.tournier).then( () => this.goBack()).catch(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  tournier : Tournier;

}
