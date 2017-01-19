import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './component/dashboard/dashboard.component';
import {SpielerComponent} from "./component/spieler/spieler.component";
import {MatchComponent} from "./component/match/match.component";
import {LiveComponent} from "./component/live/live.component";
import {TournierComponent} from "./component/tournier/tournier.component";
import {SpielerDetailComponent} from "./component/spieler/spieler-detail/spieler-detail.component";
import {SpielerEditComponent} from "./component/spieler/spieler-edit/spieler-edit.component";
import {SpielerCreateComponent} from "./component/spieler/spieler-create/spieler-create.component";
import {MatchCreateComponent} from "./component/match/match-create/match-create.component";
import {MatchDetailComponent} from "./component/match/match-detail/match-detail.component";
import {MatchEditComponent} from "./component/match/match-edit/match-edit.component";
import {TournierDetailComponent} from "./component/tournier/tournier-detail/tournier-detail.component";
import {MatchGenerateComponent} from "./component/match/match-generate/match-generate.component";
import {TournierEditComponent} from "./component/tournier/tournier-edit/tournier-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'spieler', component: SpielerComponent},
  {path: 'spieler/create', component: SpielerCreateComponent},
  {path: 'spieler/:id', component: SpielerDetailComponent},
  {path: 'spieler/:id/edit', component: SpielerEditComponent},

  {path: 'matches', component: MatchComponent},
  {path: 'matches/create', component: MatchCreateComponent},
  {path: 'matches/:id', component: MatchDetailComponent},
  {path: 'matches/:id/edit', component: MatchEditComponent},
  {path: 'matches/page/:page', component: MatchComponent},
  {path: 'matches/generate/:id', component: MatchGenerateComponent},




  {path: 'live', component: LiveComponent},
  {path: 'tourniere', component: TournierComponent},
  {path: 'tourniere/:id', component: TournierDetailComponent},
  {path: 'tourniere/:id/edit', component: TournierEditComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
