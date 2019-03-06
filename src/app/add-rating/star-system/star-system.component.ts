
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-system',
  templateUrl: './star-system.component.html',
  styleUrls: ['./star-system.component.css']
})
export class StarSystemComponent implements OnInit {

  
  stars = ['\u2606','\u2606','\u2606','\u2606','\u2606'];
  temp  = [];
  constructor() { }

  ngOnInit() {
  }

  onClick( i:number ){
    this.stars = ['\u2606','\u2606','\u2606','\u2606','\u2606'];
    for (let j=0; j < i+1; j++){
      this.stars[j] = '\u2605';
    }
    
  }
/*
  onMouseOver(i:number) {

    this.temp = JSON.parse(JSON.stringify( this.stars ));

    for (let j=0; j < i+1; j++){
      this.stars[j] = '\u2605';
    }
    console.log('onMouseOver temp '+this.temp);
    console.log('onMouseOver stars '+this.stars);
  }

  onMouseOut(i:number){
    this.stars = JSON.parse(JSON.stringify( this.temp ));
    console.log('onMouseOut temp '+this.temp);
    console.log('onMouseOut stars '+this.stars);
  }
  */

}
