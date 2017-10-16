import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstadisticaMesPage } from '../estadistica-mes/estadistica-mes';
import { EstadisticaStockPage } from '../estadistica-stock/estadistica-stock';
import { EstadisticaStockRoundPage } from '../estadistica-stock-round/estadistica-stock-round';


/**
 * Generated class for the EstadisticaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-estadistica',
  templateUrl: 'estadistica.html',
})
export class EstadisticaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClick()
  {
      this.navCtrl.push(EstadisticaMesPage);
  }

  stockFaltante()
  {

    this.navCtrl.push(EstadisticaStockPage);
  }

  ionViewDidLoad() {
    }

    stockFaltante2()
    {
        this.navCtrl.push(EstadisticaStockRoundPage);
    }

}
