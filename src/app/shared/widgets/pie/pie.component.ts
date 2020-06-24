import { getSentiment } from './../../../global-query';
import { DashboardService } from './../../../modules/dashboard.service';
import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  Highcharts = Highcharts;
  Tweets: Array<any> = [];
  data:Array<any> = [];
  updateFlag=false;
  da=[];
  pos=0;
  neg=0;
  neu=0;
  total=0;
  chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'COVID 19 Sentiment Analytics'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    exporting:{
      enabled: true,
    },
    credits:{
      enabled: false,
    },
    series: [{
        name: 'Tweets',
        colorByPoint: true,
        data: this.da
    }]
};
  /***@Input() data = [];*/
  constructor(private dashboardService:DashboardService ) {}

  ngOnInit(): void {
    

  
  this.loadDataSentiment();
  /**
   *   console.log(this.da);
       console.log(this.pos);
   */

  
  
    HC_exporting(Highcharts); 

  setTimeout(() =>{
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
  }

  loadDataSentiment() 
  {  
    this.dashboardService.getSentiment().valueChanges.pipe(map((result:any) => result.data)).subscribe((data)=>
    {
      this.Tweets=data.users;
      this.Tweets.forEach(element =>
        { /**console.log(parseInt(element.sentiment));*/
          if (parseInt(element.sentiment)==1 ) {
          this.pos+=1;
          this.total+=1;
        } 
         if (parseInt(element.sentiment)==0 ) {
           this.neu+=1;
           this.total+=1;

         } else {
            this.neg+=1;
            this.total+=1;           
         }
                                   
             });
               
          this.chartOptions;
          this.updateFlag = true;
          this.da.push(["Positive",(this.pos/this.total)*100]);
          this.da.push(["Negative",(this.neg/this.total)*100]);
          this.da.push(["Neutre",(this.neu/this.total)*100]);               
        });
 

  }




}
