import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DistritoService {
    constructor(public http:Http) {}

getData() {
  //  let params = new URLSearchParams();
  //  params.set('search', idubigeo); // the passed parameter: term

    //return this.http.get("assets/data/provincias.json",{search:params})
       // .map((res:Response) => res.json()); //records in this case
       return this.http.get("assets/data/distritos.json")
       .map((res:Response) => res.json()); //records in this case
  }
}