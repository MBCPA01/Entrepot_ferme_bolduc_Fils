import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { FirebaseRequestProvider } from '../../providers/firebase-request/firebase-request';

import 'rxjs/add/operator/take';


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
   [x: string]: any;
   @ViewChild('pieChart') pieChart: { nativeElement: any; };
   @ViewChild('barChart') barChart: { nativeElement: any; };
   @ViewChild('lineChart') lineChart: { nativeElement: any; };

   indexFromTabs: number = 0;
   itemPage: string = "";
   prevPage: string = "";
   description:string;

   joursSemaine = [
      { value: 0, name: 'Lundi' },
      { value: 1, name: 'Mardi' },
      { value: 2, name: 'Mercredi' },
      { value: 3, name: 'Jeudi' },
      { value: 4, name: 'Vendredi' },
      { value: 5, name: 'Samedi' },
      { value: 6, name: 'Dimanche' },
   ];

   public composantesGraphiques: any = {
      "objets" : [
         {
            'jourSemaine' : 'Lundi',
            'valeur'      : 5,
            'couleur'     : 'rgba(255, 0, 0, 0.5)',
            'hover'       : 'rgba(125, 125, 125, 0.5)'
         },
         {
            'jourSemaine' : 'Mardi',
            'valeur'      : 15,
            'couleur'     : 'rgba(0, 255, 0, 0.5)',
            'hover'       : 'rgba(125, 125, 125, 0.5)'
         },
         {
            'jourSemaine' : 'Mercredi',
            'valeur'      : 10,
            'couleur'     : 'rgba(0, 0, 255, 0.5)',
            'hover'       : 'rgba(125, 125, 125, 0.5)'
         },
         {
            'jourSemaine' : 'Jeudi',
            'valeur'      : 5,
            'couleur'     : 'rgba(200, 125, 125, 0.5)',
            'hover'       : 'rgba(125, 125, 125, 0.5)'
         },
         {
            'jourSemaine' : 'Vendredi',
            'valeur'      : 10,
            'couleur'     : 'rgba(125, 200, 125, 0.5)',
            'hover'       : 'rgba(125, 125, 125, 0.5)',
         },
         {
            'jourSemaine' : 'Samedi',
            'valeur'      : 10,
            'couleur'     : 'rgba(125, 125, 200, 0.5)',
            'hover'       : 'rgba(125, 125, 125, 0.5)'
         },
         {
            'jourSemaine' : 'Dimanche',
            'valeur'      : 10,
            'couleur'     : 'rgba(125, 200, 200, 0.5)',
            'hover'       : 'rgba(125, 125, 125, 0.5)'
         }
      ]
   };

   public pieChartEl: any;
   public barChartEl: any;
   public lineChartEl: any;
   public chartLabels: any = [];
   public chartValues: any = [];
   public chartColours: any = [];
   public chartHoverColours: any = [];
   chartLoading: any;
   item: any;
   public items: any = [];
   ref: any;

   constructor( public navCtrl: NavController,public navParams: NavParams, private myDb : FirebaseRequestProvider){ 
      let data = navParams.get('idexParam');
      if(data != null){
       this.indexFromTabs = navParams.get('idexParam');
       this.itemPage = navParams.get('PageItem');
       this.prevPage = navParams.get('PrevPage');
      }
   }

   ionViewDidLoad()
   {
      this.defineChartData();
      this.createPieChart();
      this.createBarChart();
      this.createLineChart();

      this.ref = this.myDb.get('test').subscribe(result => {
         console.log('on db change');
         this.chartValues = [];
         this.chartLabels = [];
         this.chartColours = [];
         this.chartHoverColours = [];
         this.items = [];

         this.barChartEl.data.datasets.forEach((dataset) => {
            dataset.data = [];
         });

         this.pieChartEl.data.datasets.forEach((dataset) => {
            dataset.data = [];
         });

         this.lineChartEl.data.datasets.forEach((dataset) => {
            dataset.data = [];
         });

         for (let i=0; i<Object.keys(this.joursSemaine).length; i++) {
            this.myDb.getObj('test/days/'+i+'/temp').subscribe(snapshot => {
            this.handleUserData(+snapshot,i);
            //this.chartValues.push(this.items[i]);
            });
         }

         this.modifyAllChart();
         this.updateAllCharts();
      })
   }

   handleUserData(snapshot: number,index: number ) {
      this.composantesGraphiques.objets[index].valeur = snapshot;
   }

   modifyAllChart(){
      this.barChartEl.data.datasets.forEach((dataset) => {
         for (let i in this.composantesGraphiques.objets) {
            dataset.data.push(this.composantesGraphiques.objets[i].valeur);
         }
      });
      this.pieChartEl.data.datasets.forEach((dataset) => {
         for (let i in this.composantesGraphiques.objets) {
            dataset.data.push(this.composantesGraphiques.objets[i].valeur);
         }
      });
      this.lineChartEl.data.datasets.forEach((dataset) => {
         for (let i in this.composantesGraphiques.objets) {
            dataset.data.push(this.composantesGraphiques.objets[i].valeur);
         }
      });
   }

   updateAllCharts(){
      this.barChartEl.update();
      this.lineChartEl.update();
      this.pieChartEl.update();
   }


   /**
      *
      * Parse the JSON data, push specific keys into selected arrays for use with
      * each chart
      *
   */
   defineChartData()
   {
      
      console.log('in push value');
      let k : any;

      for(k in this.composantesGraphiques.objets)
      {
         var tech = this.composantesGraphiques.objets[k];
         this.chartLabels.push(tech.jourSemaine);
         this.chartValues.push(tech.valeur);
         this.chartColours.push(tech.couleur);
         this.chartHoverColours.push(tech.hover);
   
      }
   }

   /**
      *
      * Configure the Pie chart, define configuration options
      *
   */
   createPieChart()
   {

      this.pieChartEl= new Chart(this.pieChart.nativeElement,
      {
         type: 'pie',
         data: {
               labels: this.chartLabels,
               datasets: [{
                  label                 : 'donnees temperature sur semaine',
                  data                  : this.chartValues,
                  duration              : 2000,
                  easing                : 'easeInQuart',
                  backgroundColor       : this.chartColours,
                  hoverBackgroundColor  : this.chartHoverColours
               }]
         },
         options : {
            maintainAspectRatio: false,
            layout: {
               padding: {
                  left     : 50,
                  right    : 0,
                  top      : 0,
                  bottom   : 0
               }
            },
            animation: {
               duration : 5000
            }
         }
      });

      this.chartLoading = this.pieChartEl.generateLegend();
   }

   /**
      *
      * Configure the Bar chart, define configuration options
      *
   */
   createBarChart()
   {
      this.barChartEl = new Chart(this.barChart.nativeElement,
      {
         type: 'bar',
         data: {
            labels: this.chartLabels,
               datasets: [{
                  label                 : 'Donnees temperature sur semaine',
                  data                  : this.chartValues,
                  duration              : 2000,
                  easing                : 'easeInQuart',
                  backgroundColor       : this.chartColours,
                  hoverBackgroundColor  : this.chartHoverColours
               }]
         },
         options: {
            legend: {
               display : true,
               boxWidth: 80,
               fontSize: 15,
               padding : 0
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
         },}
      });
   }

   /**
      *
      * Configure the Line chart, define configuration options
      *
   */
   createLineChart()
   {
      this.lineChartEl = new Chart(this.lineChart.nativeElement,
      {
         type: 'line',
         data: {
            labels: this.chartLabels,
               datasets: [{
                  label                 : 'donnees temperature sur semaine',
                  data                  : this.chartValues,
                  duration              : 2000,
                  easing                : 'easeInQuart',
                  backgroundColor       : this.chartColours,
                  hoverBackgroundColor  : this.chartHoverColours,
                  fill 				       : false
               }]
         },
         options : {
            maintainAspectRatio: false,
            legend: {
               display     : true,
               boxWidth    : 80,
               fontSize    : 15,
               padding     : 0
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
            },
            scales: {
                  yAxes: [{
                     ticks: {
                     callback: function (value, index, values) {
                        return value + '°C';
                     },
                     suggestedMin: 0
                     }
                  }],
                  xAxes: [{
                     ticks: {
                        autoSkip: false
                     }
                  }]
            }
         }
      });
   }
}
