import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/cart-service';
import { Inventario } from '../../services/inventario';
import { CatalogoDetallePage } from '../../pages/catalogo-detalle-page/catalogo-detalle-page';
import { CategoriaPage } from '../../pages/categoria-page/categoria-page';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder,FormGroup } from '@angular/forms';
import { CheckoutPage } from '../checkout-page/checkout-page';
import { Utilitarios } from '../../services/utilitarios';
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart-page',
  templateUrl: 'cart-page.html',
})
export class CartPage {

  private enlace:Utilitarios=new Utilitarios();
  private cadena:string=this.enlace.enlace;
  form:FormGroup;
  total_suma=0;
  suma=0;
  igv=0;
  desc=0;
  totdesc=0;
  subtotal=0;
  txtsubtotal:string;
  txtdesc=0;
  txtigv:string;
  listacart:Inventario[]=new Array();
  constructor(
  private alertCtrl: AlertController,
  public navCtrl: NavController, 
  public toastCtrl: ToastController,
  public navParams: NavParams,
  public servicecart:CartService,
   private fb:FormBuilder
  ) {
    this.listacart=servicecart.getObjetoCarrito();
    this.suma=this.getSuma(this.listacart);
    this.crearformulario();
  }
crearformulario()
{
    this.form=this.fb.group({
        
        idusuario:[''],
        idproducto:['']
      
    })

}
gotoCheckout()
{
    this.navCtrl.push(CheckoutPage,{
      monto:this.suma
    });

}
  ionViewDidLoad() {
    if (this.isEmpty(this.listacart))
    {
      let toast = this.toastCtrl.create({
                message: 'Agregue items al carrito xD',
                duration: 1500,
                position: 'middle'
              });
               toast.present(toast);
    }
        
  }

 isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  onClick(item)
  {
    this.navCtrl.push(CatalogoDetallePage,{
    idproducto:item.idproducto
    });

  }
  gotoCatalog()
  {
    this.navCtrl.push(CategoriaPage);
  }
getSuma(listacart)
  {
 console.log("xdsdsd");
    for(var j=0; j<listacart.length;j++) 
        { 
          var betotal=(listacart[j].cantidad)*(listacart[j].precio);
          this.desc=(listacart[j].oferta/100)*betotal;
          this.total_suma+=(betotal)-(this.desc);
          this.totdesc+=this.desc;
        } 
  this.subtotal=this.total_suma/1.18;
  this.txtsubtotal=this.subtotal.toFixed(2);
  this.igv=this.subtotal*0.18;
  this.txtdesc=this.totdesc;
  this.txtigv=this.igv.toFixed(2);

    return this.total_suma;
  }

trash(item){

    let alert = this.alertCtrl.create({
    title: 'Confirmación',
    message: '¿Deseas quitar este item?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Quitar',
        handler: () => {

          
          this.listacart.indexOf(item,0);
          console.log(this.listacart.indexOf(item,0));
          this.listacart.splice(this.listacart.indexOf(item,0),1);
          this.servicecart.setObjetoCarrito(this.listacart);
          console.log(this.listacart);

          
          this.total_suma=0;
  this.suma=0;
  this.igv=0;
  this.desc=0;
  this.totdesc=0;
  this.subtotal=0;
  this.txtdesc=0;

          this.suma=this.getSuma(this.listacart);
        }
      }
    ]
  });
  alert.present();

  

    //this.servicewish.putDeseo()
  }

ionViewWillEnter() 
  {
    
  
  }
    

}
