import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Deseo } from '../../services/deseo';
import { DeseoService } from '../../services/deseo.service';
import { CatalogoDetallePage } from '../../pages/catalogo-detalle-page/catalogo-detalle-page';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CategoriaPage } from '../../pages/categoria-page/categoria-page'; 
import { Utilitarios } from '../../services/utilitarios';
/**
 * Generated class for the WishPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-wish-page',
  templateUrl: 'wish-page.html',
})
export class WishPage {

private enlace:Utilitarios=new Utilitarios();
private cadena:string=this.enlace.enlace;
form:FormGroup;
listawish:Deseo[];
  constructor(private alertCtrl: AlertController,
  private fb:FormBuilder,
  public navCtrl: NavController, 
  public navParams: NavParams,
  public servicewish:DeseoService,
  public toastCtrl: ToastController) 
  {
    this.leerDeseos();
    this.crearformulario();
  }

crearformulario()
{
    this.form=this.fb.group({
        
        idusuario:[''],
        idproducto:['']
      
    })

}

leerDeseos()
  {
       this.servicewish.getDeseos(localStorage.getItem("idusuario")).subscribe(
        rs=>this.listawish=rs,
        er=>console.log(er),
        ()=>console.log(this.listawish)
      )
      
  }
onClick(item)
{
   this.navCtrl.push(CatalogoDetallePage,{
    idproducto:item.idproducto
    });

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishPage');
  }

  trash(item){

    let alert = this.alertCtrl.create({
    title: 'Confirmación',
    message: '¿Deseas quitar este deseo?',
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

          this.presentConfirm(item);
        }
      }
    ]
  });
  alert.present();

  

    //this.servicewish.putDeseo()
  }

presentConfirm(item) 
  {
  var id=+localStorage.getItem("idusuario");
  var codproducto=+item.idproducto;
  this.form.value.idusuario=id;
  this.form.value.idproducto=codproducto;
  console.log(this.form.value);
  this.servicewish.putDeseo(this.form.value).subscribe(

    data=>{
      
      let toast = this.toastCtrl.create({
                message: 'Se quito el deseo..!',
                duration: 2000,
                position: 'middle'
              });
               
          toast.present(toast);

        },
        er=>console.log(er),
        ()=>{
          this.leerDeseos();
        }
    ); 
  console.log("el servicio se ejecuto correctamente");
  console.log(item);
  }     


gotoCatalog()
{
  this.navCtrl.push(CategoriaPage);

}


}
