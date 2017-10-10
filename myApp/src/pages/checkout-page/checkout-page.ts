import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { DeudaService } from '../../services/deuda.service';
import {Inventario} from '../../services/inventario';
import { ToastController } from 'ionic-angular';
import { Inicio } from '../../pages/inicio/inicio';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../services/departamento';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../services/provincia';
import { DistritoService } from '../../services/distrito.service';
import { Distrito } from '../../services/distrito';

/**
 * Generated class for the CheckoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkout-page',
  templateUrl: 'checkout-page.html',
})
export class CheckoutPage {

filtro:string;
listadepartamento:Departamento[]=new Array();
listaprovincias:Provincia[]=new Array();
listadistritos:Distrito[]=new Array();
ubigeo:String;
nombredistrito:string;
nombredepartamento:string;
nombreprovincia:string;
selectindice:string;
monto:number;
cantcuota:string;
cuota:number=0;
myForm: FormGroup;
codigo_ubigeo:String;
selectdepartamento:String="01";
selectprovincia:String;
selectdistrito:String;
coddepartamento:string;
codprovincia:string;
coddistrito:string;
listacarrito:Inventario[]=new Array();
  constructor(public distritoservice:DistritoService,public provinciaservice:ProvinciaService,public departamentoservice:DepartamentoService ,public navCtrl: NavController, public navParams: NavParams,
  public formBuilder: FormBuilder,public servicart:CartService,public deudaserv:DeudaService,
  public toastCtrl: ToastController) {
    
    this.listacarrito=servicart.getObjetoCarrito();
    this.myForm = this.createMyForm();
    this.monto=this.navParams.get("monto");
    this.filtro="1";
    this.cantcuota=this.getcuota(this.filtro);
    this.departamentoservice.getData()
    .subscribe(response => {
           this.listadepartamento=response
      }, err => {
         console.log(err);
      },
    ()=>console.log("ok"));   
}

  private createMyForm(){
    return this.formBuilder.group({
      iddeuda:[''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      departamento:['',Validators.required],
      provincia:['',Validators.required],
      distrito:['',Validators.required],
      direccion: ['', Validators.required],
      telefono: ['',Validators.required],
      correo:['',Validators.required],
      documento: ['', Validators.required],
      idusuario:[''],
      idestado:['1'],
      idcuota:[''],
      cantcuota:['',Validators.required],
    
      listacarro:this.formBuilder.array(this.listacarrito)
    
    });
  }

saveData()
{
  
  this.myForm.value.idusuario=localStorage.getItem("idusuario");
  this.myForm.value.departamento=this.nombredepartamento;
  
  this.myForm.value.provincia=this.nombreprovincia;
  this.myForm.value.distrito=this.nombredistrito;
  

  this.deudaserv.addDeuda(this.myForm.value)
  .subscribe(
    rs=>console.log(rs),
    er=>console.log(er),
    ()=>console.log('ok')
    );

     
 

     let toast = this.toastCtrl.create({
                message: 'Pedido Realizado Correctamente',
                duration: 2000,
                position: 'middle'
              });
    
        this.listacarrito.splice(0,this.listacarrito.length);

    
    console.log(this.listacarrito.length);

    this.servicart.setObjetoCarrito(this.listacarrito);
            
     toast.present(toast);
     
     this.navCtrl.push(Inicio);

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  establecerCambio(selectedvalue:any)
  {
      this.selectindice=selectedvalue;
      this.cantcuota=this.getcuota(this.filtro);
  }

  getcuota(cuota)
  {
      
      this.cuota=this.monto/cuota;
      this.cantcuota=this.cuota.toFixed(2);
      return this.cantcuota;
  }
  onSelectChange(selectedValue: any)
  {
    console.log(selectedValue);
    this.selectdepartamento=selectedValue;

    this.provinciaservice.getData()
    .subscribe(response=>{
        this.listaprovincias=response[selectedValue]
        this.listadistritos=null;
    },
    (err)=>{
      console.log(err);
    },
    ()=>console.log("ok"))
  }

  onSelectChangeProvincia(selectedValue: any)
  {
    this.selectprovincia=selectedValue;
      console.log(selectedValue);
      this.distritoservice.getData()
      .subscribe(response=>{
        this.listadistritos=response[selectedValue]
      },
    (err)=>{
      console.log(err);
    },
    ()=>console.log("ok"))
  }

  onSelectChangeDistrito(selectedValue: any)
  {
      console.log(selectedValue);
      
  }

  itemDepartamento(departamento)
  {
    console.log(departamento);
    this.coddepartamento=departamento.codigo_ubigeo;
    this.nombredepartamento=departamento.nombre_ubigeo;
  }

  itemProvincia(provincia)
  {
    console.log(provincia);
    this.codprovincia=provincia.codigo_ubigeo;
    this.nombreprovincia=provincia.nombre_ubigeo;
  }

  itemDistrito(distrito)
  {
    console.log(distrito);
    this.coddistrito=distrito.codigo_ubigeo;
    this.nombredistrito=distrito.nombre_ubigeo;
  }
}
