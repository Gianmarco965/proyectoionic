import { Component } from '@angular/core';
import { IonicPage,ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ClienteSalesService } from '../../services/clientesales.service';
import { Cliente } from '../../services/cliente';
import { DetalleClienteSalesPage } from '../../pages/detalle-cliente-sales-page/detalle-cliente-sales-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { ClienteService } from '../../services/cliente.service';
import { CallNumber } from '@ionic-native/call-number';


/**
 * 
 * Generated class for the ClienteSalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-cliente-sales-page',
  templateUrl: 'cliente-sales-page.html',
})
export class ClienteSalesPage {
  date:Date;
  filtro:string;
  seleccionado:string;
  selectindice:string;
  campo:string;
  tipodato:string='text';
  maximo:number=8;
  lista:Cliente[];
  myForm: FormGroup;
  constructor(public navCtrl: NavController,   
  public actionSheetCtrl: ActionSheetController, 
  public navParams: NavParams,
  private alertCtrl: AlertController,
  private customerService:ClienteSalesService,
  public formBuilder: FormBuilder,
  public toastCtrl: ToastController,
   public clienteservice:ClienteService,
   private callNumber: CallNumber) {

    
    this.seleccionado="buscar";
    this.selectindice="hoy";
    this.campo="c.fechasistema";
     this.myForm = this.createMyForm();
     this.leerClienteHoy();
    this.date =  new Date(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteSalesPage');
  }

  ionViewWillEnter(){
     
     
  }
onPageWillEnter() {
  this.leerClienteHoy();
}
leerClienteHoy()
  {
     this.customerService.getClientexID("c.fechasistema","CURDATE()").subscribe(
            rs=>this.lista=rs,
            er=>console.log(er),
            ()=>{console.log('ok')
            this.filtro="hoy";
            this.selectindice="hoy";
                if (this.isEmpty(this.lista))
                {
                      this.filtro="ayer";
                      this.selectindice="ayer";

                     let toast = this.toastCtrl.create({
                      message: 'No hay clientes registrados el dia de hoy',
                      duration: 2000,
                      position: 'middle'
                      });
                      toast.present(toast);
                      this.leerClienteAyer();

                      
                       
                }
             }
          )
  }
 isEmpty(obj)
 {
 for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
leerClienteAyer()
{
    this.customerService.getClientexID("c.fechasistema","ayer").subscribe(
            rs=>this.lista=rs,
            er=>console.log(er),
            ()=>{console.log('ok')

              if (this.isEmpty(this.lista))
              {
                      this.filtro="semana";
                      this.selectindice="semana";

                       let toast = this.toastCtrl.create({
                      message: 'No hay clientes registrados el dia de ayer',
                      duration: 2000,
                      position: 'middle'
                      });
                      toast.present(toast);
                      this.leerClienteSemana();

                     
              }
            }
          )
}

leerClienteSemana()
{
    this.customerService.getClientexID("c.fechasistema","semana").subscribe(
          rs=>this.lista=rs,
          er=>console.log(er),
          ()=>{console.log('ok')

            if (this.isEmpty(this.lista))
            {
                this.filtro="semana_anterior";
                this.selectindice="semana_anterior";
                let toast = this.toastCtrl.create({
                      message: 'No hay clientes registrados esta semana',
                      duration: 2000,
                      position: 'middle'
                      });
                      toast.present(toast);
                      
                this.leerClienteSemanaAnterior();

            }
         

        
      }
    )
}

leerClienteSemanaAnterior()
{
    this.customerService.getClientexID("c.fechasistema","semana_anterior").subscribe(
        rs=>this.lista=rs,
        er=>console.log(er),
        ()=>console.log('ok')
    )
}

establecerCambio(selectedValue: any) {
    
    this.selectindice=selectedValue;
  }


onClick(item)
{
  this.navCtrl.push(DetalleClienteSalesPage,{
    idcliente:item.idcliente
    });
}

 saveData(){
console.log(this.myForm.value);

    this.clienteservice.addCliente(this.myForm.value).subscribe(
      rs=>console.log(rs),
        er=>console.log(er),
        ()=>{console.log("ok")
      
               let toast = this.toastCtrl.create({
                message: 'Cliente Registrado Correctamente',
                duration: 2000,
                position: 'middle'
    });
    toast.present(toast);

    this.navCtrl.setRoot(this.navCtrl.getActive().component);
this.leerClienteHoy();
          });
    
    
   
  }


async call(item):Promise<any>{
  try{
   await this.callNumber.callNumber("056221744",true);
  }

   catch(e){
    console.log(e);
  }
}

email(item)
{
  console.log(item);
  var feedback = document.createElement('a');
  feedback.setAttribute('href', 'mailto:'+item.email+'?subject=This%20is%20the%20subject&cc=someone_else@example.com&body=This%20is%20the%20body');
  feedback.click();
}


cambiarModo()
{
  this.seleccionado="agregar";

}

 private createMyForm(){
    return this.formBuilder.group({
      idcliente:[''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', Validators.required],
      contra: ['',Validators.required],
      celular:['',Validators.required],
      genero: ['', Validators.required],
      empresa:['',Validators.required],
      idusuario:[''],
      idrol:['1'],
      idestado:['3']
      
      
    });
  }

buscarCliente()
{

  if (this.selectindice=="dni")
  {
    this.campo="u.usuario";
    this.maximo=8;
    this.tipodato="number";
    this.alertaCliente();
  }
  else if (this.selectindice=="nombre")
  {
    this.campo="c.nombre";
    this.maximo=50;
    this.tipodato="text";
    this.alertaCliente();
  }
  else if (this.selectindice=="hoy")
  {
    this.leerClienteHoy();
  }
  else if (this.selectindice=="ayer")
  {
    this.leerClienteAyer();
  }
  else if (this.selectindice=="semana")
  {
    this.leerClienteSemana();
  }
  else if(this.selectindice=="semana_anterior")
  {
    this.leerClienteSemanaAnterior();
  }
  else if (this.selectindice=="intervalo")
  {
     console.log(this.date.getFullYear());
    //this.llerClienteAyer();
    let alert=this.alertCtrl.create({
      title:'Intervalo de Fecha',
      inputs:
      [
        {
          name:'dato',
          placeholder:'Fecha Inicial',
          type:'date',
          min:this.date.getFullYear(),
          max:this.date.getDay()
        },
        {
          name:'dato2',
          placeholder:'Fecha Final',
          type:'date'
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler:data=>{
            console.log("datosxd");
          }
        },
        {
          text:'Ok',
          handler:data=>{
            let fechainic=data.dato;
            let fechafin=data.dato2;

              this.customerService.getClientexIntervalo("c.fechasistema",fechainic,fechafin).
              subscribe(
                rs=>this.lista=rs,
                er=>console.log(er),
                ()=>console.log('ok')
              );
          }
        }
      ]
    });
    alert.present();

  }


}

alertaCliente()
{
    let alert = this.alertCtrl.create({
    title: 'Dato',
    inputs: [
      {
        name: 'dato',
        placeholder: this.selectindice,
        type:this.tipodato,
        min:1,
        max:this.maximo
      
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
         console.log("xd");
         var cadena:string;
         cadena=data.dato;
          this.customerService.getClientexID(this.campo,cadena).subscribe(
            rs=>this.lista=rs,
            er=>console.log(er),
            ()=>console.log('ok')
          )
        }
      }
    ]
  });
  alert.present();

}


}
