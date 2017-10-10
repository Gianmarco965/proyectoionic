import { Injectable } from '@angular/core';
import { Response,Headers,RequestOptions,Http } from '@angular/http';
import { DetalleCuota } from './detallecuota';
import { Observable } from 'rxjs/Observable';
import { Utilitarios } from './utilitarios';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class DetalleCuotaService
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
        this.url='http://'+this.enlace.getObjetoEnlace()+':8000/detallecuota';
    }

  getdetallecuota(idcuota):Observable<DetalleCuota[]>
{
        let url=`${this.url}/${idcuota}/`;
        return this.http.get(url,this.options)
        .map(r=>r.json())
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