import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { CategoriaService } from '../../services/categoria.service' 
import { Categoria } from '../../services/categoria';

import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas"
/**
 * Generated class for the EstadisticaStockPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-estadistica-stock',
  templateUrl: 'estadistica-stock.html',
})
export class EstadisticaStockPage {

  listacategoria:Categoria[]=new Array();
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(public servicio:CategoriaService,public navCtrl: NavController, public navParams: NavParams) {
  }
  download() {
    
            var myImage = new Image();
         // var img = canvas.toDataURL('image/jpeg', 1.0)
         myImage.src = 'assets/images/logosociedad.png';
          var doc = new jsPDF();
          doc.setFillColor(255,196,13);
           doc.rect(50, 0,255, 39,'F');
           doc.rect(10, 100, 60, 10,'F');
           doc.rect(60, 100, 50 , 10,'F');
           doc.rect(110, 100, 40 , 10,'F');
    
           for(var y=1;y<=this.listacategoria.length;y++)
            {
              var multi=(10*y);
            
    
              doc.setFillColor(252,244,182);
              doc.rect(10, 100+multi, 60, 10,'F');
              doc.rect(60, 100+multi, 50, 10,'F');
              doc.rect(110, 100+multi, 40, 10,'F');
            
            }
            for(var y=1;y<=this.listacategoria.length;y++)
              {
              
                var multi=(10*y);
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.text(12,108+multi,this.listacategoria[y-1].nombre.toString());
      
                doc.setFontSize(12);
                doc.setTextColor(0,0, 0);
                doc.text(62,108+multi,this.listacategoria[y-1].totalcero.toString());
    
                doc.setFontSize(12);
                doc.setTextColor(0,0, 0);
                doc.text(112,108+multi,this.listacategoria[y-1].totalmedio.toString());
              
              }
      
    
    
    
              // doc.addImage(img,"jpeg", 10, 10, 180, 280);
               
             
              doc.addImage(myImage , 'png', 5, 5, 40, 30);
              doc.setTextColor(255, 255, 255);
              doc.text(120, 20, 'REPORTE STOCK FALTANTE');
    
              doc.setFontSize(12);
              doc.setTextColor(255, 255, 255);
              doc.text(12,108,'CATEGORIA');
              
        
              doc.setFontSize(12);
              doc.setTextColor(255, 255, 255);
              doc.text(62,108,'STOCK FALTANTE');
    
    
              doc.setFontSize(12);
              doc.setTextColor(255, 255, 255);
              doc.text(112,108,'STOCK MEDIO');
    
    
               doc.save('Test.pdf');
          
    
    
       }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticaStockPage');

    this.servicio.getCategoriasxStock().subscribe(
      rs=>this.listacategoria=rs,
      er=>console.log('error'),
      ()=>
      {console.log('ok');
   
      console.log(this.listacategoria);
      console.log(this.recorrerVector(this.listacategoria));

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




}
