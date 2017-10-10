import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import { InventarioService } from '../../services/inventario.service';
import { Inventario } from '../../services/inventario';
import { CatalogoDetallePage } from '../../pages/catalogo-detalle-page/catalogo-detalle-page';
import { DeseoService } from '../../services/deseo.service';
import { Deseo } from '../../services/deseo';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { WishPage } from  '../../pages/wish-page/wish-page'
import { SocialSharing } from '@ionic-native/social-sharing';
import {CartPage} from '../cart-page/cart-page';
import { CartService } from '../../services/cart-service';
import { Utilitarios } from '../../services/utilitarios';

/**
 * Generated class for the CatalogoSalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-catalogo-sales-page',
  templateUrl: 'catalogo-sales-page.html',
})
export class CatalogoSalesPage {

  private enlace:Utilitarios=new Utilitarios();
private cadena:string=this.enlace.enlace;
listacart:Inventario[]=new Array();
  longcart:number=0;
  estado:string;
  form:FormGroup;
  idcategoria:string;
  lista:Inventario[];
  idusuario:string;
  idproducto:string;
  private items:any;
  constructor( private fb:FormBuilder,
  public navCtrl: NavController, 
  public toastCtrl: ToastController,
  private servicio:InventarioService,
  public navParams: NavParams,
  private serviciodeseo:DeseoService,
  private socialSharing: SocialSharing,
  public servicecart:CartService) {
  this.idcategoria= this.navParams.get('idcategoria');
  this.leerInventario(this.idcategoria);
   //this.leerInventario();
  this.crearformulario();
  this.listacart=servicecart.getObjetoCarrito();
}
crearformulario()
{
    this.form=this.fb.group({
      
        idusuario:[''],
        idproducto:[''],
        idestado:['']
      
    })

}

  leerInventario(idcategoria)
 // leerInventario()
  {
     this.servicio.getInventariosCategoria(idcategoria)
     // this.servicio.getInventarios()
      .subscribe(
        rs=>this.lista=rs,
        er=>console.log(er),
        ()=>console.log(this.lista)
      )
  }

ionViewWillEnter(){
//this.leerInventario();
    this.leerInventario(this.idcategoria);
    this.longcart=this.listacart.length;
  }

onClick(item)
{
  console.log(item.idproducto);
  this.navCtrl.push(CatalogoDetallePage,{
    idproducto:item.idproducto
    });
  }
 gotoCart()
  {
      this.navCtrl.push(CartPage);

  }

initializeItems()
{
  this.items=this.lista;

}
archive(item:Inventario)
{
 var feedback = document.createElement('a');
    feedback.setAttribute('href', "http://"+this.cadena+":8000/files/"+item.ficha_tecnica);
    feedback.click();

}
heart(item)
{
  var id=+localStorage.getItem("idusuario");
  var codproducto=+item.idproducto;
  this.form.value.idusuario=id;
  this.form.value.idproducto=codproducto;
  this.form.value.idestado='1';
  
  console.log(this.form.value);
  this.serviciodeseo.addDeseo(this.form.value).subscribe(
            data => {
            
              if (data.estado=="Existe")
              {
                let toast = this.toastCtrl.create({
                message: 'El item ya se encuentra en tus deseos',
                duration: 2000,
                position: 'middle'
                });
                
                toast.present(toast);
              }
              else
              {
                let toast = this.toastCtrl.create({
                message: 'Se añadio el item a tus deseos',
                duration: 1500,
                position: 'middle'
                });
                
              toast.present(toast);
              this.navCtrl.push(WishPage);
              }
             
              
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );

  console.log("el servicio se ejecuto correctamente");
}


share(item)
{
      this.socialSharing.canShareViaEmail().then(() => {
          console.log("se puede enviar email");
      // Sharing via email is possible
        this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
              // Success!
              console.log("correo enviado");
            }).catch(() => {
              // Error!
            });
            

    }).catch(() => {
      console.log("no se puede enviar email");
      // Sharing via email is not possible
    });

   
   

}

  evaluarStock(item)
  {
    if (item.stock==0)
      {
        return 0;
      }
      else if (item.stock>0 && item.stock<5)
        {
          return 1;
        }
        else if (item.stock>=5)
          {
            return 2;
          }

  }



 getItems(ev:any) {
    this.initializeItems();
    let val=ev.target.value;

    if (val && val.trim()!='' )
    {
        this.lista=this.lista.filter((item)=>{
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase())>-1);
          
        })
    } 
    else
    {
      this.leerInventario(this.idcategoria);
//this.leerInventario();
    }

}


}
