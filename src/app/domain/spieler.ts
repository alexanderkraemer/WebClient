export class Spieler {

    ID: number;
    isAdmin: boolean;
    FirstName: string;
    LastName: string;
    Nickname: string;
    Skills: number;
    PhotoPath: string;
    Password: string;
    isMonday: boolean;
    isTuesday: boolean;
    isWednesday: boolean;
    isThursday: boolean;
    isFriday: boolean;
    isSaturday: boolean;

  /*
    constructor(id: number, isAdmin: boolean, FirstName: string, LastName: string, Nickname: string,
                Skills: number, PhotoPath: string, Password: string, isMonday: boolean, isTuesday: boolean,
                isWednesday: boolean, isThursday: boolean, isFriday: boolean, isSaturday: boolean)
    {
        this.id = id;
        this.isAdmin = isAdmin;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Nickname = Nickname;
        this.Skills = Skills;
        this.Photopath = Photopath;
        this.Password = Password;
        this.isMonday = isMonday;
        this.isTuesday = isTuesday;
        this.isWednesday = isWednesday;
        this.isThursday = isThursday;
        this.isFriday = isFriday;
        this.isSaturday = isSaturday;
    }
    */

  constructor()
  {
    this.ID = 0;
    this.isAdmin = false;
    this.FirstName = "";
    this.LastName = "";
    this.Nickname = "";
    this.Skills = 1000;
    this.PhotoPath = "";
    this.Password = "";
    this.isMonday = false;
    this.isTuesday = false;
    this.isWednesday = false;
    this.isThursday = false;
    this.isFriday = false;
    this.isSaturday = false;
  }
}

export class AuthObj{
  constructor(nickname: string, password: string){
    this.nickname = nickname;
    this.password = password;
  }

  nickname: string;
  password: string;
}


export class TokenObj{
  constructor(nickname: string, token: string){
    this.nickname = nickname;
    this.token = token;
  }

  nickname: string;
  token: string;
}
