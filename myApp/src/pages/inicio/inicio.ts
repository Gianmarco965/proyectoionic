import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CatalogoPage } from '../catalogo-page/catalogo-page';
import { DeudaPage } from '../deuda-page/deuda-page';
import { Acerca } from '../acerca/acerca';
import { CategoriaPage } from '../categoria-page/categoria-page';
import { WishPage } from '../wish-page/wish-page';
import { CartPage } from '../cart-page/cart-page';
import { Inventario } from '../../services/inventario';
import { CartService } from '../../services/cart-service';
import { HeartService } from '../../services/heart-service'; 
import { Deseo } from '../../services/deseo';
import { DeseoService } from '../../services/deseo.service';

/**
 * Generated class for the Inicio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class Inicio {

listacart:Inventario[]=new Array();
longcart:number=0;
longdeseo:number=0;
listadeseo:Deseo[]=new Array();

  constructor(public navCtrl: NavController, 
  public serviceheart:HeartService,
  public navParams: NavParams,
  public servicecart:CartService,
  public servicedeseo:DeseoService)
  {
    this.listacart=servicecart.getObjetoCarrito();
    this.cargarDeseos();

  }

  gotoChat()
  {
    var feedback = document.createElement('a');
    feedback.setAttribute('href', 'mailto://ventas@sociedadagricola.com?subject=This%20is%20the%20subject&cc=someone_else@example.com&body=This%20is%20the%20body');
    feedback.click();
  }

  gotoDeuda()
  {
      this.navCtrl.push(DeudaPage);
  }

  cargarDeseos()
  {
      this.servicedeseo.getDeseos(localStorage.getItem("idusuario")).subscribe(
        rs=>this.longdeseo=rs.length,
        er=>console.log(er),
        ()=>console.log('ok')

    );
  }

  ionViewWillEnter() 
  {
    this.longcart=this.listacart.length;
    this.cargarDeseos();
  }

  gotoCatalog()
  {      
     // this.navCtrl.push(CatalogoPage);
      this.navCtrl.push(CategoriaPage);
  }

  gotoAcerca()
  {
      this.navCtrl.push(Acerca);

  }


  gotoHeart()
  {
      this.navCtrl.push(WishPage);

  }

  gotoOferts()
  {
    this.navCtrl.push(WishPage);
  }

  gotoCart()
  {
      this.navCtrl.push(CartPage);

  }


}
