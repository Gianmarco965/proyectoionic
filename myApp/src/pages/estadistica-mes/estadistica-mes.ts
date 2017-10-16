import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { MesClase } from '../../services/mes';
import { CategoriaService } from '../../services/categoria.service' 

import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas"
/**
 * Generated class for the EstadisticaMesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-estadistica-mes',
  templateUrl: 'estadistica-mes.html',
})
export class EstadisticaMesPage {
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  listames:MesClase[]=new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams,public servicio:CategoriaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticaMesPage');
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

  download() {
    
            var myImage = new Image();
         // var img = canvas.toDataURL('image/jpeg', 1.0)
         myImage.src = 'assets/images/logosociedad.png';
          var doc = new jsPDF();
          doc.setFillColor(255,196,13);
           doc.rect(50, 0,255, 39,'F');
           doc.rect(10, 100, 60, 10,'F');
           doc.rect(60, 100, 50 , 10,'F');
   
    
           for(var y=1;y<=this.listames.length;y++)
            {
              var multi=(10*y);
            
    
              doc.setFillColor(252,244,182);
              doc.rect(10, 100+multi, 60, 10,'F');
              doc.rect(60, 100+multi, 50, 10,'F');
              
            
            }
            for(var y=1;y<=this.listames.length;y++)
              {
              
                var multi=(10*y);
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.text(12,108+multi,this.listames[y-1].mes.toString());
      
                doc.setFontSize(12);
                doc.setTextColor(0,0, 0);
                doc.text(62,108+multi,this.listames[y-1].cantidad.toString());
    
             
              
              }
      
    
    
    
              // doc.addImage(img,"jpeg", 10, 10, 180, 280);
               
             
              doc.addImage(myImage , 'png', 5, 5, 40, 30);
              doc.setTextColor(255, 255, 255);
              doc.text(120, 20, 'REPORTE DE PEDIDOS POR MES');
    
              doc.setFontSize(12);
              doc.setTextColor(255, 255, 255);
              doc.text(12,108,'MES');
              
        
              doc.setFontSize(12);
              doc.setTextColor(255, 255, 255);
              doc.text(62,108,'PEDIDOS');
    
    
            
    
    
               doc.save('Test.pdf');
          
    
    
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

  onClick()
  {


  }

}
