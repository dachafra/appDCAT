import * as jsonComp from '../templateTransportDCAT-AP.json';
export class Dataset {
  Num_IgualDistribution:number =0;
  objetosIndex :any;
  sujetosIndex : any;
  ListDataset : string[] = [  "http://purl.org/dc/terms/description",
  "http://purl.org/dc/terms/title",
  "http://purl.org/dc/terms/spatial",
  "http://www.w3.org/ns/dcat#keyword",
  "http://www.w3.org/ns/dcat#contactPoint",
  "http://www.w3.org/ns/dcat#distribution",
  "http://purl.org/dc/terms/publisher",
  "http://www.w3.org/ns/dcat#theme",
  "http://purl.org/dc/terms/accessRights",
  "http://purl.org/dc/terms/conformsTo",
  "http://xmlns.com/foaf/0.1/page",
  "http://purl.org/dc/terms/accrualPeriodicity",
  "http://purl.org/dc/terms/hasVersion",
  "http://purl.org/dc/terms/identifier",
  "http://purl.org/dc/terms/isVersionOf",
  "http://www.w3.org/ns/dcat#landingPage",
  "http://purl.org/dc/terms/language",
  "http://www.w3.org/ns/adms#identifier",
  "http://purl.org/dc/terms/provenance",
  "http://purl.org/dc/terms/relation",
  "http://purl.org/dc/terms/issued",
  "http://www.w3.org/ns/adms#sample",
  "http://purl.org/dc/terms/source",
  "http://purl.org/dc/terms/temporal",
  "http://purl.org/dc/terms/type",
  "http://purl.org/dc/terms/modified",
  "http://www.w3.org/2002/07/owl#versionInfo",
  "http://www.w3.org/ns/adms#versionNotes"];
  constructor(objectIndex , subjectIndex){
    this.objetosIndex = objectIndex;
    this.sujetosIndex = subjectIndex;
  }

  existeDataset() : boolean {
    let VecesDataset:number = 0;
    let indice: number = 0 ;
    let ValSubject: string[] = [];
    for(let i in this.objetosIndex) {
      //console.log("KKKK " + i);
      for ( let j in this.objetosIndex[i]){
      //  console.log("HHHH " + j);
      if (this.objetosIndex[i][j].object.value.toLowerCase() == 'http://www.w3.org/ns/dcat#dataset'){

      ValSubject.push(this.objetosIndex[i][j].subject.value);

      console.log(this.objetosIndex[i][j].object.value);
      console.log('Dcat:dataset existe ');
      console.log('valor del sujeto del dataset = > ' + ValSubject[indice] );

      indice++;
      VecesDataset++;
    }
  }
}

if (VecesDataset === 0 ) {
  console.error("Error Dataset=> Es obligario que exista una clase 'dataset'");
  (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=  "FatalError Dataset=> 'Dataset' Class Not Defined" + '\n' ;
  return false;
}else {
  console.log("numero de datasets que existen : " + VecesDataset);
}

for (let y in ValSubject ){
  console.log('ValSubject' + ValSubject[y]);
  if (this.MandatoryDataset(`<${ValSubject[y]}>`) === true){
    console.log(true);
  }else {return false;}

}
if (this.Num_IgualDistribution >= 1 ){
  for(let i in this.objetosIndex) {
    for ( let j in this.objetosIndex[i]){
      if (this.objetosIndex[i][j].object.value.toLowerCase() == 'http://www.w3.org/ns/dcat#distribution'){
        let longitud = this.objetosIndex[i].length;
        if (longitud === this.Num_IgualDistribution ){
          console.log(this.Num_IgualDistribution+ " Distributions definidos " );

        }else {
          //console.error(`${this.Num_IgualDistribution} Distribution(s) defined in dataset(s), only ${longitud} Distribution(s) described `);
          (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText ='\n'+ `${this.Num_IgualDistribution} Distribution(s) defined in dataset(s), only ${longitud} Distribution(s) described`+'\n';
          return false;
        }
      }

    }
  }

}

return true;
}

MandatoryDataset(Val_Subject): boolean {
  // mandatory

  let ErrorDescription:string='';
  let ErrorKeyword:string='';
  let ErrorSpatial:string='';
  let ErrorTitle:string='';
  let IgualDescription: number = 0;
  let IgualKeyword: number = 0;
  let IgualSpatial: number = 0;
  let IgualTitle: number = 0;
  let objectValueKeywords: string[] = [];
  let adminunitlevelExist: string = '';
  // Recomended
  let WarningContactPoint:string ='';
  let WarningDistribution:string = '';
  let WarningPublisher:string = '';
  let WarningTheme:string = '';
  let IgualContactPoint:number =0;
  let IgualDistribution:number =0;
  let IgualPublisher:number =0;
  let IgualTheme:number =0;
  for ( let n in this.sujetosIndex[Val_Subject]){
    if (n != '0'){

      if(!this.ListDataset.includes(this.sujetosIndex[Val_Subject][n].predicate.value)) {
        //console.log("kldkdkdp , "+z)
        let Wrong = this.sujetosIndex[Val_Subject];
        console.error(this.sujetosIndex[Val_Subject][n].predicate.value + ` => it's a wrong TransportDcat-AP Vocabulary defined in dataset  ${Val_Subject}, it should be reviewed.`);
        (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=`${this.sujetosIndex[Val_Subject][n].predicate.value} => Fatal Error in Dataset [${Val_Subject}], it's not TransportDcat-AP Vocabulary ` + '\n';
        return false;
      }
    }
  }
  for (let m in jsonComp['dataset'][0]) {
    if ( jsonComp['dataset'][0][m][0].type === 'mandatory') {
      for ( let l in this.sujetosIndex[Val_Subject]) {
        if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
          console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
          if(m.endsWith('description') ){
            IgualDescription++;
          } if(m.endsWith('keyword') ){
            IgualKeyword++;
            objectValueKeywords.push(this.sujetosIndex[Val_Subject][l].object.value.toLowerCase());
            /*if (objectValueKeyword.startsWith("adminunitlevel") || objectValueKeyword === 'bus' || objectValueKeyword === 'stops'){
              console.log(objectValueKeyword +  'Esto esta bien ');
            }*/

          } if(m.endsWith('spatial') ){
            IgualSpatial++;
          } if(m.endsWith('title') ){
            IgualTitle++;
          }
        }
      }
    }
console.log("Lista Keywords " + objectValueKeywords);
    console.log('Recommended nodos DATASET');
    if ( jsonComp['dataset'][0][m][0].type === 'recommended') {
      for ( let l in this.sujetosIndex[Val_Subject]) {
        if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
          console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
          if(m.endsWith('contactPoint') ){
            IgualContactPoint++;
          }  if(m.endsWith('distribution') ){
            IgualDistribution++;
          }  if(m.endsWith('publisher') ){
            IgualPublisher++;
          }  if(m.endsWith('theme') ){
            IgualTheme++;
          }
        }

      }
    }

  }

  if (IgualDescription === 0){
    ErrorDescription = 'TransportDCAT-AP Error in Dataset Class, Dom "Description" not defined';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += ErrorDescription+'\n';
  }
  if (IgualKeyword === 0 ){
    ErrorKeyword = 'TransportDCAT-AP Error in Dataset Class, Dom "Keyword" not defined';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += ErrorKeyword+'\n';
  }
  if (IgualKeyword < 3 ){
    ErrorKeyword = 'TransportDCAT-AP Error in Dataset Class, Dom "Keyword" should be defined At least 3 times';
(<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += ErrorKeyword+'\n';
  }
  if (IgualKeyword >= 3 ){
    if (!objectValueKeywords.includes('bus')) {
      (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=`TransportDCAT-AP Error in Dataset Class The Keyword [Bus] not defined in Dataset` +'\n';
    }if (!objectValueKeywords.includes('stops')){
      (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=`TransportDCAT-AP Error in Dataset Class The Keyword [stops] not defined in Dataset` +'\n';
    }if (!objectValueKeywords.includes('spain') && !objectValueKeywords.includes('belgium') ){
      (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=`TransportDCAT-AP Error in Dataset Class The Keyword [Belgium or Spain ] not defined in Dataset` +'\n';
    }
    for (let key in objectValueKeywords ){
      if(objectValueKeywords[key].startsWith('adminunitlevel')){
         adminunitlevelExist += 'ok';
      }else {
        console.log('hjdhjhd');
      }
    }
    if (adminunitlevelExist != 'ok'){
      (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=`TransportDCAT-AP Error in Dataset Class The Keyword [adminunitlevel] not defined in Dataset` +'\n';
    }
  /*  for(let key in objectValueKeywords ){
      if ((objectValueKeywords[key] === 'bus') || (objectValueKeywords[key] === 'stops') || (objectValueKeywords[key].startsWith('adminunitlevel')) || (objectValueKeywords[key] === 'spain') || (objectValueKeywords[key] === 'belgium')){
        console.log ( (objectValueKeywords[key]) + ' Esta Bien ');
      }else {
        (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText +=`` +'\n';
      }
    }*/
  }
  if (IgualSpatial === 0){
    ErrorSpatial = 'TransportDCAT-AP Error in Dataset Class, Dom "Spatial" not defined';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += ErrorSpatial+'\n';
  }
  if (IgualTitle === 0){
    ErrorTitle = 'TransportDCAT-AP Error in Dataset Class, Dom "Title" not defined';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += ErrorTitle+'\n';
  }

  // Recomended Warnign

  if (IgualContactPoint ===0){
    WarningContactPoint =  'TransportDCAT-AP Warnining in Dataset , Dom "ContactPoint" not defined'   ;
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT2')).innerText += WarningContactPoint +'\n';
  }
  if (IgualDistribution ===0){
    WarningDistribution = 'TransportDCAT-AP Warnining in Dataset , Dom "Distribution" not defined';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT2')).innerText += WarningDistribution +'\n';
  }
  if(IgualPublisher === 0){
    WarningPublisher ='TransportDCAT-AP Warnining in Dataset , Dom "Publisher"  not defined';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT2')).innerText += WarningPublisher +'\n';
  }
  if (IgualTheme === 0){
    WarningTheme = 'TransportDCAT-AP Warnining in Dataset , Dom "Theme" not defined';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT2')).innerText += WarningTheme +'\n';
  }
  /*(<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText += ErrorDescription+'\n' + ErrorKeyword +
  '\n' + ErrorSpatial + '\n'+ ErrorTitle;*/
  /*(<HTMLDivElement>document.getElementById('ParserTransportDCAT2')).innerText += WarningTheme +
  '\n' + WarningContactPoint + '\n'+ WarningDistribution + '\n' + WarningPublisher;*/
  console.log('Num_Distribuciones ' + IgualDistribution);
  this.Num_IgualDistribution += IgualDistribution;
  console.log('Num_Distribuciones ' + this.Num_IgualDistribution);
  if (IgualTheme === 0 || (IgualPublisher === 0) || (IgualDistribution ===0) || (IgualContactPoint ===0) || (IgualTitle === 0) || (IgualSpatial === 0) || (IgualKeyword === 0) || (IgualDescription === 0)){
    return false;
  }else {
    return true;
  }
}


}
