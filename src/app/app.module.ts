import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SpielerComponent } from './component/spieler/spieler.component';
import { MatchComponent } from './component/match/match.component';
import { LiveComponent } from './component/live/live.component';
import { TournierComponent } from './component/tournier/tournier.component';
import { SpielerDetailComponent } from './component/spieler/spieler-detail/spieler-detail.component';
import { SpielerEditComponent } from './component/spieler/spieler-edit/spieler-edit.component';


import {SpielerService} from "./service/spieler.service";
import {MatchService} from "./service/match.service";
import {TournierService} from "./service/tournier.service";
import {StatistikService} from "./service/statistik.service";
import { SpielerCreateComponent } from './component/spieler/spieler-create/spieler-create.component';
import {UploadService} from "./service/upload.service";


import { MatchDetailComponent } from './component/match/match-detail/match-detail.component';
import { MatchCreateComponent } from './component/match/match-create/match-create.component';
import { MatchEditComponent } from './component/match/match-edit/match-edit.component';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TournierDetailComponent } from './component/tournier/tournier-detail/tournier-detail.component';
import { MatchGenerateComponent } from './component/match/match-generate/match-generate.component';
import { TournierEditComponent } from './component/tournier/tournier-edit/tournier-edit.component';


// chart

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SpielerComponent,
    MatchComponent,
    LiveComponent,
    TournierComponent,
    SpielerDetailComponent,
    SpielerEditComponent,
    SpielerCreateComponent,
    MatchDetailComponent,
    MatchCreateComponent,
    MatchEditComponent,
    TournierDetailComponent,
    MatchGenerateComponent,
    TournierEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),

  ],
  providers: [
      SpielerService,
      MatchService,
      TournierService,
      StatistikService,
      UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
