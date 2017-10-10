import { Injectable } from '@angular/core';
import { Response,Headers,RequestOptions,Http } from '@angular/http';
import { Pedido } from './pedido';
import { Observable } from 'rxjs/Observable';
import { Utilitarios } from './utilitarios';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class PedidoService
{
private enlace:Utilitarios=new Utilitarios();
 private options;
 url:string;
    
    constructor(private http : Http)
    {
            let token =localStorage.getItem('token');
            let headers=new Headers({
                'Authorization':'Bearer '+token
    });
        this.options=new RequestOptions({headers:headers});
        this.url='http://'+this.enlace.getObjetoEnlace()+':8000/pedido';
    }

  getPedido(userinfo):Observable<Pedido[]>
 {
                     let url=`${this.url}`;
                     let iJson=JSON.stringify(userinfo);

                     return this.http.post(url,iJson,{headers:new Headers({
                        'Content-Type':'application/json'
                     })
                    })
                     .map(res=>res.json())
                     .catch(this.handleError);             
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