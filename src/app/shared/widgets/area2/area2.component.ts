import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-area2',
  templateUrl: './area2.component.html',
  styleUrls: ['./area2.component.css']
})
export class Area2Component implements OnInit {
  Highcharts = Highcharts; // required    
  updateFlag: boolean = false; // optional boolean 
  alldate=[];
  date=[];
  da = [];
  SeriesData = []; 
  Likes=[];
  Retweets=[];
  Replies=[];
  reversedate=[];
  Tweets: Array<any> = [];
  a: number;
  chartOptions= {chart: 
    {
    type: 'column'
    },
  title: {
    text: ''
    },
  subtitle: {
    text: ' '
  },
  xAxis: {
    categories: [
      'US',
      'UK',
      'FR'
     
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Numbers'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: []
  
  };

  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
  this.loadData2();
  
  
  }


  
  loadData2() 
  {  
    this.dashboardService.getHashtags().valueChanges.pipe(map((result:any) => result.data)).subscribe((data)=>
    {
      var uktable=[];
      var ustable=[];
      var frtable=[];
      var ukdate=[];
      var usdate=[];
      var frdate=[];        
      var uklikes=0,uslikes=0,frlikes=0,ukretweets=0,frretweets=0,usretweets=0,usreplies=0,frreplies=0,ukreplies=0 ;
      this.Tweets=data.Hashtags;
      this.Tweets.forEach(element =>
        { 
          
          if (element.Country=="UK") {
            if (isNaN(parseInt(element.numberOfLikes))){uklikes+=0; }else{ 
              uklikes+=parseInt(element.numberOfLikes);
            } 
            if (isNaN(parseInt(element.noOfReplies))){ukreplies+=0; }else{ 
              ukreplies+=parseInt(element.noOfReplies);
            }  
            if (isNaN(parseInt(element.noOfRetweets))){ukretweets+=0; }else{ 
              ukretweets+=parseInt(element.noOfRetweets);
            } 
              
              
            }
              
              if (element.Country=="US" ) {
                if (isNaN(parseInt(element.numberOfLikes))){uslikes+=0; }else{ 
                  uslikes+=parseInt(element.numberOfLikes);
                }  
                
                if (isNaN(parseInt(element.noOfReplies))){usreplies+=0; }else{ 
                  usreplies+=parseInt(element.noOfReplies);
                }
                
                if (isNaN(parseInt(element.noOfRetweets))){usretweets+=0; }else{ 
                  usretweets+=parseInt(element.noOfRetweets);
                }
                
                

                }
                if (element.Country=="FR") {
                  if (isNaN(parseInt(element.numberOfLikes))){frlikes+=0; }else{ 
                    frlikes+=parseInt(element.numberOfLikes);
                    console.log("A")
                  }
                  if (isNaN(parseInt(element.noOfReplies))){frreplies+=0; }else{ 
                    frreplies+=parseInt(element.noOfReplies);
                  }
                  
                  if (isNaN(parseInt(element.noOfRetweets))){frretweets+=0; }else{ 
                    frretweets+=parseInt(element.noOfRetweets);
                  }
                  
                 
                  
                  }   
           /**this.da=[]; */                         
             }); 
           /**console.log(uslikes);
           console.log(uklikes);
           console.log(frlikes);*/
           this.Likes.push(uslikes,uklikes,frlikes);
           this.Retweets.push(usretweets,ukretweets,frretweets);
           this.Replies.push(usreplies,ukreplies,frreplies);  
           
           this.SeriesData.push({
              name:'Likes',
              data: this.Likes});
              this.SeriesData.push({
                name:'Retweets',
                data: this.Retweets});
                this.SeriesData.push({
                  name:'Replies' ,
                  data: this.Replies});   
          
          this.chartOptions;
          this.updateFlag = true;
          this.chartOptions.series=this.SeriesData;          
                  

        });
 

  }


}
