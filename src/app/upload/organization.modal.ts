import * as jsonComp from '../templateTransportDCAT-AP.json';
export class Organization {
  objetosIndex :any;
  sujetosIndex : any;
  listOrg: string[] = ["http://xmlns.com/foaf/0.1/name",
                       "http://purl.org/dc/terms/type",
                       "http://www.w3.org/2004/02/skos/core#prefLabel",
                       "http://www.w3.org/2004/02/skos/core#altLabel"];
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
      //(<HTMLDivElement>document.getElementById('ExisteOrganization')).innerText = "Error Organization => Es obligario que exista una clase 'Organization'" ;
      (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += "FatalError Organization => 'Organization' Class not defined" ;

      return;
    }else {
      console.log('ValSubject' + ValSubject);
      this.MandatoryOrganization(`<${ValSubject}>`);
    return true;
    }
  }

  MandatoryOrganization(Val_Subject): void {
    // mandatory
    let ErrorName:string='';
    let IgualName: number = 0;
    // Recomended
    let WarningType:string ='';
    let IgualType:number =0;

    for ( let n in this.sujetosIndex[Val_Subject]){
    if (n != '0'){
     if(!this.listOrg.includes(this.sujetosIndex[Val_Subject][n].predicate.value)) {
        //console.log("kldkdkdp , "+z)
        console.error(this.sujetosIndex[Val_Subject][n].predicate.value + ` => it's a wrong TransportDcat-AP Vocabulary defined in organization, it should be reviewed `);
        //(<HTMLDivElement>document.getElementById('WrongVocabulary')).innerText +=`${this.sujetosIndex[Val_Subject][n].predicate.value}  => it's a wrong TransportDcat-AP Vocabulary in organization, it should be reviewed ` +'\n';
        (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=`${this.sujetosIndex[Val_Subject][n].predicate.value}  => FatalError in organization [${Val_Subject}], it's not TransportDcat-AP Vocabulary ` +'\n';

      }
  }
}
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
          console.log('Recommended nodos DATASET');
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
           ErrorName = 'TransportDCAT-AP Error in Organization Class, Dom "Name" not defined';
          }
            //(<HTMLDivElement>document.getElementById('ErrorParseOrganization')).innerText = ErrorName;
            (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += ErrorName + '\n';

                // Recomended Warnign
         if (IgualType ===0){
           WarningType = 'TransportDCAT-AP Warnining in Organization , Dom "Type" not defined'  ;
                  }
          //  (<HTMLDivElement>document.getElementById('warningRecomendedOrganization')).innerText = WarningType ;
              (<HTMLDivElement>document.getElementById('ParserTransportDCAT2')).innerText += WarningType +'\n';

          }
   }
