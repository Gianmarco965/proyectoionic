import {Component,ViewChild} from '@angular/core';
import {Platform,Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Inicio} from "../pages/inicio/inicio";
import {Contacto} from '../pages/contacto/contacto';
import {Acerca} from '../pages/acerca/acerca';
import {PlayListt} from '../pages/play-listt/play-listt';
import {Canciones} from '../pages/canciones/canciones';
import {DeudaPage} from '../pages/deuda-page/deuda-page';
import {LoginPage} from '../pages/login-page/login-page';
import {CatalogoPage} from '../pages/catalogo-page/catalogo-page'; 
import {CatalogoDetallePage} from '../pages/catalogo-detalle-page/catalogo-detalle-page';
import {OfertaPage} from '../pages/oferta-page/oferta-page';
import {CategoriaPage} from '../pages/categoria-page/categoria-page';
import {DetalleDeudaPage} from '../pages/detalle-deuda-page/detalle-deuda-page';
import {CartPage} from '../pages/cart-page/cart-page';
import {WishPage} from '../pages/wish-page/wish-page';
import {CheckoutPage} from '../pages/checkout-page/checkout-page';
import {LogoutPage} from '../pages/logout-page/logout-page';
import {CatalogoSalesPage} from '../pages/catalogo-sales-page/catalogo-sales-page';
import {AgregarCategoriaSalesPage} from '../pages/agregar-categoria-sales-page/agregar-categoria-sales-page';
import {ClienteSalesPage} from '../pages/cliente-sales-page/cliente-sales-page';
import {DetalleClienteSalesPage } from '../pages/detalle-cliente-sales-page/detalle-cliente-sales-page';
import {DeudaSalesPage } from '../pages/deuda-sales-page/deuda-sales-page';
import {EditSalesClientePage} from '../pages/edit-sales-cliente-page/edit-sales-cliente-page';
import { DetalleDeudaSalesPage } from '../pages/detalle-deuda-sales-page/detalle-deuda-sales-page';
import { EstadisticaPage } from '../pages/estadistica/estadistica';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild('NAV') nav:Nav;

public rootPage:any;
public pages:Array<{titulo: string,component: any,icon:string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage=LoginPage;

    this.pages=[
      {titulo:'Inicio',component: Inicio,icon:'home'},
      {titulo:'Carrito de Compras',component:CartPage,icon:'cart'},
      {titulo:'Lista de Deseos',component:WishPage,icon:'heart'},
      {titulo:'Contacto',component: Contacto,icon:'mail'},
      {titulo:'Acerca de ',component: Acerca,icon:'information-circle'},
       {titulo:'Deudas',component: DeudaPage,icon:'cash'},
       {titulo:'Logout',component: LoginPage,icon:'log-out'}
    ];
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

goToPage(page)
{
  if (page==LoginPage)
  {
    localStorage.setItem("idusuario",'');
  localStorage.setItem("token",'');
  this.nav.setRoot(LoginPage);
}
else
{
   this.nav.setRoot(page);
}
 

}

}

