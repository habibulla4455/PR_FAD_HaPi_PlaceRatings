import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DropdownService } from "../dropdown.service.service";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() item: string;
  options:[1,2,3,4,5];
  rating:number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  picklistMenuExpand:boolean;

  constructor(private dropdownservice: DropdownService) { 
    this.picklistMenuExpand = false;
    this.options=[1,2,3,4,5];

    this.dropdownservice.otherDropdownOpen.subscribe( 
      (dropdownOpen) => {
        if ( dropdownOpen['item']  != this.item ) this.picklistMenuExpand = false;

      } 
    );

  }

  ngOnInit() {
  }

  dropdownClicked(){
    this.picklistMenuExpand = !this.picklistMenuExpand;

    this.dropdownservice.letOthersKnow(
      {'item':this.item}
    );
  }

  ratingSelected(n:number){
    this.dropdownClicked();
    this.rating = n;

    this.ratingClick.emit({
      item: this.item,
      rating: this.rating
    });

  }

  

}
