  import * as jsonComp from '../templateTransportDCAT-AP.json';
  export class Catalog {
    objetosIndex :any;
    sujetosIndex : any;
    ListCatalog : string[] = ["http://www.w3.org/ns/dcat#dataset",
                              "http://purl.org/dc/terms/description",
                              "http://purl.org/dc/terms/publisher",
                              "http://purl.org/dc/terms/spatial",
                              "http://purl.org/dc/terms/title",
                              "http://xmlns.com/foaf/0.1/homepage",
                              "http://purl.org/dc/terms/language",
                              "http://purl.org/dc/terms/license",
                              "http://purl.org/dc/terms/issued",
                              "http://www.w3.org/ns/dcat#themeTaxonomy",
                              "http://purl.org/dc/terms/modified",
                              "http://purl.org/dc/terms/hasPart",
                              "http://purl.org/dc/terms/isPartOf",
                              "http://www.w3.org/ns/dcat#record",
                              "http://purl.org/dc/terms/rights"];
    constructor(objectIndex , subjectIndex){
      this.objetosIndex = objectIndex;
      this.sujetosIndex = subjectIndex;
    }

    existeCatalog() : any {


      let VecesCatalog:number = 0;
      let ValSubject:string;
      let Err_ExisteCatalog:string ='';
      for(let i in this.objetosIndex) {
        //console.log("KKKK " + i);
        for ( let j in this.objetosIndex[i]){
         //console.log("HHHH " + j);
          if (this.objetosIndex[i][j].object.value.toLowerCase() == 'http://www.w3.org/ns/dcat#catalog'){
            //console.log(" MADRIDSOSSAI " + this.objetosIndex[i].length);
            ValSubject = this.objetosIndex[i][j].subject.value;
            console.log(this.objetosIndex[i][j].object.value);
            console.log('Dcat:Cataolog  existe ');
            console.log('valor del sujeto del catalogo = > ' + ValSubject );
            VecesCatalog++;
          }
        }
      }

      if (VecesCatalog === 0 ) {
        console.error("Error Catalog => Es obligario que exista una clase 'Catalog'");
        Err_ExisteCatalog =`Catalog class doesn't exist , it's a mandatory Class => it should be implemented`;
        (<HTMLDivElement>document.getElementById('ExisteCatalog')).innerText =  Err_ExisteCatalog ;
        return;
      }else {
        this.MandatoryCatalog(`<${ValSubject}>`);
      return true;
      }
    }

    MandatoryCatalog(Val_Subject): void {
      // mandatory
      let ErrorDataset:string ='';
      let ErrorDescription:string='';
      let ErrorPublisher:string='';
      let ErrorSpatial:string='';
      let ErrorTitle:string='';
      let IgualDataset: number = 0;
      let IgualDescription: number = 0;
      let IgualPublisher: number = 0;
      let IgualSpatial: number = 0;
      let IgualTitle: number = 0;
      // Recomended
      let WarningHomePage:string ='';
      let WarningLanguage:string = '';
      let WarningLicense:string = '';
      let WarningIssued:string = '';
      let WarningThemeTaxonomy:string = '';
      let WarningModified:string='';
      let IgualHomepage:number =0;
      let IgualLanguage:number =0;
      let IgualLicense:number =0;
      let IgualIssued:number =0;
      let IgualThemeTaxonomy:number =0;
      let IgualModified:number =0;
        for ( let n in this.sujetosIndex[Val_Subject]){
        if (n != '0'){

         if(!this.ListCatalog.includes(this.sujetosIndex[Val_Subject][n].predicate.value)) {
            //console.log("kldkdkdp , "+z)
            console.log(this.sujetosIndex[Val_Subject][n].predicate.value + ` => it's a wrong TransportDcat-AP Vocabulary, it should be reviewed `);
            (<HTMLDivElement>document.getElementById('WrongVocabulary')).innerText +=`${this.sujetosIndex[Val_Subject][n].predicate.value}  => it's a wrong TransportDcat-AP Vocabulary in Catalog, it should be reviewed ` +'\n';

          }
      }
        //console.log("jlfkldkdld");
        //console.log(z);
      }
         for (let m in jsonComp['catalog'][0]) {

           if ( jsonComp['catalog'][0][m][0].type === 'mandatory') {
           for ( let l in this.sujetosIndex[Val_Subject]) {
               if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
                 console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
                     if(m.endsWith('dataset')) {
                     IgualDataset++;
                   } else if(m.endsWith('description') ){
                     IgualDescription++;
                   } else if(m.endsWith('publisher') ){
                     IgualPublisher++;
                   } else if(m.endsWith('spatial') ){
                     IgualSpatial++;
                   } else if(m.endsWith('title') ){
                     IgualTitle++;
                   }
                  }
               }

            }

            console.log('Recommended nodos');
          if ( jsonComp['catalog'][0][m][0].type === 'recommended') {
              for ( let l in this.sujetosIndex[Val_Subject]) {
                 if (this.sujetosIndex[Val_Subject][l].predicate.value === m) {
                   console.log(m + ' y ' + this.sujetosIndex[Val_Subject][l].predicate.value + ' son Iguales' );
                   if(m.endsWith('homepage')) {
                   IgualHomepage++;
                 } else if(m.endsWith('language') ){
                   IgualLanguage++;
                 } else if(m.endsWith('license') ){
                   IgualLicense++;
                 } else if(m.endsWith('issued') ){
                   IgualIssued++;
                 } else if(m.endsWith('themeTaxonomy') ){
                   IgualThemeTaxonomy++;
                 } else if (m.endsWith('modified')){
                   IgualModified++;
                 }
                 }
              }
            }

           }
           if (IgualDataset >=1 ){
             for(let i in this.objetosIndex) {
               for ( let j in this.objetosIndex[i]){
                 if (this.objetosIndex[i][j].object.value.toLowerCase() == 'http://www.w3.org/ns/dcat#dataset'){
                   let longitud = this.objetosIndex[i].length;
                   if (longitud === IgualDataset ){
                     console.log(IgualDataset + " DATASETs definidos " );
                   }else {
                    // console.error(`${IgualDataset} dataset(s) defined in Catalog, only ${longitud} dataset(s) described `);
                    (<HTMLDivElement>document.getElementById('ErrorDefinicionCatalog')).innerText = `${IgualDataset} dataset(s) defined in Catalog, only ${longitud} dataset(s) described `;

                   }
               }

             }
           }
         }
           if (IgualDataset === 0){
             ErrorDataset = `Error Propiedad "dataset" => propiedad obligaria en la Clase Catalog (o esta mal escrito o no exista )`;
           }
           if (IgualDescription === 0){
             ErrorDescription = `Error Propiedad "Description" => propiedad obligatoria en clase Catalog (o esta mal escrito o no exista )`;
            }
            if (IgualPublisher === 0){
              ErrorPublisher = `Error Propiedad "Publisher" => propiedad obligatoria en clase Catalog (o esta mal escrito o no exista )`;
             }
             if (IgualSpatial === 0){
               ErrorSpatial = `Error Propiedad "Spatial" => propiedad obligatoria en clase Catalog (o esta mal escrito o no exista )`;
              }
              if (IgualTitle === 0){
                ErrorTitle = `Error Propiedad "Title" => propiedad obligatoria en clase Catalog (o esta mal escrito o no exista )`;
                 }
                 (<HTMLDivElement>document.getElementById('ErrorParseCatalog')).innerText =  ErrorDataset +'\n'+ ErrorDescription+'\n' +ErrorPublisher +
                  '\n' + ErrorSpatial + '\n'+ ErrorTitle;
                  // Recomended Warnign
                   if (IgualHomepage ===0){
                   WarningHomePage = ` Warnining HomePage En Catalogo , No existe es recomendado que se implementa `;
                    }
                    if (IgualLanguage ===0){
                      WarningLanguage=` Warnining Language En Catalogo , No existe y es recomendado que se implementa`;
                    }
                    if(IgualLicense === 0){
                      WarningLicense = ` Warnining License en Catalogo , No existe y es recomendado que se implementa`;
                    }
                    if (IgualIssued === 0){
                      WarningIssued =` Warnining Issued En Catalogo , No existe y es recomendado que se implementa`;
                    }
                    if (IgualThemeTaxonomy === 0){
                      WarningThemeTaxonomy =` Warnining ThemeTaxonomy En Catalogo , No existe y es recomendado que se implementa`;
                    }
                    if (IgualModified === 0){
                      WarningModified =` Warnining Modified En Catalogo , No existe y es recomendado que se implementa`;
                    }

                  (<HTMLDivElement>document.getElementById('warningRecomendedCatalog')).innerText =  WarningHomePage +'\n'+ WarningLanguage+'\n' +WarningLicense +
                   '\n' + WarningIssued + '\n'+ WarningThemeTaxonomy + '\n' + WarningModified;

          }
          NodesCatalog(): void {
            console.log('catalog' );
            for(let k in jsonComp["catalog"][0]){
              console.log(jsonComp["catalog"][0][k][0].type);
            }
            console.log("MADRID");
            console.log(jsonComp["catalog"]);
          }
     }
     /*DatasetExiste(): void {
       let StringImpreso:string = '';
       let NumeroDataset:number =0;
       let NumeroDescription:number =0;
       let NumeroSpatial:number =0;
       let NumeroPublisher:number = 0;
       let NumeroTitle:number = 0;
         console.log("aqui lista de los predicados");
           for ( let l in this.predicadosIndex) {
           if  (l.endsWith('dataset>')){
             NumeroDataset++;
           }
           else if(l.endsWith('description>')){
             NumeroDescription ++;
           }
           else if(l.endsWith('spatial>')){
             NumeroSpatial ++;
           }else if(l.endsWith('title>')){
             NumeroTitle++;
           }else if(l.endsWith('publisher>')){
             NumeroTitle++;
           }
       }
       console.log("aqui Termina");
     }*/
