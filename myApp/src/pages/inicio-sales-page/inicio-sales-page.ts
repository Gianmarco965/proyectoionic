import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventarioSalesPage } from '../inventario-sales-page/inventario-sales-page';
import { ClienteSalesPage } from '../../pages/cliente-sales-page/cliente-sales-page';
import { DeudaSalesPage } from '../../pages/deuda-sales-page/deuda-sales-page';
import { EstadisticaPage } from '../../pages/estadistica/estadistica';
/**
 * Generated class for the InicioSalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-inicio-sales-page',
  templateUrl: 'inicio-sales-page.html',
})
export class InicioSalesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioSalesPage');
  }
  gotoEstadistica()
  {

    this.navCtrl.push(EstadisticaPage);
  }

  gotoCatalog()
  {
      this.navCtrl.push(InventarioSalesPage);

  }
  gotoCustomer()
  {
      this.navCtrl.push(ClienteSalesPage);
  }

  gotoDeuda()
  {
    this.navCtrl.push(DeudaSalesPage);

  }
}
