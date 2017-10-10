import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallePedidoService } from '../../services/detallepedido.service';
import { DeudaService } from '../../services/deuda.service';
import { DetallePedido } from '../../services/DetallePedido';
import { Utilitarios } from '../../services/utilitarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleCuotaService } from '../../services/detallecuota.service';
import { DetalleCuota } from '../../services/detallecuota';
import { DeudaSalesPage } from '../../pages/deuda-sales-page/deuda-sales-page';  

/**
 * Generated class for the DetalleDeudaSalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-deuda-sales-page',
  templateUrl: 'detalle-deuda-sales-page.html',
})
export class DetalleDeudaSalesPage {

private enlace:Utilitarios=new Utilitarios();
private cadena:string=this.enlace.enlace;
myForm: FormGroup;
  cuota:number;
  txtcuota:string;
  cantcuota:number;
  listacuota:number[]=new Array();
  listadetallecuota:DetalleCuota[] =new Array();
  idcontrol:string;
  idpedido:number;
  suma=0.00;
  total_suma=0.00;
  totdesc=0.00;
  desc=0.00;
  igv=0.00;
   txtdesc=0.00;
  subtotal=0.00;
  txtsubtotal:string;
  txtigv:string;
  idcliente:number;
  detallepedido:DetallePedido[]=new Array();
  constructor(public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private deudaservicio:DeudaService,
    private servicio:DetallePedidoService,
    private detallecuotaservicio:DetalleCuotaService  ) {
     
      this.idpedido=this.navParams.get('idpedido');
      this.cantcuota=this.navParams.get('cantcuota');
      this.idcliente=this.navParams.get('idcliente');
    this.cargarDetalle(this.idpedido);
    this.myForm = this.createMyForm();
  }


  

  private createMyForm(){
    return this.formBuilder.group({
      idcuota:[this.idpedido],
      idcliente: [this.idcliente],
      nrocuota: [''],
      eventocuota: ['PAGADO']
     
    });
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

          this.detallecuotaservicio.getdetallecuota(this.idpedido).subscribe(
            rs=>this.listadetallecuota=rs,
            er=>console.log('error'),
            ()=>console.log(this.listadetallecuota)
    
        )

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
        this.detallepedido[j].total=(betotal)-(this.desc);
        this.total_suma+=(betotal)-(this.desc);
        this.totdesc+=this.desc;
  } 
   this.subtotal=this.total_suma/1.18;
  this.txtsubtotal=this.subtotal.toFixed(2);
  this.igv=this.subtotal*0.18;
  this.txtdesc=this.totdesc;
  this.txtigv=this.igv.toFixed(2);
  this.cuota=this.total_suma/this.cantcuota;
  this.txtcuota=this.cuota.toFixed(2);

    return this.total_suma;
  }

  gotoPagar(nrocuota)
  {
      this.myForm.value.nrocuota=nrocuota;
      this.deudaservicio.addDeudaPay(this.myForm.value).subscribe(
        rs=>console.log(rs),
        er=>console.log('error'),
        ()=>{console.log('ok')

          
      }
      )
      
      this.navCtrl.push(DeudaSalesPage);
    
  }

}
