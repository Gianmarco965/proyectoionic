import { Injectable } from '@angular/core';
import { Response,Headers,RequestOptions,Http } from '@angular/http';
import { Pedido } from './pedido';
import { Observable } from 'rxjs/Observable';
import { Utilitarios } from './utilitarios';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class DeudaService
{
private enlace:Utilitarios=new Utilitarios();
 url:string;
 private options;
    
    constructor(private http : Http)
    {
            let token =localStorage.getItem('token');
            let headers=new Headers({
                'Authorization':'Bearer '+token
    });
        this.options=new RequestOptions({headers:headers});
        this.url='http://'+this.enlace.getObjetoEnlace()+':8000/deuda';
    }

addDeuda(deuda)
 {
        let url=`${this.url}`;
        let iJson=JSON.stringify(deuda);
        return this.http.post(url,deuda,this.options)
            .map(response => response.json())
            .catch(this.handleError);
            
 }

 getDeudas(campo:string,valor:string):Observable<Pedido[]>//cambiar de nombre
 {
    let url=`${this.url}/sales/${campo}/${valor}/`;
        return this.http.get(url,this.options)
        .map(r=>r.json())
        .catch(this.handleError);
 }

 addDetalleDeuda(detalledeuda)
 {
        let url=`${this.url}/detalledeuda/`;
        let iJson=JSON.stringify(detalledeuda);
        return this.http.post(url,detalledeuda,this.options)
            .map(response => response.json())
            .catch(this.handleError);
            
 }

 addDeudaPay(deuda)
 {
    let url=`${this.url}/pay/`;
    let iJson=JSON.stringify(deuda);
    return this.http.post(url,deuda,this.options)
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