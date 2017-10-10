import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeudaService } from '../../services/deuda.service';
import { Pedido } from '../../services/pedido';
import { AlertController } from 'ionic-angular';
import { DetalleDeudaSalesPage } from '../../pages/detalle-deuda-sales-page/detalle-deuda-sales-page';

/**
 * Generated class for the DeudaSalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-deuda-sales-page',
  templateUrl: 'deuda-sales-page.html',
})
export class DeudaSalesPage {
  
  filtro:string;
  campo:string;
  listadeudahoy:Pedido[];
  seleccionado:string;
  selectindice:string;
  tipodato:string='text';
  maximo:number=8;
  idcliente:number;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
    private alertCtrl: AlertController,
  public deudaservicio:DeudaService) 
  {
     this.seleccionado="buscar";
     this.selectindice="hoy";
     this.filtro="hoy";
     this.campo="fechasistema";
     this.cargarDatos("fechasistema","CURDATE()");
  }

  onClick(item,campito)
  {

    console.log(item);
    console.log(campito);

    if (campito=="fechasistema")
      {
        this.navCtrl.push(DetalleDeudaSalesPage,{
          idpedido:item.iddeuda,cantcuota:item.cantcuota,
          idcliente:item.idcliente
        });
      }


    }


  buscarFiltro()
  {

      if (this.selectindice=="dni")
      {
        
        this.maximo=8;
        this.tipodato="number";
        this.alertaCliente("u.usuario");
       
      }
      else if (this.selectindice=="nombre")
      {
        
        this.maximo=50;
        this.tipodato="text";
        this.alertaCliente("c.nombre");
        
      }

      else if (this.selectindice=="ayer")
      {
        this.campo="fechasistema";
        this.cargarDatos("fechasistema","ayer");
      }
      else if (this.selectindice=="hoy")
      {
        this.campo="fechasistema";
        this.cargarDatos("fechasistema","CURDATE()");

      }
      else if (this.selectindice=="semana")
      {
        this.campo="fechasistema";
        this.cargarDatos("fechasistema","semana");
      }
      else if (this.selectindice=="semana_anterior")
      {
        this.campo="fechasistema";
        this.cargarDatos("fechasistema","semana_anterior");
      }


  }

  cargarDatos(campo:string,valor:string)
  {
    
       this.deudaservicio.getDeudas(campo,valor).subscribe(
        rs=>this.listadeudahoy=rs,
        er=>console.log(er),
        ()=>console.log(this.listadeudahoy)
      );

  }

establecerCambio(selectedValue: any) 
{
  this.selectindice=selectedValue;
}

cambiarModo()
{
  this.seleccionado="agregar";

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeudaSalesPage');
  }

alertaCliente(campovalor:string)
{
    let alert = this.alertCtrl.create({
    title: 'Dato',
    inputs: [
      {
        name: 'dato',
        placeholder: this.selectindice,
        type:this.tipodato,
        min:1,
        max:this.maximo
      
      }
     
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
         console.log("xd");
         var cadena:string='';
         cadena=data.dato;
          this.campo=campovalor;
          this.cargarDatos(campovalor,cadena);
        }
      }
    ]
  });
  alert.present();

}

}
