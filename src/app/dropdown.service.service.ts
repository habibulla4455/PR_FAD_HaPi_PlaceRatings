import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  private dropdownOpen = new BehaviorSubject( [] );
  otherDropdownOpen = this.dropdownOpen.asObservable();

  letOthersKnow(signal : any){
    this.dropdownOpen.next(signal);
  }

 

}
