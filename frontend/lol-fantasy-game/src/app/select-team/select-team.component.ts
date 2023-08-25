import { ChampionshiphasteamsService } from './../common/services/championshiphasteams.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChampionshipService } from '../common/services/championship.service';
import { TeamService } from '../common/services/team.service';
import { MatchesService } from '../common/services/matches.service';
// import Enums from './../common/enum/enum.json';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit {
your_team: any = {
  name:'',
  id_user: localStorage.getItem('id'),
};

championships = [
  { "id": null,
    "name": "CBLOL 2023",
    "year": "1",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2023",
    "year": "2",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2024",
    "year": "1",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2024",
    "year": "2",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2025",
    "year": "1",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2025",
    "year": "2",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2026",
    "year": "1",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2026",
    "year": "2",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2027",
    "year": "1",
    "id_user": localStorage.getItem('id')
  },
  {
    "id": null,
    "name": "CBLOL 2027",
    "year": "2",
    "id_user": localStorage.getItem('id')
  },
]
teams = [
  {
    "name": "Loud",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Pain Gaming",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "INTZ",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Red Canids",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Kabum",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Los Grandes",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Furia",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Fluxo",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Vivo Keyd",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  },
  {
    "name": "Liberty",
    "id_user": localStorage.getItem('id'),
    "wins": 0,
    "loses": 0
  }

]
  id_user: any;
  other_teams : any;
  dtoRegisterTeam: any = {
    id_team: '',
    id_championship: ''
  };
  all_teams: any = [];
  matches: any = [];

  constructor(
    public championshipService: ChampionshipService,
    public teamService: TeamService,
    public matchesService: MatchesService,
    public router: Router,
    public championshiphasteamsService: ChampionshiphasteamsService
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.other_teams = [];
    this.your_team.is_main_team = true;
    this.teams.forEach( (value) => {
      if(value.name != this.your_team.name){
        this.other_teams.unshift(value);
      }
    });
    for(let i =0; i < this.other_teams.length; i++){
      if(this.other_teams[i]?.name){
        this.createTeam(this.other_teams[i]);
      }
    }
    this.createTeam(this.your_team);


    for(let x = 0; x < this.championships.length; x++){
        this.createChampionships(this.championships[x]);
    }


    // Remover se possivel
    // for(let x = 0; x < this.championships.length; x++){
    //   this.registerTeam(this.your_team, this.championships[x]);
    // }
    // for(let i =0; i < this.other_teams.length; i++){
    //   if(this.other_teams[i]?.name){
    //     for(let x = 0; x < this.championships.length; x++){
    //       this.registerTeam(this.other_teams[i], this.championships[x]);
    //     }
    //   }
    // }
  }

  getChampionshipsInfo(): void {
    this.championshipService.getByUserId(localStorage.getItem('id')).subscribe(
      (res: any) => {
        this.championships = res;
        console.log(res);
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  getTeamInfo(team?:any): void {
    this.teamService.getByUserId(localStorage.getItem('id')).subscribe(
      (res: any) => {
        console.log(res);
        this.all_teams = res;
        this.other_teams = []
        console.log(this.championships)
        for(var i = 0; i < res.length; i++){
          if(res[i].is_main_team){
            this.your_team = res[i];
            for(var i = 0; i < this.championships.length; i++){
            this.registerTeam(this.your_team, this.championships[i]);
            }
          } else {
            this.other_teams.unshift(res[i]);
          }
        }
        for(var i = 0; i < this.championships.length; i++){
          for(var x = 0; x < this.other_teams.length; x++){
            this.registerTeam(this.other_teams[x],this.championships[i])
          }
        }
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  createTeam(team: any): void {
    console.log(team);
    this.teamService.saveOrUpdate(team).subscribe(
      (res: any) => {
        console.log(res);
        // this.router.navigate(['/match']);
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  registerTeam(team: any,championship:any): void {
    console.log("IDs:",team.id,championship.id)
    this.dtoRegisterTeam.id_team = team.id;
    this.dtoRegisterTeam.id_championship = championship.id;
    this.championshiphasteamsService.registerTeam(this.dtoRegisterTeam).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  createChampionships(championship: any):void {
    this.championshipService.saveOrUpdate(championship).subscribe(
      (res: any) => {
        console.log(res);
        this.getChampionshipsInfo();
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  createMatch(): void {
    console.log(this.other_teams)
    for(let i =0; i < this.championships.length; i++){
      this.other_teams.forEach( (value: any) => {
          let match = {
            id_red_team: this.your_team.id,
            id_blue_team: value.id,
            id_championship: this.championships[i].id,
            id_user: localStorage.getItem('id')
          }
          this.matches.unshift(match)
      });
      for(let x =0; x < this.other_teams.length; x++){
        let match2 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-1]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match2.id_blue_team){
          this.matches.unshift(match2)
        }

        let match3 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-2]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match3.id_blue_team){
          this.matches.unshift(match3)
        }

        let match4 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-3]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match4.id_blue_team){
          this.matches.unshift(match4)
        }

        let match5 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-4]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match5.id_blue_team){
          this.matches.unshift(match5)
        }

        let match6 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-5]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match6.id_blue_team){
          this.matches.unshift(match6)
        }

        let match7 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-6]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match7.id_blue_team){
          this.matches.unshift(match7)
        }

        let match8 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-7]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match8.id_blue_team){
          this.matches.unshift(match8)
        }

        let match9 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-8]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }
        
        if(match9.id_blue_team){
          this.matches.unshift(match9)
        }

        let match10 = {
          id_red_team: this.other_teams[x]?.id,
          id_blue_team: this.other_teams[x-9]?.id,
          id_championship: this.championships[i].id,
          id_user: localStorage.getItem('id')
        }

        if(match10.id_blue_team){
          this.matches.unshift(match10)
        }
      }
    }
    console.log(this.matches);
    this.registerMatch(this.matches);
  }

  registerMatch(match:any): void {
    for(var i=0; i < match.length; i++){
      this.matchesService.saveOrUpdate(match[i]).subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err)
        }
      );
    }
  }
  getAllMatches(): void {
    this.matchesService.getAll(localStorage.getItem('id')).subscribe(
      (res: any) => {
        console.log(res);
        this.championshipHasMatches(res);
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  championshipHasMatches(match: any): void {
    for(let i = 0; i < match.length; i++){
      this.matchesService.championshipHasMatches(match[i]).subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err)
        }
      );
    }
  }
}
