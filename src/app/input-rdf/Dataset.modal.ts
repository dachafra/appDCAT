import * as jsonComp from '../templateTransportDCAT-AP.json';
export class Dataset {
  objetosIndex :any;
  sujetosIndex : any;
  constructor(objectIndex , subjectIndex){
    this.objetosIndex = objectIndex;
    this.sujetosIndex = subjectIndex;
  }

  existeDataset() : any {
    let VecesDataset:number = 0;
    let ValSubject:string;
    for(let i in this.objetosIndex) {
      //console.log("KKKK " + i);
      for ( let j in this.objetosIndex[i]){
      //  console.log("HHHH " + j);
        if (this.objetosIndex[i][j].object.value.toLowerCase() == 'http://www.w3.org/ns/dcat#dataset'){
          ValSubject = this.objetosIndex[i][j].subject.value;
          console.log(this.objetosIndex[i][j].object.value);
          console.log('Dcat:dataset existe ');
          console.log('valor del sujeto del dataset = > ' + ValSubject );
          VecesDataset++;
        }
      }
    }

    if (VecesDataset === 0 ) {
      console.error("Error Dataset=> Es obligario que exista una clase 'dataset'");
      return;
    }else {
      console.log('ValSubject' + ValSubject);
      this.MandatoryCatalog(`<${ValSubject}>`);
    return true;
    }
  }

  MandatoryCatalog(Val_Subject): void {
    // mandatory

    let ErrorDescription:string='';
    let ErrorKeyword:string='';
    let ErrorSpatial:string='';
    let ErrorTitle:string='';
    let IgualDescription: number = 0;
    let IgualKeyword: number = 0;
    let IgualSpatial: number = 0;
    let IgualTitle: number = 0;
    // Recomended
    let WarningContactPoint:string ='';
    let WarningDistribution:string = '';
    let WarningPublisher:string = '';
    let WarningTheme:string = '';
    let IgualContactPoint:number =0;
    let IgualDistribution:number =0;
    let IgualPublisher:number =0;
    let IgualTheme:number =0;
       for (let m in jsonComp['dataset'][0]) {
         if ( jsonComp['dataset'][0][m][0].type === 'mandatory') {
         for ( let l in this.sujetosIndex[Val_Subject]) {
             if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
               console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
                if(m.endsWith('description') ){
                   IgualDescription++;
                 } else if(m.endsWith('keyword') ){
                   IgualKeyword++;
                 } else if(m.endsWith('spatial') ){
                   IgualSpatial++;
                 } else if(m.endsWith('title') ){
                   IgualTitle++;
                 }
                }
             }
          }

          console.log('Recommended nodos DATASET');
      if ( jsonComp['dataset'][0][m][0].type === 'recommended') {
            for ( let l in this.sujetosIndex[Val_Subject]) {
               if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
                 console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
                 if(m.endsWith('contactPoint') ){
                 IgualContactPoint++;
               } else if(m.endsWith('distribution') ){
                 IgualDistribution++;
               } else if(m.endsWith('pulisher') ){
                 IgualPublisher++;
               } else if(m.endsWith('theme') ){
                 IgualTheme++;
               }
               }
            }
          }

         }

         if (IgualDescription === 0){
           ErrorDescription = 'Error Propiedad "Description" => propiedad obligatoria en clase Dataset (o esta mal escrito o no exista )';
          }
          if (IgualKeyword === 0){
            ErrorKeyword = 'Error Propiedad "Keyword" => propiedad obligatoria en clase Dataset (o esta mal escrito o no exista )';
           }
           if (IgualSpatial === 0){
             ErrorSpatial = 'Error Propiedad "Spatial" => propiedad obligatoria en clase Dataset (o esta mal escrito o no exista )';
            }
            if (IgualTitle === 0){
              ErrorTitle = 'Error Propiedad "Title" => propiedad obligatoria en clase Dataset (o esta mal escrito o no exista )';
               }
               (<HTMLDivElement>document.getElementById('ErrorParseDataset')).innerText = ErrorDescription+'\n' + ErrorKeyword +
                '\n' + ErrorSpatial + '\n'+ ErrorTitle;
                // Recomended Warnign
                 if (IgualContactPoint ===0){
                 WarningContactPoint = 'Warnining ContactPoint En dataset , No existe es recomendado que se implementa'  ;
                  }
                  if (IgualDistribution ===0){
                    WarningDistribution = 'Warnining Distribution En dataset , No existe y es recomendado que se implementa';
                  }
                  if(IgualPublisher === 0){
                    WarningPublisher =' Warnining Publisher  en dataset , No existe y es recomendado que se implementa';
                  }
                  if (IgualTheme === 0){
                    WarningTheme = 'Warnining Theme En dataset , No existe y es recomendado que se implementa';
                  }

                (<HTMLDivElement>document.getElementById('warningRecomendedDataset')).innerText =  IgualTheme +
                 '\n' + WarningContactPoint + '\n'+ WarningDistribution + '\n' + WarningPublisher;

        }

   }
