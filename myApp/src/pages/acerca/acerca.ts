import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaPage } from '../categoria-page/categoria-page';

/**
 * Generated class for the Acerca page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-acerca',
  templateUrl: 'acerca.html',
})
export class Acerca {

  slides = [
    {
      title: "Bienvenido a Data App!",
      description: "La app de <b>Sociedad Agricola Tierra SAC</b> te permite hacer tus pedidos de forma rapida desde tu smartphone.",
      image: "assets/images/carts.png",
    },
    {
      title: "Data App Chat",
      description: "Puedes comunicarte con nuestros vendedores a través del <b>Chat</b> incluido en la app.",
      image: "assets/images/chats.png",
    },
    {
      title: "Data App Wishes",
      description: "<b>Lista de Deseos</b> es una sección donde puedes agregar productos que desearias tener, posteriormente se te ofrecerán promociones especiales de la lista.",
      image: "assets/images/wish.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Acerca');
  }



  onClick()
  {
      this.navCtrl.push(CategoriaPage);

  }

}
