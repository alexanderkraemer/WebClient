import {Spieler} from "./spieler";
import {Tournier} from "./tournier";
export class Match {

  ID: number;
  Team1Player1: number;
  Team1Player2: number;
  Team2Player1: number;
  Team2Player2: number;
  TournamentId: number;
  ResultPointsPlayer1: number;
  ResultPointsPlayer2: number;
  Finished: boolean;
  /*
   constructor(id: number, Team1Player1: number, Team1Player2: number, Team2Player1: number,
   Team2Player2: number, ResultPointsPlayer1: number, ResultPointsPlayer2: number, Finished: boolean)
   {
   this.ID = id;
   this.Team1Player1 = Team1Player1;
   this.Team1Player2 = Team1Player2;
   this.Team2Player1 = Team2Player1;
   this.Team2Player2 = Team2Player2;
   this.ResultPointsPlayer1 = ResultPointsPlayer1;
   this.ResultPointsPlayer2 = ResultPointsPlayer2;
   }
   */


}

export class PopulatedMatch {
  ID: number;
  Team1Player1: Spieler;
  Team1Player2: Spieler;
  Team2Player1: Spieler;
  Team2Player2: Spieler;
  Tournier: Tournier;
  ResultPointsPlayer1: number;
  ResultPointsPlayer2: number;
  Finished: boolean;

}
