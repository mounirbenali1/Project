import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  providers: [ DashboardService ]

})
export class AreaComponent implements OnInit {
  Highcharts = Highcharts; // required    
  updateFlag: boolean = false; // optional boolean  
  alldate=[];
  date=[];
  da = [];
  SeriesData = []; 
  UkNumbers=[];
  UsNumbers=[];
  FrNumbers=[];
  reversedate=[];
  Tweets: Array<any> = [];

  
   chartOptions= {chart: {
    type: 'area'
  },
  title: {
    text: 'Likes ,Retweets, replies for trending Hashtags  '
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    categories:[],
    tickmarkPlacement: 'on',
    title: {
      enabled: false
    }
  },
 
  tooltip: {
    split: true,
    valueSuffix: 'Retweets and replies'
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: '#666666'
      }
    }
  },
  series: []

      
      };

  

  constructor(private dashboardService: DashboardService) { }


  ngOnInit() 
    {
        
      this.loadData();
      /**console.log(this.SeriesData);
      console.log(this.da);*/ 
    }
   
   
     loadData() 
    {  
      this.dashboardService.getHashtags().valueChanges.pipe(map((result:any) => result.data)).subscribe((data)=>
      {
        var uktable=[];
        var ustable=[];
        var frtable=[];
        var ukdate=[];
        var usdate=[];
        var frdate=[];        
        var uk,us,fr ;
        this.Tweets=data.Hashtags;
        this.Tweets.forEach(element =>
          { this.alldate.push(element.tweetTime); 
                         
            if (element.Country=="UK") {
                
              if (isNaN(parseInt(element.numberOfLikes))){var aa =0; }else{ 
                var aa=parseInt(element.numberOfLikes);
              } 
              if (isNaN(parseInt(element.noOfReplies))){var bb =0; }else{ 
                var bb=parseInt(element.noOfReplies);
              }  
              if (isNaN(parseInt(element.noOfRetweets))){var cc =0; }else{ 
                var cc=parseInt(element.noOfRetweets);
              } 
              
              
                uk=aa+bb+cc;
                uktable.push(uk);
                ukdate.push(element.tweetTime);
                }
                if (element.Country=="US" ) {
                  if (isNaN(parseInt(element.numberOfLikes))){var aa=0; }else{ 
                    var aa=parseInt(element.numberOfLikes);
                  } 
                  if (isNaN(parseInt(element.noOfReplies))){var bb=0; }else{ 
                    var bb=parseInt(element.noOfReplies);
                  }  
                  if (isNaN(parseInt(element.noOfRetweets))){var cc=0; }else{ 
                    var cc=parseInt(element.noOfRetweets);
                  } 


                  us=aa+bb+cc;
                  ustable.push(us);
                  usdate.push(element.tweetTime);

                  }
                  if (element.Country=="FR") {
                    if (isNaN(parseInt(element.numberOfLikes))){var aa=0; }else{ 
                      var aa=parseInt(element.numberOfLikes);
                    } 
                    if (isNaN(parseInt(element.noOfReplies))){var bb=0; }else{ 
                      var bb=parseInt(element.noOfReplies);
                    }  
                    if (isNaN(parseInt(element.noOfRetweets))){var cc=0; }else{ 
                      var cc=parseInt(element.noOfRetweets);
                    } 

                    fr=aa+bb+cc;
                    frtable.push(fr);
                    frdate.push(element.tweetTime);

                    }   
                                     
               }); 
            var n=0;
            this.reversedate = [...new Set(this.alldate)]
            this.reversedate.sort().reverse();
            console.log(ustable);
            console.log(usdate);

            for (let i = 0; i < this.reversedate.length; i++) {
                const element = this.reversedate[i];
                
                for (let j = 0; j< ukdate.length; j++) {
                  const element = ukdate[j];
                 /**console.log(ukdate[j]);*/
                  if (this.reversedate[i]==ukdate[j]) {
                    
                    
                    n+=uktable[ukdate.indexOf(ukdate[j])];
                    
                 }
                }

                this.UkNumbers.push(n);
                n=0;
                for (let j = 0; j< usdate.length; j++) {
                  const element = usdate[j];
                 if (this.reversedate[i]==usdate[j]) {
                   n+=ustable[ukdate.indexOf(usdate[j])]; 
                 }
                 
                 
                }
                this.UsNumbers.push(n);
                n=0;

                for (let j = 0; j< frdate.length; j++) {
                  const element = frdate[j];
                 if (this.reversedate[i]==ukdate[j]) {
                   n+=frtable[frdate.indexOf(frdate[j])]; 
                 }
                 
                }
                this.FrNumbers.push(n);
                 n=0;  

              }
              console.log(this.reversedate);
              console.log(this.UkNumbers);
              console.log(this.UsNumbers);
              console.log(this.FrNumbers);
            
               
            this.SeriesData.push({
                name:'UK',
                data: this.UkNumbers});
                this.SeriesData.push({
                  name:'US',
                  data: this.UsNumbers});
                  this.SeriesData.push({
                    name:'FR' ,
                    data: this.FrNumbers});   
            /**const b =[...new Set(this.alldate)];*/ 
            this.date=this.alldate;
            console.log(this.SeriesData);
            this.chartOptions;
            this.updateFlag = true;
            this.chartOptions.xAxis.categories=this.reversedate;        
            this.updateFlag = true;
            this.chartOptions.series=this.SeriesData;
            
            /**this.chartOptions.xAxis.categories=this.reversedate;*/        
            
               
          });
   
  
    }

}
