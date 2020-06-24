import { getSentiment } from './../global-query';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../global-query'
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private apollo:Apollo) { }

  getTasks() {
    
    return this.apollo.watchQuery({ query: Query.getAllTasks }) ;
      
  }


  getSentiment() {
    
    return this.apollo.watchQuery({ query: Query.getSentiment }) ;
      
  }

  getSentiment1() {
    
    return this.apollo.watchQuery({ query: Query.getSentiment1 }) ;
      
  }

  getHashtags(){
    return this.apollo.watchQuery({query :Query.getHashtags});
  }
  /**
   *  bigChart(){
    return [{
      name: 'Asia',
      data: [502,635, 809, 947, 1402, 3634, 5268]
    },{
      name: 'Africa',
      data: [106, 107, 111, 113, 221, 767, 1766]
    },{
      name: 'Asia',
      data: [163, 203, 276, 408, 547, 729, 628]
    },{
      name: 'Asia',
      data: [18, 31, 54, 156, 339, 818, 1201]
    },{
      name: 'Asia',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }
   */
 

  cards(){
    return [71, 78, 39, 66];
  }

  pieChart(){
    return  [{
        name: 'Chrome',
        y: 61.41,
        sliced: false,
        selected:false
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }];
    }

}
