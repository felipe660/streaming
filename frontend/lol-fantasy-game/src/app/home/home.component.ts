import { CampaignService } from './../common/services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../common/services/team.service';
import { PlayersService } from '../common/services/players.service';
import { ChampionshipService } from '../common/services/championship.service';
import { MatchesService } from '../common/services/matches.service';
import { ChampionshiphasteamsService } from '../common/services/championshiphasteams.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChampionsService } from '../common/services/champions.service';
import { ThisReceiver } from '@angular/compiler';

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
    },
    {
      name: "Red Canids"
    }
  ]
  red_power: number = 0;
  blue_power: number = 0;campaign: any;
  dto = {
    wins: '',
    loses: '',
  };
  table: any;

  modalRef: NgbModalRef | undefined;
  modalReference: any;
  modalMatchInfos: any;
  blue_team_draft = [
  {
    id: 0,
    name: '',
    role: 'Top',
    selectTime: false,
    id_champion:1
    },
    {
    id: 1,
    name: '',
    role: 'Jungle',
    selectTime: false,
    id_champion:2
    },
    {
    id: 2,
    name: '',
    role: 'Mid',
    selectTime: false,
    id_champion:3
    },
    {
    id: 3,
    name: '',
    role: 'Bot',
    selectTime: false,
    id_champion:4
    },
    {
    id: 4,
    name: '',
    role: 'Suporte',
    selectTime: false,
    id_champion:5
    },
  ]
  red_team_draft = [
    {
    id: 0,
    name: '',
    role: 'Top',
    selectTime: true,
    id_champion:6
    },
    {
    id: 1,
    name: '',
    role: 'Jungle',
    selectTime: false,
    id_champion:7
    },
    {
    id: 2,
    name: '',
    role: 'Mid',
    selectTime: false,
    id_champion:8
    },
    {
    id: 3,
    name: '',
    role: 'Bot',
    selectTime: false,
    id_champion:9
    },
    {
    id: 4,
    name: '',
    role: 'Suporte',
    selectTime: false,
    id_champion:10
    },
]
  championList: any;
  championAlert: boolean = false;
  draft_End: boolean = false;
  championAlertEmpty: boolean = false;


  constructor(
    public teamService: TeamService,
    public campaignService: CampaignService,
    private modalService: NgbModal,
    public playersService: PlayersService,
    public championshipService: ChampionshipService,
    public championsService: ChampionsService,
    public matchesService: MatchesService,
    public championsTeamsService: ChampionshiphasteamsService
  ) { }

  ngOnInit(): void {
    this.getCampaign();
    this.getTables();
    this.getAllChampions();
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

  getAllChampions(): void {
    this.championsService.getAll().subscribe(
      (res: any) => {
        console.log('champions banco:',res);
        this.championList = res;
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

  getTeam(id: number): any {
    console.log(id)
    this.teamService.getById(id).subscribe(
      (res: any) => {
        console.log(res[0]);
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

  calculateDrafrt(details:any): void{
    this.winner();
    console.log("Infos",this.modalMatchInfos)
    this.openModal(details);
  }


  winner(): void{
    if(this.modalMatchInfos.blue_team_dice > this.modalMatchInfos.red_team_dice){
      this.modalMatchInfos.winner = this.modalMatchInfos.id_blue_team;
      // this.postResults(match.id_red_team);
      // this.postLoser(match.winner);

    }
    if(this.modalMatchInfos.red_team_dice > this.modalMatchInfos.blue_team_dice){
      this.modalMatchInfos.winner = this.modalMatchInfos.id_red_team;
      // this.postResults(match.id_blue_team);
      // this.postLoser(match.winner);
    } 
  }

  play(match: any, championship: any, content?: any): void {
    this.getAllChampions();
    this.modalReference = content;
    this.openModal(this.modalReference);
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

      },
      (err: any) => {
      }
    );

    while(game_time < 1100 || game_time > 2700){
      game_time = Math.random()*3000;
      game_time = Math.round(game_time);
    }

    match.game_time = this.time_convert(game_time);
    console.log('Partida:', match);
    this.modalMatchInfos = match;
  }

  time_convert(num: number): any{ 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + ":" + minutes;         
}

  getTeamInfo(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.championsTeamsService.getTeamInfo(id).subscribe(
        (res: any) => {
          console.log("Vencedor", res);
          this.dto = res[0];
          this.dto.wins += 1;
          this.updateTable();
          resolve(res); // Resolvendo a Promise com a resposta do serviço
        },
        (err: any) => {
          reject(err); // Rejeitando a Promise com o erro do serviço
        }
      );
    });
  }


  async getTeamInfoLoser(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.championsTeamsService.getTeamInfo(id).subscribe(
        (res: any) => {
          console.log("Perdedor", res);
          this.dto = res[0];
          this.dto.loses += 1;
          this.updateTableLoser();
          resolve(res); // Resolvendo a Promise com a resposta do serviço
        },
        (err: any) => {
          reject(err); // Rejeitando a Promise com o erro do serviço
        }
      );
    });
  }

  updateTableLoser(): void {
    this.championsTeamsService.putResults(this.dto).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  updateTable(): void {
    this.championsTeamsService.putResults(this.dto).subscribe(
      (res: any) => {
        console.log(res);
        this.openModal(this.modalReference);
        this.finishMatch();
      },
      (err: any) => {
        // this.openModal(this.modalReference);
        console.log(err);
      }
    );
  }

  finishMatch(): void {
    this.matchesService.finishMatch(this.modalMatchInfos).subscribe(
      (res: any) => {
        this.deleteMatch();
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteMatch(): void{
    this.matchesService.deleteMatchFromChampionship(this.modalMatchInfos.id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.matchesService.deleteMatch(this.modalMatchInfos.id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  reloadWindow(): void {
    window.location.reload()
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content, { size: 'xl' });
  }

  async postResults(id: any): Promise<void> {
    try {
      const teamInfo = this.getTeamInfoLoser(id);
      teamInfo;
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
    } catch (error) {
      console.error("Erro ao obter informações do time:", error);
    }
  }

  async postLoser(id: any): Promise<void> {
    try {
      const teamInfo = await this.getTeamInfo(id);
      teamInfo;
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
      this.getTables(); // Só será chamado após o getTeamInfo ser concluído
    } catch (error) {
      console.error("Erro ao obter informações do time:", error);
    }
  }

  nextRedPlayer(champion: any, championList: any): void{
    this.championAlert = false;
    this.championAlertEmpty = false;
    if(!champion.id_champion){
      this.championAlertEmpty = true;
    } else {
      this.championAlertEmpty = false;
    }
    var cont;
    for(let i = 0; i< this.championList.length; i++){
      if(champion.id_champion === this.championList[i].id){
        this.nextChampionSelectRed(champion, championList);
        cont = 1;
      }
    }
    if(!cont && champion.id_champion){
      this.championAlert = true;
      console.log('Campeão ja selecionado!');
    } else {
      this.championAlert = false;
    }
  }

  nextBluePlayer(champion: any, championList: any): void{
    this.championAlert = false;
    this.championAlertEmpty = false;
    if(!champion.id_champion){
      this.championAlertEmpty = true;
    }
    var cont;
    for(let i = 0; i< this.championList.length; i++){
      if(champion.id_champion === this.championList[i].id){
        this.nextChampionSelectBlue(champion, championList);
        cont = 1;
      }
    }
    if(!cont && champion.id_champion){
      this.championAlert = true;
      console.log('Campeão ja selecionado!');
    } else {
      this.championAlert = false;
    }
  }

  nextChampionSelectRed(champion: any, championList: any): void {
    for(let i = 0; i < championList.length; i++){
        if(champion.id_champion === championList[i].id){
          champion.name = this.championList[i].name
          champion.win_rate = this.championList[i].win_rate;
          // TODO Ajustar o winrate
          this.modalMatchInfos.red_team_win_rate = champion.win_rate;
          this.championList.splice(i, 1);
        }
    }
    if(champion.id == 0){
      champion.selectTime = false;
      this.blue_team_draft[0].selectTime = true;
    }
    if(champion.id == 1){
      this.red_team_draft[1].selectTime = false;
      this.red_team_draft[2].selectTime = true;
    }
    if(champion.id == 2){
      this.red_team_draft[2].selectTime = false;
      this.blue_team_draft[2].selectTime = true;
    }
    if(champion.id == 3){
      this.red_team_draft[3].selectTime = false;
      this.red_team_draft[4].selectTime = true;
    }
    if(champion.id == 4){
      this.red_team_draft[4].selectTime = false;
      this.blue_team_draft[4].selectTime = true;
    }
  }

  nextChampionSelectBlue(champion: any, championList: any): void {
    for(let i = 0; i < championList.length; i++){
      if(champion.id_champion === championList[i].id){
        champion.name = this.championList[i].name
        champion.win_rate = this.championList[i].win_rate;
        this.championList.splice(i, 1);
      }
  }
    if(champion.id == 0){
      champion.selectTime = false;
      this.blue_team_draft[1].selectTime = true;
    }
    if(champion.id == 1){
      this.blue_team_draft[1].selectTime = false;
      this.red_team_draft[1].selectTime = true;
    }
    if(champion.id == 2){
      this.blue_team_draft[2].selectTime = false;
      this.blue_team_draft[3].selectTime = true;
    }
    if(champion.id == 3){
      this.blue_team_draft[3].selectTime = false;
      this.red_team_draft[3].selectTime = true;
    }
    if(champion.id == 4){
      this.blue_team_draft[4].selectTime = false;
      this.draft_End = true;
    }
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
