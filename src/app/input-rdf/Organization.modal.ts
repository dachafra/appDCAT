import * as jsonComp from '../templateTransportDCAT-AP.json';
export class Organization {
  objetosIndex :any;
  sujetosIndex : any;
  constructor(objectIndex , subjectIndex){
    this.objetosIndex = objectIndex;
    this.sujetosIndex = subjectIndex;
  }
  existeOrganization() : any {
    let VecesOrganization:number = 0;
    let ValSubject:string;
    for(let i in this.objetosIndex) {
      //console.log("KKKK " + i);
      for ( let j in this.objetosIndex[i]){
      //  console.log("HHHH " + j);
        if (this.objetosIndex[i][j].object.value.toLowerCase() == 'http://www.w3.org/ns/org#organization'){
          ValSubject = this.objetosIndex[i][j].subject.value;
          console.log(this.objetosIndex[i][j].object.value);
          console.log('Dcat:Organization  existe ');
          console.log('valor del sujeto del Organization = > ' + ValSubject );
          VecesOrganization++;
        }
      }
    }

    if (VecesOrganization === 0 ) {
      console.error("Error Organization => Es obligario que exista una clase 'Organization'");
      return;
    }else {
      console.log('ValSubject' + ValSubject);
      this.MandatoryCatalog(`<${ValSubject}>`);
    return true;
    }
  }

  MandatoryCatalog(Val_Subject): void {
    // mandatory
    let ErrorName:string='';
    let IgualName: number = 0;
    // Recomended
    let WarningType:string ='';
    let IgualType:number =0;
       for (let m in jsonComp['organization'][0]) {
         if ( jsonComp['organization'][0][m][0].type === 'mandatory') {
         for ( let l in this.sujetosIndex[Val_Subject]) {
             if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
               console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
                if(m.endsWith('name') ){
                   IgualName++;
                 }
                }
             }
          }
          console.log('Recommended nodos Organization');
      if ( jsonComp['organization'][0][m][0].type === 'recommended') {
            for ( let l in this.sujetosIndex[Val_Subject]) {
               if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
                 console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
                 if(m.endsWith('type') ){
                 IgualType++;
               }
               }
            }
          }
           }
         if (IgualName === 0){
           ErrorName = 'Error Propiedad "Name" => propiedad obligatoria en clase Organization (o esta mal escrito o no exista )';
          }
            (<HTMLDivElement>document.getElementById('ErrorParseDataset')).innerText = ErrorName;
                // Recomended Warnign
         if (IgualType ===0){
           WarningType = 'Warnining Type En Organization , No existe es recomendado que se implementa'  ;
                  }
            (<HTMLDivElement>document.getElementById('warningRecomendedDataset')).innerText = WarningType ;
          }
   }
