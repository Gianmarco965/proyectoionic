import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DepartamentoService {
    constructor(public http:Http) {}

getData() {
    return this.http.get("assets/data/departamentos.json")
        .map((res:Response) => res.json()); //records in this case
  }
}