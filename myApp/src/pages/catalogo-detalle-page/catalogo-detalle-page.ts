import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventarioService } from '../../services/inventario.service';
import { Inventario } from '../../services/inventario';
import { CartService } from '../../services/cart-service';
import { ToastController } from 'ionic-angular';
import {CartPage} from '../cart-page/cart-page';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { WishPage } from  '../../pages/wish-page/wish-page'
import { SocialSharing } from '@ionic-native/social-sharing';
import { HeartService } from '../../services/heart-service'; 
import { DeseoService } from '../../services/deseo.service';
import { Utilitarios } from '../../services/utilitarios';

/**
 * Generated class for the CatalogoDetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-catalogo-detalle-page',
  templateUrl: 'catalogo-detalle-page.html',
})
export class CatalogoDetallePage {
  private enlace:Utilitarios=new Utilitarios();
  private cadena:string=this.enlace.enlace;
  listacart:Inventario[]=new Array();
  longcart:number=0;
  longdeseo:number=0;
  form:FormGroup;
  itemcarrito:Inventario;
  idproducto:string;
  inventario:Inventario;
  constructor(
    
    private fb:FormBuilder,
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private servicio:InventarioService,
    private serviciocarrito:CartService,
    public servicecart:CartService,
    public toastCtrl: ToastController,
     private servicedeseo:DeseoService,
  private socialSharing: SocialSharing
    ) {

    this.idproducto= this.navParams.get('idproducto');
    this.cargarDetalle(this.idproducto);
    this.crearformulario();
    this.listacart=servicecart.getObjetoCarrito();
    this.cargarDeseos();
  }
  cargarDeseos()
  {
      this.servicedeseo.getDeseos(localStorage.getItem("idusuario")).subscribe(
        rs=>this.longdeseo=rs.length,
        er=>console.log(er),
        ()=>console.log('ok')

    );
  }

  gotoHeart()
  {
      this.navCtrl.push(WishPage);
      
  }

ionViewWillEnter() 
  {
    this.longcart=this.listacart.length;
    this.cargarDeseos();

  }
   gotoCart()
  {
      this.navCtrl.push(CartPage);

  }
  crearformulario()
{
    this.form=this.fb.group({

        descripcion:[''],
        ficha_tecnica:[''],
        idcategoria:[''],
        idproducto:[''],
        imagen:[''],
        nombre:[''],
        oferta:[''],
        precio:[''],
        cantidad:['',Validators.compose([Validators.minLength(1),Validators.maxLength(2),Validators.required])]

    
    })

}
  cargarDetalle(idproducto)
  {
    console.log(idproducto);
    console.log("paramtro"+this.servicio.getInventario(idproducto));
      this.servicio.getInventario(idproducto)
      .subscribe(

        rs=>this.inventario=rs[0],
        er=>console.log(er),
        ()=>console.log('ok')
      )
  }

onClick(item)
{

let alert = this.alertCtrl.create({
    title: 'Cantidad',
    inputs: [
      {
        name: 'cantidad',
        placeholder: 'Cantidad',
        type:'number',
        min:1,
        max:2
      
      }
     
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
          var cadena:string;
          var verificar:boolean=false;
          cadena=data.cantidad;
          
          for (var i=0;i<cadena.length;i++)
          {
            
            if (cadena.charAt(i)=="" || cadena.charAt(i)=="+" || cadena.charAt(i)=="-" || cadena.charAt(i)==".")
            {
              console.log("false");
              console.log(cadena.charAt(i))
              verificar=false;
              break;
            }
            else
            {
              console.log("es verdader");
              verificar=true;
            }
            
          }
          if (verificar==true)
          {
            console.log(verificar);
            verificar=false;
             this.agregaralcarrito(item,cadena); 
          }
          else if (verificar==false)
          {console.log(verificar);
            let toast = this.toastCtrl.create({
                message: 'Ingrese la cantidad correctamente',
                duration: 1500,
                position: 'middle'
              });
               toast.present(toast);

              
          }

          
            console.log(data);

        }
      }
    ]
  });
  alert.present();


}


agregaralcarrito(item,cadena)
{
  this.form.value.descripcion=item.descripcion;
  this.form.value.ficha_tecnica=item.ficha_tecnica;
  this.form.value.idcategoria=item.idcategoria;
  this.form.value.idproducto=item.idproducto;
  this.form.value.imagen=item.imagen;
  this.form.value.nombre=item.nombre;
  this.form.value.oferta=item.oferta;
  this.form.value.precio=item.precio;
  this.form.value.cantidad=cadena;
  console.log(this.form.value);

  this.itemcarrito=this.form.value;
  this.serviciocarrito.setItemObjetocarrito(this.itemcarrito);
let toast = this.toastCtrl.create({
                message: 'Producto Agregado al Carrito',
                duration: 1500,
                position: 'middle'
              });
               toast.present(toast);

this.navCtrl.push(CartPage);
}


}