import { Injectable } from '@angular/core';
import { Response,Headers,RequestOptions,Http } from '@angular/http';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/Observable';
import { Utilitarios } from './utilitarios';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class ClienteService
{
    private enlace:Utilitarios=new Utilitarios();
    private options;
    url:string;
    constructor(private http : Http)
    {
         
        this.url='http://'+this.enlace.enlace+':8000/cliente';
    }

    getClientes():Observable<Cliente[]>
    {
        let url=`${this.url}`;
        return this.http.get(url,this.options)
        .map(r=>r.json())
        .catch(this.handleError);

    }

    getClientexID(dni:string):Observable<Cliente[]>
    {
          let url=`${this.url}/${dni}`;
                     return this.http.get(url,this.options)
                     .first()
                     .map(res=>res.json())
                     .catch(this.handleError);     
    }
    
addCliente(cliente)
 {
        let url=`${this.url}`;
        let iJson=JSON.stringify(cliente);
        return this.http.post(url,iJson,{headers:new Headers(
            {
                'Content-Type':'application/json'
            }
        )})
            .map(response => response.json())
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