import { Injectable } from '@angular/core';
import { Response,Headers,RequestOptions,Http } from '@angular/http';
import { Inventario } from './inventario';
import { Observable } from 'rxjs/Observable';
import { Utilitarios } from './utilitarios';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class InventarioService
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
        this.url='http://'+this.enlace.getObjetoEnlace()+':8000/inventario';
    }
 getInventarios():Observable<Inventario[]>
 {
                    let url=`${this.url}`;
                    return this.http.get(url,this.options)
                    .map(r => r.json())
                    .catch(this.handleError);
 }

getInventariosCategoria(idcategoria:number):Observable<Inventario[]>
{
        let url=`${this.url}/categoria/${idcategoria}`;
        return this.http.get(url,this.options)
        .map(r=>r.json())
        .catch(this.handleError);
}

    
 getInventario(id:number):Observable<Inventario[]>
 {
                     let url=`${this.url}/${id}`;
                     return this.http.get(url,this.options)
                     .first()
                     .map(res=>res.json())
                     .catch(this.handleError);             
 }

 addInventario(inventario:Inventario)
 {
        let url=`${this.url}`;
        let iJson=JSON.stringify(inventario);
        return this.http.post(url,iJson,this.options)
            .map(response => response.json())
            .catch(this.handleError);
 }

 putInventario(inventario:Inventario)
 {
        let url=`${this.url}`;
        let iJson=JSON.stringify(inventario);
        return this.http.put(url,iJson,this.options)
            .map(response => response.json())
            .catch(this.handleError); 
 }

 delInventario(id:number)
 {
        let url=`${this.url}/${id}`; 
        return this.http.delete(url,this.options)
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
