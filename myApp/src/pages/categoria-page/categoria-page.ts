import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../services/categoria';
import { CatalogoPage } from '../../pages/catalogo-page/catalogo-page';
import { OfertaService } from '../../services/oferta.service';
import { Inventario } from '../../services/inventario';
import { CatalogoDetallePage } from '../../pages/catalogo-detalle-page/catalogo-detalle-page';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { WishPage } from  '../../pages/wish-page/wish-page'
import { DeseoService } from '../../services/deseo.service';
import { Deseo } from '../../services/deseo';
import {CartPage} from '../cart-page/cart-page';
import { CartService } from '../../services/cart-service';
import { Utilitarios } from '../../services/utilitarios';
import { HeartService } from '../../services/heart-service'; 


/**
 * Generated class for the CategoriaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-categoria-page',
  templateUrl: 'categoria-page.html',
})
export class CategoriaPage {
  private enlace:Utilitarios=new Utilitarios();
private cadena:string=this.enlace.enlace;
listacart:Inventario[]=new Array();
longcart:number=0;
longdeseo:number=0;
  form:FormGroup;
  seleccionado:string;
  idcategoria:number;
  lista:Categoria[];
  listainventario:Inventario[];
  private items:any;
  private itemsoferta:any;

  constructor
  (
    private fb:FormBuilder,
    public navCtrl: NavController,
    private servicio:CategoriaService,
    private serviciooferta:OfertaService,
    public toastCtrl: ToastController,
    private serviciodeseo:DeseoService,
    private socialSharing: SocialSharing,
    public servicecart:CartService,
    
  public servicedeseo:DeseoService
  ) {
    this.seleccionado = "products";
    this.leerCategoria();
    this.crearformulario();
    this.listacart=servicecart.getObjetoCarrito();
    this.cargarDeseos();
  }

crearformulario()
{
    this.form=this.fb.group({
      
        idusuario:[''],
        idproducto:[''],
        idestado:['']
      
    })

}

leerCategoria()
  {
   this.seleccionado="products";
      this.servicio.getCategorias()
      .subscribe(
        rs=>this.lista=rs,
        er=>console.log(er),
        ()=>console.log(this.lista)
      )
  
  }

  leerInventario()
  {
    this.seleccionado="offers";
       this.serviciooferta.getInventarios()
      .subscribe(
        rs=>this.listainventario=rs,
        er=>console.log(er),
        ()=>console.log(this.listainventario)
      )
  }

  cargarDeseos()
  {
      this.servicedeseo.getDeseos(localStorage.getItem("idusuario")).subscribe(
        rs=>this.longdeseo=rs.length,
        er=>console.log(er),
        ()=>console.log('ok')

    );
  }
  ionViewWillEnter(){
    this.leerCategoria();
    this.longcart=this.listacart.length;
    this.cargarDeseos();
  }

  ionViewDidLoad() {
    
  }

  gotoHeart()
  {
      this.navCtrl.push(WishPage);

  }

onClick(item)
{
  console.log(item.idcategoria);
  this.navCtrl.push(CatalogoPage,{
    idcategoria:item.idcategoria
    });
}
onClickOferta(item)
{
   this.navCtrl.push(CatalogoDetallePage,{
    idproducto:item.idproducto
    });
}



initializeItems()
{
  this.items=this.lista;
  this.itemsoferta=this.listainventario;
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
 gotoCart()
  {
      this.navCtrl.push(CartPage);

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

archive(item:Inventario)
{
 var feedback = document.createElement('a');
    feedback.setAttribute('href', "http://"+this.cadena+":8000/files/"+item.ficha_tecnica);
    feedback.click();

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
      this.leerCategoria();

    }

}

}
