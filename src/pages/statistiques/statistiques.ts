import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Chart } from 'chart.js';
import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request';

import 'rxjs/add/operator/take';
import { empty } from 'rxjs';
/**
 * Generated class for the StatistiquesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistiques',
  templateUrl: 'statistiques.html',
})
export class StatistiquesPage {
  data: Observable<any[]>;
  dataObj: any;
  ref: any;

  indexFromTabs: number = 0;
  itemPage: string = "";
  prevPage: string = "";
  description:string;

  items: Array<number>;
  item: any;


  days = [
    { value: 0, name: 'Lundi' },
    { value: 1, name: 'Mardi' },
    { value: 2, name: 'Mercredi' },
    { value: 3, name: 'Jeudi' },
    { value: 4, name: 'Vendredi' },
    { value: 5, name: 'Samedi' },
    { value: 6, name: 'Dimanche' },
  ];

  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;

  chartData = null

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private toastCtrl: ToastController, private myDb : FirebaseRequestProvider) {
    this.dataObj = null;
    this.item = '';
    this.items = [];
    let data = navParams.get('idexParam');
  	if(data != null){
      this.indexFromTabs = navParams.get('idexParam');
      this.itemPage = navParams.get('PageItem');
      this.prevPage = navParams.get('PrevPage');
    }
    
  }

  ionViewDidLoad() {
    // Reference to our Firebase List
    this.ref = this.db.list('test');

    // Catch any update to draw the Chart
    this.ref.valueChanges().subscribe(result => {
      if (this.chartData) {
        this.updateCharts(result)
      } else {
        this.createCharts(result)
      }
    })
  }

  getReportValues() {
    let reportBydays = {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null
     };
    
    for (let i=0; i<Object.keys(reportBydays).length; i++) {
      this.myDb.getObj('test/days/'+i+'/temp').subscribe(snapshot => {
        this.handleUserData(snapshot);
        this.items[i] = this.item;        
      });
    }
    console.log(this.items[0].value);
      
    return Object.keys(reportBydays).map(a => reportBydays[a]);
  }

  handleUserData(snapshot) {
    this.item = snapshot;    
  }

  createCharts(data) {
    this.chartData = data;

    // Calculate Values for the Chart
    let chartData = this.getReportValues();

    // Create the chart
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(this.days).map(a => this.days[a].name),
        datasets: [{
          data: [0, 1, 2, 3, 4, 5, 6],
          backgroundColor: '#32db64'
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItems, data) {
              return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + '°C';
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return value + '°C';
              },
              suggestedMin: 0
            }
          }]
        },
      }
    });
  }

  updateCharts(data) {
    this.chartData = data;
    let chartData = this.getReportValues();

    // Update our dataset
    this.valueBarsChart.data.datasets.forEach((dataset) => {
      dataset.data = chartData
    });
    this.valueBarsChart.update();
  }

}
