import { Component } from '@angular/core';
import {  NavController, NavParams,Slides  } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth-service';
import { Inicio } from '../inicio/inicio';
import { UsuarioService } from '../../services/usuario.service';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { InicioSalesPage } from '../inicio-sales-page/inicio-sales-page';

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  myForm: FormGroup;
  mensaje:string;
  usuario:string;
  pass:string;
  isLogged:boolean;
  slides:Slides;
  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    public navParams: NavParams,
    private auth:AuthService,
    public toastCtrl: ToastController,
    private usu:UsuarioService,
    public formBuilder: FormBuilder,
    public clienteservice:ClienteService
    ) {
      this.myForm = this.createMyForm();
  }

 saveData(){
console.log(this.myForm.value);

    this.clienteservice.addCliente(this.myForm.value).subscribe(
      rs=>console.log(rs),
        er=>console.log(er),
        ()=>console.log("ok"));
    


    let toast = this.toastCtrl.create({
                message: 'Usuario Registrado Correctamente',
                duration: 2000,
                position: 'middle'
    });
    toast.present(toast);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
   
  }
 
private limpiar()
{
  this.myForm.reset();

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
  
 ionViewWillEnter() {

       this.menuCtrl.swipeEnable( false );
   }

   ionViewDidLeave() {

       this.menuCtrl.swipeEnable( true );
   }




Signup()
      {

        let f={usuario:this.usuario,pass:this.pass};
        this.auth.login(f)
        .subscribe(rs=>this.isLogged=rs,
        er=>console.log(er),
        ()=>{
            if (this.isLogged)
            {
                 this.usu.obteniendoidusuario(f).subscribe(
                    rs=>this.mensaje=rs,
                    er=>console.log(er),
                    ()=>{
                      console.log(this.mensaje)

                if (localStorage.getItem('rol')=="cliente")
                  {
                    this.navCtrl.setRoot(Inicio)    
                    .then(data=>console.log(data),  
                    error=>console.log(error));

                  }
                  else if (localStorage.getItem('rol')=="ventas")

                  {
                    this.navCtrl.setRoot(InicioSalesPage)
                    .then(data=>console.log(data),  
                    error=>console.log(error));
                  }
                    }

                  );
                 
                  
                  
                

            }
            else
            {
                let toast = this.toastCtrl.create({
                message: 'Usuario o Contraseña son Incorrectos',
                duration: 2000,
                position: 'middle'
              });
              
            
              toast.present(toast);
              console.log('acceso denegado');
              console.log(f.pass);
            }
        })

      }


      
  
}
