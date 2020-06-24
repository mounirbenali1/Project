import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bigChart = [];
  cards = [];
  pieChart = []; 
  Tweets: Array<any> = [];

  
  
  constructor(private dashboardService: DashboardService) { 
  }

  ngOnInit() {
   /**this.bigChart = this.dashboardService.bigChart(); */
    this.cards = this.dashboardService.cards();
    /**this.pieChart = this.dashboardService.pieChart();*/
    /**this.dashboardService.getTasks().valueChanges.pipe(map((result:any) => result.data)
    ).subscribe((data)=>{
      this.Tweets=data.users;
      this.Tweets.forEach(element =>{
        this.pieChart.push({
          name: element.username ,
          data: parseInt(element.noOfReplies)
                                  });
      }); 
       
    });*/
    /**console.log(this.pieChart);*/ 
  
  /**
   * counter(i: number) {
    return new Array(i);
   *  */
}
}