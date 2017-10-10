import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { CategoriaService } from '../../services/categoria.service' 
import { Categoria } from '../../services/categoria';
import { MesClase } from '../../services/mes';
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas"
/**
 * Generated class for the EstadisticaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-estadistica',
  templateUrl: 'estadistica.html',
})
export class EstadisticaPage {
   

  listacategoria:Categoria[]=new Array();
  listames:MesClase[]=new Array();

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;
      barChart: any;
  
     doughnutChart: any;
     lineChart: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public servicio:CategoriaService) {
    
   
    
    
     
  }


  ionViewDidLoad() {
    this.servicio.getCategoriasxStock().subscribe(
        rs=>this.listacategoria=rs,
        er=>console.log('error'),
        ()=>
        {console.log('ok');
     
        console.log(this.listacategoria);
        console.log(this.recorrerVector(this.listacategoria));

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            
                        type: 'doughnut',
                        data: {
                            labels:this.recorrerVectorNombre(this.listacategoria),
                            datasets: [{
                                label: '# of Votes',
                                data: this.recorrerVector(this.listacategoria),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                hoverBackgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56",
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56"
                                ]
                            }]
                        }
            
                    });

                   
                                this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                                    
                                                type: 'line',
                                                data: {
                                                    labels: this.recorrerVectorNombre(this.listacategoria),
                                                    datasets: [
                                                        {
                                                            label: "Productos Faltantes",
                                                            fill: false,
                                                            lineTension: 0.1,
                                                            backgroundColor: "rgba(75,192,192,0.4)",
                                                            borderColor: "rgba(75,192,192,1)",
                                                            borderCapStyle: 'butt',
                                                            borderDash: [],
                                                            borderDashOffset: 0.0,
                                                            borderJoinStyle: 'miter',
                                                            pointBorderColor: "rgba(75,192,192,1)",
                                                            pointBackgroundColor: "#fff",
                                                            pointBorderWidth: 1,
                                                            pointHoverRadius: 5,
                                                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                                            pointHoverBorderColor: "rgba(220,220,220,1)",
                                                            pointHoverBorderWidth: 2,
                                                            pointRadius: 1,
                                                            pointHitRadius: 10,
                                                            data: this.recorrerVector(this.listacategoria),
                                                            spanGaps: false,
                                                        }
                                                    ]
                                                }
                                    
                                            });





        }
    
    )


    this.servicio.getCategoriaMes().subscribe(
        rs=>this.listames=rs,
        er=>console.log('error'),
        ()=>{

            this.barChart = new Chart(this.barCanvas.nativeElement, {
                
                            type: 'bar',
                            data: {
                                labels: this.recorrerVectorMesNombre(this.listames),
                                datasets: [{
                                    label: '# de Pedidos',
                                    data: this.recorrerVectorDeudaCantidad(this.listames),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255,99,132,1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero:true
                                        }
                                    }]
                                }
                            }
                
                        });
        }
    )



    
}


   recorrerVector(listacategoria)
   {
    var i:number;
    let vectora:number[]=new Array();
    for (i=0;i<listacategoria.length;i++)
      {
            vectora[i]=listacategoria[i].totalcero;
           
            console.log(vectora[i]);
      }
     
      return vectora;
   }

   recorrerVectorNombre(listacategoria)
   {
    var i:number;
    let vectornombre:String[]=new Array();
    let vectorcadena:String[]=new Array();
    let cadena:String;
    for (i=0;i<listacategoria.length;i++)
      {
            cadena=listacategoria[i].nombre;
            vectorcadena=cadena.split(" ");
            cadena=vectorcadena[0];
            vectornombre[i]=cadena
            
          
      } 
      console.log(vectornombre);
      return vectornombre;  
   }

   recorrerVectorMesNombre(listames)
   {
    var i:number;
    let vectornombre:String[]=new Array();
    let vectorcadena:String[]=new Array();
    let cadena:String;
    for (i=0;i<listames.length;i++)
      {
            cadena=listames[i].mes;
            vectorcadena=cadena.split(" ");
            cadena=vectorcadena[0];
            vectornombre[i]=cadena
            
          
      } 
      console.log(vectornombre);
      return vectornombre;  
   }


   recorrerVectorDeudaCantidad(listames)
   {
    var i:number;
    let vectornombre:number[]=new Array();
  
    for (i=0;i<listames.length;i++)
      {
           
            vectornombre[i]=listames[i].cantidad;
            
          
      } 
      console.log(vectornombre);
      return vectornombre;  
   }
   
  
   download() {
    html2canvas(document.body, {
        onrendered: function(canvas) {
        var img = canvas.toDataURL('image/jpg', 1.0)
        
        var doc = new jsPDF();
        
         
             doc.text(20, 20, 'Estadisticas Generales!');
             doc.addImage(img,"jpg", 10, 10, 180, 280);
             
             doc.save('Test.pdf');
        

     }
    });
    
           

           
    
            
        }


}
