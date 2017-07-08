import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav-panel',
  templateUrl: './top-nav-panel.component.html',
  styleUrls: ['./top-nav-panel.component.css']
})
export class TopNavPanelComponent implements OnInit {

  constructor() { }

	selectedRoute: string;

  ngOnInit() {
  	this.selectedRoute="Home";
  }

  changeRoute(newRoute:string){
  	this.selectedRoute=newRoute;
  }
}
