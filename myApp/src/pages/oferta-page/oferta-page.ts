import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OfertaService } from '../../services/oferta.service';
import { Inventario } from '../../services/inventario';
import { Utilitarios } from '../../services/utilitarios';
import {CatalogoDetallePage} from '../../pages/catalogo-detalle-page/catalogo-detalle-page';

/**
 * Generated class for the OfertaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-oferta-page',
  templateUrl: 'oferta-page.html',
})
export class OfertaPage {
  lista:Inventario[];
private enlace:Utilitarios=new Utilitarios();
private cadena:string=this.enlace.enlace;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,private servicio:OfertaService) {
    this.leerInventario();
  }

  leerInventario()
  {
       this.servicio.getInventarios()
      .subscribe(
        rs=>this.lista=rs,
        er=>console.log(er),
        ()=>console.log(this.lista)
      )
      
  }

  onClick(item)
  {
      this.navCtrl.push(CatalogoDetallePage,{
    idproducto:item.idproducto
    });
  }

}
