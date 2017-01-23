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
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {TournierCreateComponent} from "./component/tournier/tournier-create/tournier-create.component";

const routes: Routes = [

  {path: 'login', component: LoginComponent},

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'spieler', component: SpielerComponent, canActivate: [AuthGuard]},
  {path: 'spieler/create', component: SpielerCreateComponent, canActivate: [AuthGuard]},
  {path: 'spieler/:id', component: SpielerDetailComponent, canActivate: [AuthGuard]},
  {path: 'spieler/:id/edit', component: SpielerEditComponent, canActivate: [AuthGuard]},

  {path: 'matches', component: MatchComponent, canActivate: [AuthGuard]},
  {path: 'matches/create', component: MatchCreateComponent, canActivate: [AuthGuard]},
  {path: 'matches/:id', component: MatchDetailComponent, canActivate: [AuthGuard]},
  {path: 'matches/:id/edit', component: MatchEditComponent, canActivate: [AuthGuard]},
  {path: 'matches/page/:page', component: MatchComponent, canActivate: [AuthGuard]},
  {path: 'matches/generate/:id', component: MatchGenerateComponent, canActivate: [AuthGuard]},

  {path: 'login', component: LoginComponent},


  {path: 'live', component: LiveComponent},
  {path: 'tourniere', component: TournierComponent, canActivate: [AuthGuard]},
  {path: 'tourniere/create', component: TournierCreateComponent, canActivate: [AuthGuard]},
  {path: 'tourniere/:id', component: TournierDetailComponent, canActivate: [AuthGuard]},
  {path: 'tourniere/:id/edit', component: TournierEditComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
