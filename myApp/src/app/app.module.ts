import {BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {SplashScreen } from '@ionic-native/splash-screen';
import {StatusBar } from '@ionic-native/status-bar';
import {HttpModule } from '@angular/http';
import {MyApp } from './app.component';
import {Inicio} from "../pages/inicio/inicio"
import {Contacto} from '../pages/contacto/contacto';
import {Acerca} from '../pages/acerca/acerca';
import {DeudaPage} from '../pages/deuda-page/deuda-page';
import {LoginPage} from '../pages/login-page/login-page';
import {AuthService} from '../services/auth-service';
import { InventarioService } from '../services/inventario.service';
import { CatalogoPage } from '../pages/catalogo-page/catalogo-page';
import { CatalogoDetallePage } from '../pages/catalogo-detalle-page/catalogo-detalle-page';
import { OfertaPage } from '../pages/oferta-page/oferta-page';
import { OfertaService } from '../services/oferta.service';
import { PedidoService } from '../services/pedido.service';
import {CategoriaPage} from '../pages/categoria-page/categoria-page';
import {CategoriaService} from '../services/categoria.service';
import {UsuarioService} from '../services/usuario.service';
import {DetallePedidoService} from '../services/detallepedido.service';
import {DetalleDeudaPage} from '../pages/detalle-deuda-page/detalle-deuda-page';
import {CartPage} from '../pages/cart-page/cart-page';
import {CartService} from '../services/cart-service';
import {WishPage} from '../pages/wish-page/wish-page';
import {InicioSalesPage} from '../pages/inicio-sales-page/inicio-sales-page';
import {DeseoService} from '../services/deseo.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import {CheckoutPage} from '../pages/checkout-page/checkout-page';
import { ClienteService } from '../services/cliente.service';
import {DeudaService} from '../services/deuda.service';
import { InventarioSalesPage } from '../pages/inventario-sales-page/inventario-sales-page';
import { CatalogoSalesPage } from '../pages/catalogo-sales-page/catalogo-sales-page';
import {AgregarCategoriaSalesPage} from '../pages/agregar-categoria-sales-page/agregar-categoria-sales-page';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ClienteSalesPage } from '../pages/cliente-sales-page/cliente-sales-page';
import { ClienteSalesService } from '../services/clientesales.service';
import { DetalleClienteSalesPage } from '../pages/detalle-cliente-sales-page/detalle-cliente-sales-page';
import { CallNumber } from '@ionic-native/call-number';
import { DeudaSalesPage } from '../pages/deuda-sales-page/deuda-sales-page';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HeartService } from '../services/heart-service';
import { DetalleCuotaService } from '../services/detallecuota.service'
import { DetalleDeudaSalesPage } from '../pages/detalle-deuda-sales-page/detalle-deuda-sales-page';
import { Utilitarios } from '../services/utilitarios';
import { EstadisticaPage } from '../pages/estadistica/estadistica';
import { DepartamentoService } from '../services/departamento.service';
import { ProvinciaService } from '../services/provincia.service';
import { DistritoService } from '../services/distrito.service';
import { EstadisticaMesPage } from '../pages/estadistica-mes/estadistica-mes';
import { EstadisticaStockPage } from '../pages/estadistica-stock/estadistica-stock';
import { EstadisticaStockRoundPage } from '../pages/estadistica-stock-round/estadistica-stock-round';

@NgModule({
  declarations: [
    MyApp,
    Inicio,Contacto,Acerca,EstadisticaMesPage,EstadisticaStockRoundPage,EstadisticaStockPage,DeudaPage,EstadisticaPage,DeudaSalesPage,DetalleDeudaSalesPage,DetalleClienteSalesPage,ClienteSalesPage,AgregarCategoriaSalesPage,CatalogoSalesPage,CartPage,LoginPage,InventarioSalesPage,CheckoutPage,WishPage,InicioSalesPage,CatalogoPage,DetalleDeudaPage,CatalogoDetallePage,OfertaPage,CategoriaPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
            scrollAssist: true,
            autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Inicio,Contacto,Acerca,DeudaPage,EstadisticaMesPage,EstadisticaStockRoundPage,EstadisticaStockPage,EstadisticaPage,DeudaSalesPage,DetalleDeudaSalesPage,DetalleClienteSalesPage,ClienteSalesPage,DetalleDeudaPage,AgregarCategoriaSalesPage,CatalogoSalesPage,WishPage,InventarioSalesPage,InicioSalesPage,CheckoutPage,CartPage,LoginPage,CatalogoPage,CatalogoDetallePage,OfertaPage,CategoriaPage
  ],
  providers: [AuthService,File,DepartamentoService,ProvinciaService,DistritoService,FilePath,DetalleCuotaService,Utilitarios,FileTransfer,HeartService,ScreenOrientation,CallNumber,ClienteSalesService,Camera,DeudaService,InventarioSalesPage,ClienteService,SocialSharing,CartService,DeseoService,InventarioService,OfertaService,UsuarioService,CategoriaService,DetallePedidoService,PedidoService,HttpModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ] 
})


export class AppModule {}
