import { CampaignService } from './../common/services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../common/services/team.service';
import { PlayersService } from '../common/services/players.service';
import { ChampionshipService } from '../common/services/championship.service';
import { MatchesService } from '../common/services/matches.service';
import { ChampionshiphasteamsService } from '../common/services/championshiphasteams.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  championships: any;
  matches: any;
  name: any;

  teamsEnum = [
    {
      name: 'default'
    },
    {
      name: 'Loud'
    },
    {
      name: "Pain Gaming"
    },
    {
      name: "INTZ"
    }
  ]
  red_power: number = 0;
  blue_power: number = 0;campaign: any;
  dto = {
    id : 1,
    id_championship : 1,
    id_team : 1,
    wins : 5,
    loses : 4,
  }
;
  table: any;

  constructor(
    public teamService: TeamService,
    public campaignService: CampaignService,
    public playersService: PlayersService,
    public championshipService: ChampionshipService,
    public matchesService: MatchesService,
    public championsTeamsService: ChampionshiphasteamsService
  ) { }

  ngOnInit(): void {
    this.getCampaign();
    this.getTables();
  }

  getTables(): void {
    this.championsTeamsService.allResults().subscribe(
      (res: any) => {
        console.log(res)
        this.table = res;
      },
      (err: any) => {
      }
    );
  }

  getCampaign(): void {
    this.campaignService.getByUserId(1).subscribe(
      (res: any) => {
        console.log(res)
        this.campaign = res[0];
        // this.getAllTeams();
        this.getAllMatches();
        this.getChampionship();
        // this.getTeam(res[0].id_team);
        // this.getPlayers(res[0].id_team);
      },
      (err: any) => {
      }
    );
  }

  getChampionship(): void {
    this.championshipService.getAll().subscribe(
      (res: any) => {
        console.log(res);
        this.championships = res;
      },
      (err: any) => {
      }
    );
  }

  getTeam(id: number, position: number): any {
    console.log(id)
    this.teamService.getById(id).subscribe(
      (res: any) => {
        console.log(res[0].name);
        // this.name[position] = res[0].name;
      },
      (err: any) => {
      }
    );
  }

  getAllTeams(): void {
    this.teamService.getAll().subscribe(
      (res: any) => {
      },
      (err: any) => {
      }
    );
  }

  getAllMatches(): void {
    this.matchesService.getAll().subscribe(
      (res: any) => {
        this.matches = res;
        this.getTournamentInfos(res[0].id);
      },
      (err: any) => {
      }
    );
  }

  getTournamentInfos(id: number): void {
    this.matchesService.getTournamentInfos(id).subscribe(
      (res: any) => {
        for(let i of res){
          for(let x = 0; this.matches.length > x; x++){
            if(i.id === this.matches[x].id){
              this.matches[x].id_championship = i.id_championship;
            }
          }
        }
      },
      (err: any) => {
      }
    );
    console.log(this.matches);
  }

  play(match: any, championship: any): void {
    console.log(match, championship);
    this.red_power = 0;
    this.blue_power = 0;
    let game_time = 0

    this.playersService.getPlayers(match.id_red_team).subscribe(
      (res: any) => {
        match.red_team_players = res;

        for(let i of match.red_team_players){
          this.red_power += i.power;
          match.red_team_total_power = this.red_power
        }
        match.red_team_dice = this.rollDice(match.red_team_total_power); 

      },
      (err: any) => {
      }
    );

    this.playersService.getPlayers(match.id_blue_team).subscribe(
      (res: any) => {
        match.blue_team_players = res;

        for(let i of match.blue_team_players){
          this.blue_power += i.power;
          match.blue_team_total_power = this.blue_power
        }
        match.blue_team_dice = this.rollDice(match.blue_team_total_power);
        if(match.blue_team_dice > match.red_team_dice){
          match.winner = match.id_blue_team;
    
        }
        if(match.red_team_dice > match.blue_team_dice){
          match.winner = match.id_red_team;
        } 
      },
      (err: any) => {
      }
    );

    while(game_time < 17 || game_time > 55){
      game_time = Math.random()*100;
    }
    // red_team = Math.random();
    // blue_team  = Math.random();
    // console.log(red_team, blue_team);
    match.game_time = game_time;
    console.log('Partida:', match);

    this.postResults();
  }

  postResults(): void {
    
    console.log(this.dto);

    this.championsTeamsService.putResults(this.dto).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.getTables();
  }

  rollDice(power: any): any {
    console.log(power);
    
    let dice = 0

    dice = Math.random()*1000;
    dice = dice +(power * 5);

    console.log(dice);

    return dice;
  }

  getPlayers(id: number): void {
    this.playersService.getPlayers(id).subscribe(
      (res: any) => {
      },
      (err: any) => {
      }
    );
  }
}
