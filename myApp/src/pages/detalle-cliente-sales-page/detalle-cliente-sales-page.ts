import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteSalesService } from '../../services/clientesales.service';
import { Cliente } from '../../services/cliente';
import { CallNumber } from '@ionic-native/call-number';
import { AlertController } from 'ionic-angular';
import { ClienteSalesPage } from '../cliente-sales-page/cliente-sales-page';
import { EditSalesClientePage} from '../edit-sales-cliente-page/edit-sales-cliente-page';


/**
 * Generated class for the DetalleClienteSalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-cliente-sales-page',
  templateUrl: 'detalle-cliente-sales-page.html',
})
export class DetalleClienteSalesPage {


  myForm: FormGroup;
  isToggled:boolean;
  genero:string;
  estado:number;
  detallecliente:Cliente;
  idcliente:string;
  edicion:boolean=false;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public servicecliente:ClienteSalesService,
  private callNumber: CallNumber,
  private alertCtrl: AlertController,
  private clienteservice:ClienteSalesService,
  public formBuilder: FormBuilder
  ) {
    this.idcliente= this.navParams.get('idcliente');
    this.cargarDetalle('c.idcliente',this.idcliente)
    this.myForm = this.createMyForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleClienteSalesPage');
  }
cargarDetalle(campo,valor)
  {
     this.servicecliente.getClientexID(campo,valor).subscribe(
       rs=>this.detallecliente=rs[0],
       er=>console.log(er),
       ()=>{console.log('ok');
        this.genero=this.detallecliente.genero;
        this.estado=this.detallecliente.idestado;

        if (this.estado==3)
        {
          this.isToggled=true;
        }
        else if (this.estado==4)
        {
          this.isToggled=false;
        }

        }
     );
     
  }
obtenerGenero()
{

  
  return this.genero;
}

 private createMyForm(){
    return this.formBuilder.group({
      idcliente:[''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      celular: ['',Validators.required],
      usuario: ['', Validators.required],
      empresa:['',Validators.required],
      idusuario:['']
      
    });
  }
  
onEdit()
{
  this.edicion=true;


  //this.navCtrl.push(EditSalesClientePage,
  //{idcliente:this.idcliente});

} 
onCancel()
{
  this.edicion=false;
}

onSave()
{
  this.myForm.value.idcliente=this.detallecliente.idcliente;
  this.myForm.value.idusuario=this.detallecliente.idusuario;
  console.log(this.myForm.value);
  this.clienteservice.updateCliente(this.myForm.value).subscribe
  (rs=>console.log(rs),
  er=>console.log(er),
  ()=>{console.log('ok');
        this.onCancel();
        this.cargarDetalle('c.idcliente',this.idcliente);
        this.reset();
  });

}

reset() {
        for (let name in this.myForm.controls) {
            this.myForm.controls[name].updateValueAndValidity();
            this.myForm.controls[name].setErrors(null);
        }

}
notify()
{

  if (this.isToggled==false)
  {

   let confirm = this.alertCtrl.create({
      title: '¿Deseas Desactivar a este Cliente?',
      message: 'Al desactivar la cuenta del cliente no podrá realizar más pedidos',
      buttons: [
        {
          text: 'Nah',
          handler: () => {
            this.isToggled=true;
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            var datos={idcliente:this.detallecliente.idcliente,idestado:4};
            this.clienteservice.inactivecliente(datos).
            subscribe(
              rs=>console.log(rs),
              er=>console.log(er),
              ()=>{console.log('ok');
              this.navCtrl.push(ClienteSalesPage);}
            )

            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
    }
  }
 
obtenerEstado()
{
  return this.estado;
}


  callToNumber()
  {
    this.callNumber.callNumber(this.detallecliente.celular,true)
    .then(()=>console.log('Launched dialer!'))
    .catch(()=>console.log('Error launching dialer'));

  }
}

