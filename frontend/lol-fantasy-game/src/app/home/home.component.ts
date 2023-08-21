import { CampaignService } from './../common/services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../common/services/team.service';
import { PlayersService } from '../common/services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public teamService: TeamService,
    public campaignService: CampaignService,
    public playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.getCampaign();
  }

  getCampaign(): void {
    this.campaignService.getByUserId(1).subscribe(
      (res: any) => {
        console.log(res);
        this.getTeam(res[0].id_team);
        this.getPlayers(res[0].id_team);
      },
      (err: any) => {
      }
    );
  }

  getTeam(id: number): void {
    this.teamService.getById(id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
      }
    );
  }

  getPlayers(id: number): void {
    this.playersService.getPlayers(id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
      }
    );
  }
}
