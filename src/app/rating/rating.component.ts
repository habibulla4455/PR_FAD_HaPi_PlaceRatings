
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  
  @Input() menuItem: string;
  @Input() rating: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }
  
  onClick(rating: number): void {

    this.rating = rating;
    this.ratingClick.emit({
      menuItem: this.menuItem,
      rating: rating
    });
  }
  
}
