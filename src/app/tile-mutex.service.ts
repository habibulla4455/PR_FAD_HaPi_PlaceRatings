import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TileMutexService {

  constructor() {
    this.letOthersKnow( {'value':false, 'index':-1} ); 
   }

  private apiInUseSubject = new BehaviorSubject( [] );
  apiInUse = this.apiInUseSubject.asObservable();

  letOthersKnow(signal : any ){
   // console.log( signal['index'] + ' is setting the lock to '+signal['value']);
    this.apiInUseSubject.next(signal);
  }

}
