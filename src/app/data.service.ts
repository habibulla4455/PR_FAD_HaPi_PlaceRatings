import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
/*
  private displayName = new BehaviorSubject('');
  currentdisplayName = this.displayName.asObservable();

  changedisplayName(message: string) {
    this.displayName.next(message)
  }
*/
  private user = new BehaviorSubject([]);
  currentuser = this.user.asObservable();

  changeCurrentUser(user : any){
    this.user.next(user);
  }

}

