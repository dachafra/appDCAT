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

  existeDataset() : any {
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
  /* for (let y in ValSubject){
     console.log('Valor jwjwh ' + ValSubject[y]);
   }*/
    if (VecesDataset === 0 ) {
      console.error("Error Dataset=> Es obligario que exista una clase 'dataset'");
      (<HTMLDivElement>document.getElementById('ExisteDataset')).innerText =  "Error Dataset=> Es obligario que exista una clase 'dataset'" ;
      return;
    }else {
      console.log("numero de datasets que existen : " + VecesDataset)
      for (let y in ValSubject ){
        console.log('ValSubject' + ValSubject[y]);
        this.MandatoryDataset(`<${ValSubject[y]}>`);
      }
      if (this.Num_IgualDistribution >= 1 ){
        for(let i in this.objetosIndex) {
          for ( let j in this.objetosIndex[i]){
            if (this.objetosIndex[i][j].object.value.toLowerCase() == 'http://www.w3.org/ns/dcat#distribution'){
              let longitud = this.objetosIndex[i].length;
              if (longitud === this.Num_IgualDistribution ){
                console.log(this.Num_IgualDistribution+ " DATASETs definidos " );
              }else {
                //console.error(`${this.Num_IgualDistribution} Distribution(s) defined in dataset(s), only ${longitud} Distribution(s) described `);
                  (<HTMLDivElement>document.getElementById('ErrorDefinicionDataset')).innerText = `${this.Num_IgualDistribution} Distribution(s) defined in dataset(s), only ${longitud} Distribution(s) described`;
              }
          }

        }
      }

      }
    return true;
  }
  }

  MandatoryDataset(Val_Subject): void {
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
    for ( let n in this.sujetosIndex[Val_Subject]){
    if (n != '0'){

     if(!this.ListDataset.includes(this.sujetosIndex[Val_Subject][n].predicate.value)) {
        //console.log("kldkdkdp , "+z)
        console.error(this.sujetosIndex[Val_Subject][n].predicate.value + ` => it's a wrong TransportDcat-AP Vocabulary, it should be reviewed `);
        (<HTMLDivElement>document.getElementById('WrongVocabulary')).innerText +=`${this.sujetosIndex[Val_Subject][n].predicate.value}  => it's a wrong TransportDcat-AP Vocabulary in Dataset, it should be reviewed ` +'\n';

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
               } else if(m.endsWith('publisher') ){
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
               (<HTMLDivElement>document.getElementById('ErrorParseDataset')).innerText += ErrorDescription+'\n' + ErrorKeyword +
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

                (<HTMLDivElement>document.getElementById('warningRecomendedDataset')).innerText +=  '\n'+ WarningTheme +
                 '\n' + WarningContactPoint + '\n'+ WarningDistribution + '\n' + WarningPublisher;
                 console.log('Num_Distribuciones ' + IgualDistribution);
                 this.Num_IgualDistribution += IgualDistribution;
                 console.log('Num_Distribuciones ' + this.Num_IgualDistribution);
        }


   }
