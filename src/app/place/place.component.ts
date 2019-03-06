import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  placeId:string;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router,) { 

  }

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get("placeId");
  }

}
