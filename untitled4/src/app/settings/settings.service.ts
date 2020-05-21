import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventsService} from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',

    })
  };

  getallEmployee() {
    return   this.http.get<any[]>('http://localhost:8080/employees', this.httpOptions) ;
  }
  createemplyee(value: any ) {
    return this.http.post('http://localhost:8080/employees' , value , this.httpOptions) ;
  }
  deletebyid(id: any ) {
    return this.http.delete('http://localhost:8080/employees/delete/' + id  , this.httpOptions) ;
  }

  createTeam(value: any ) {
    return this.http.post('http://localhost:8080/teams' , value , this.httpOptions) ;
  }
  getAllTeams() {
    return   this.http.get<any[]>('http://localhost:8080/teams', this.httpOptions) ;
  }
  createSubcription(value: any ) {
    return this.http.post('http://localhost:8080/subscriptions' , value , this.httpOptions) ;
  }
  getAllSubscprition(id:any) {
    return   this.http.get<any[]>('http://localhost:8080/subscriptions/'+id, this.httpOptions) ;
  }
  deletesubscirptionbyidTeamAndidUser(idteam: any , iduser: any  ) {
    return this.http.delete('http://localhost:8080/subscriptions/' + idteam + '/delete/' + iduser  , this.httpOptions) ;
  }
  deleteTeamsbyidTeam(idteam: any ) {
    return this.http.delete('http://localhost:8080/teams/delete/' + idteam  , this.httpOptions) ;
  }
  createworkspace(value: any ) {
    return this.http.post('http://localhost:8080/workspaces' , value , this.httpOptions) ;
  }
  getAllworkspaces(id : number) {
    return   this.http.get<any[]>('http://localhost:8080/workspaces/'+id, this.httpOptions) ;
  }
  deleteBoardFromTeamWorkpaceid(idteam: any , idboard: any  ) {
    return this.http.delete('http://localhost:8080/workspaces/delete/' + idteam + '/' + idboard  , this.httpOptions) ;
  }
}
