import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Utilitarios } from './utilitarios';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  enlace:Utilitarios=new Utilitarios();
  usuario:string;
  loggedIn:boolean;
  url:string;
  
  
  constructor(private http:Http)
  {
    this.usuario='';
    this.loggedIn=false;
    this.url='http://'+this.enlace.enlace+':8000/auth';
}


  login(userInfo){
    let url=`${this.url}/login`;
    let iJson=JSON.stringify(userInfo);

    return this.http.post(url,iJson,{headers:new Headers({
        'Content-Type':'application/json'
    })
  })
    .map(res=>res.text())
    .map(res=>{
        if(res=="error" || res=="nofound")
        {
          this.loggedIn=false;

        }
        else
        {
          localStorage.setItem('token',res);
          
          this.usuario=userInfo.usuario;
         

          
          this.loggedIn=true;

        }
        return this.loggedIn;

    });
  }


  logout():void
  {
      localStorage.removeItem('token');
      this.usuario='';
      this.loggedIn=false;

  }
  isloggedIn()
  {
      return this.loggedIn;
      

  }

  
}
