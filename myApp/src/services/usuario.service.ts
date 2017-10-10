import { Injectable } from '@angular/core';
import { Response,Headers,RequestOptions,Http } from '@angular/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs/Observable';
import { Utilitarios } from './utilitarios';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuarioService
{

  private options;
  private enlace:Utilitarios=new Utilitarios();
    url:string;
    constructor(private http : Http)
    {
            let token =localStorage.getItem('token');
            let headers=new Headers({
                'Authorization':'Bearer '+token
    });
        this.options=new RequestOptions({headers:headers});
        this.url='http://'+this.enlace.getObjetoEnlace()+':8000/usuario/';    

    }
 

 

obteniendoidusuario(userInfo){
    let url=`${this.url}`;
    let iJson=JSON.stringify(userInfo);

    return this.http.post(url,iJson,{headers:new Headers({
        'Content-Type':'application/json'
    })
  })
    .map(res=>res.json())
    .map(res=>{
        var mensaje;
        if(res.estado=="error" || res.estado=="nofound")
        {
            mensaje="no se encontro el usuario";
          console.log("no se encontro el usuario")

        }
        else
        {
            mensaje="usuario identificado";
            console.log(res);
          localStorage.setItem('idusuario',res.idcliente);
          localStorage.setItem('rol',res.estado);
          console.log("el idusuario es "+res.idcliente);
          console.log("el rol es "+res.estado);
        }
        return mensaje;

    });
  }


 private handleError(error:Response | any)
 {
            let errMsg:string;
            if (error instanceof Response)
            {
                let body=error.json() || '';
                let err=body.err || JSON.stringify(body);
                errMsg=`${error.status} - ${error.statusText || ''} ${err}`;
            }
            else
            {
                errMsg=error.message ? error.message : error.toString();
            }
            console.error(errMsg);
            return Observable.throw(errMsg);

    }
}