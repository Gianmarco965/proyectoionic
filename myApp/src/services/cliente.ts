export class Cliente 
{

  constructor(
        public idcliente:number,
        public nombre:string,
        public apellido:string,
        public email:string,
        public celular:string,
        public genero:string,
        public empresa:string,
        public idusuario:number,
        public idrol:number,
        public idestado:number,
        public fechaingreso:string
        ) 
  { }
}