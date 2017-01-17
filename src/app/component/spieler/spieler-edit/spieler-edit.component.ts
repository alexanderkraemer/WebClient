import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Spieler} from "../../../domain/spieler";
import {SpielerService} from "../../../service/spieler.service";

import {Location} from '@angular/common';
import {UploadService} from "../../../service/upload.service";

@Component({
  moduleId: module.id,
  selector: 'app-spieler-edit',
  templateUrl: 'spieler-edit.component.html',
  styleUrls: ['spieler-edit.component.css']
})

export class SpielerEditComponent implements OnInit{

  constructor(
    private spielerService: SpielerService,
    private uploadService: UploadService,
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

  onChange(event) {
    var file = event.srcElement.files[0];
    this.file = file;
    this.spieler.PhotoPath = this.file.name;
    this.uploadfile(file);
  }

  uploadfile(file: any): void {
    let fi = file.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.uploadService
        .upload(fileToUpload, this.spieler.Nickname)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  public spieler: Spieler;
  private file: File;

}
