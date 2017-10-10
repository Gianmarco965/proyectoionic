import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../services/pedido';
import { DetalleDeudaPage } from '../../pages/detalle-deuda-page/detalle-deuda-page';


/**
 * Generated class for the DeudaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-deuda-page',
  templateUrl: 'deuda-page.html',
})
export class DeudaPage {
lista:Pedido[];
idusuario:string;
public seleccionado:number=1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private servicio:PedidoService) {
    this.leerInventario();
  }

   onSelectChange(selectedValue: any) {
    this.seleccionado=selectedValue;
  }

  leerInventario()
  {
      this.idusuario=localStorage.getItem('idusuario');
      let t={idestado:this.seleccionado,idusuario:this.idusuario};

       this.servicio.getPedido(t)
      .subscribe(
        rs=>this.lista=rs,
        er=>console.log(er),
        ()=>console.log(this.lista)
      )
  }

  onClick(item)
{
  console.log(item.iddeuda);
  this.navCtrl.push(DetalleDeudaPage,{
    idpedido:item.iddeuda,
    cantcuota:item.cantcuota
    });
  }

}
