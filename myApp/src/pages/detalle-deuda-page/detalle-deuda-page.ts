import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utilitarios } from '../../services/utilitarios';
import { DetallePedidoService } from '../../services/detallepedido.service';
import { DetallePedido } from '../../services/DetallePedido';
import { CatalogoDetallePage } from '../../pages/catalogo-detalle-page/catalogo-detalle-page';
/**
 * Generated class for the DetalleDeudaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-deuda-page',
  templateUrl: 'detalle-deuda-page.html',
})
export class DetalleDeudaPage {
  private enlace:Utilitarios=new Utilitarios();
  private cadena:string=this.enlace.enlace;
  cantcuota:number;
  listacuota:number[]=new Array();
  cuota:number;
  desc=0;
  totdesc=0;
  idpedido:string;
  total_suma=0;
  suma=0;
  igv=0;
   txtdesc=0;
  subtotal=0;
  txtsubtotal:string;
  txtigv:string;
  detallepedido:DetallePedido[]=new Array();
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private servicio:DetallePedidoService) {
     
    this.idpedido= this.navParams.get('idpedido');
    this.cantcuota=this.navParams.get('cantcuota');
    console.log(this.navParams.get('idpedido'));
    this.cargarDetalle(this.idpedido);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleDeudaPage');
  }

 cargarDetalle(idpedido)
  {
    console.log(idpedido);
    console.log("paramtro"+this.servicio.getDetallePedidos(idpedido));
      this.servicio.getDetallePedidos(idpedido)
      .subscribe(
        rs=>this.detallepedido=rs,
        er=>console.log(er),
        ()=>{this.suma=this.getSuma(this.detallepedido)
          let x:number;  
          for(x=0;x<this.cantcuota;x++)
              {
                this.listacuota.push(x+1);
                console.log(this.listacuota);
              }
        }
      )


      

     
  }


  getSuma(detallepedido)
  {
 console.log(detallepedido);
    for(var j=0; j<detallepedido.length;j++) { 
        var betotal=(detallepedido[j].cantidad)*(detallepedido[j].precio);
        this.desc=(detallepedido[j].oferta/100)*betotal;
        this.total_suma+=(betotal)-(this.desc);
        this.totdesc+=this.desc;
  } 
  this.subtotal=this.total_suma/1.18;
  this.txtsubtotal=this.subtotal.toFixed(2);
  this.igv=this.subtotal*0.18;
  this.txtdesc=this.totdesc;
  this.txtigv=this.igv.toFixed(2);
  this.cuota=this.total_suma/this.cantcuota;
    return this.total_suma;
  }

  onClick(item)
  {
    console.log(item);
    this.navCtrl.push(CatalogoDetallePage,{
    idproducto:item.idproducto
    });

  }
}
