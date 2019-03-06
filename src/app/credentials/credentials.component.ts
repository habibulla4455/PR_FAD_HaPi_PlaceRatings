import { Component, OnInit, Output,EventEmitter, Input,ViewChild } from '@angular/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  @Input() buttonTitle:string;
  @Input() title:string;
  @Input() hideForgot:boolean;

  @Input() showEmailError:boolean;
  @Input() emailErrorMessage:string;
  @Input() showPasswordError:boolean;
  @Input() passwordErrorMessage:string;

  @Output() emitter :  EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ButtonComponent) button:ButtonComponent;

  username:string;
  password:string;

  constructor() { }
  ngOnInit() { }

  emit() {
    this.emitter.emit({
      username: this.username,
      password: this.password
    });

  }

  pressedEnter(){
    this.button.emit();
  }
  

}
