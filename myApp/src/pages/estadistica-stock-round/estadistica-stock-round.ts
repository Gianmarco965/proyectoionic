import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { CategoriaService } from '../../services/categoria.service' 
import { Categoria } from '../../services/categoria';


import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas"
/**
 * Generated class for the EstadisticaStockRoundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-estadistica-stock-round',
  templateUrl: 'estadistica-stock-round.html',
})
export class EstadisticaStockRoundPage {
  listacategoria:Categoria[]=new Array();
  
    @ViewChild('doughnutCanvas') doughnutCanvas;
   
    
       doughnutChart: any;

  constructor( public servicio:CategoriaService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticaStockRoundPage');
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
