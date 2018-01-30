import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import {Archivo} from './file.modal';

import * as rdf from 'rdflib';
import * as xmldom from 'xmldom/dom-parser.js';
import * as Catalog from './Catalog.modal';
import * as Dataset from './Dataset.modal';
import * as Organization from './Organization.modal';
import { Observable } from 'rxjs/Rx';

// import * as fs from 'fs-extra';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Archivo;
  RdfData: string;
  RdfData2: string;

@ViewChild('abc')abc: string;
@ViewChild('myInput')
myInputVariable: any;
  constructor() {
  }

  ngOnInit() {
  }

  detectFiles(event) {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    const reader: FileReader = new FileReader();
    reader.onload = (ev: any) => {
      console.log('MEHDI');
      this.RdfData = ev.target.result;

    };
    reader.readAsText(file, 'UTF-8');



  }

  Validate() {
    (<HTMLDivElement>document.getElementById('ErrorParse')).innerText = '';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT')).innerText = '';
    (<HTMLDivElement>document.getElementById('ParserTransportDCAT2')).innerText = '';
    let store= rdf.graph();
    let contentType='application/rdf+xml';
    let baseUrl="http://IoFTriples.com";

    console.log(this.RdfData);
this.myInputVariable.nativeElement.value = "";
     rdf.parse(this.RdfData,store,baseUrl,contentType);
     console.log(store);
     console.log("Parseado con éxito");
     console.log('Tipo Error =>  ', xmldom.errr());
     //undefined
     if (xmldom.errr() === '' ) {

       (<HTMLDivElement>document.getElementById('ErrorParse')).innerText = 'RDF/XML parsed Successfully';
       let stms = store.statementsMatching(undefined, undefined , undefined);

        console.log(stms);
        let node1 = store;
        console.log(node1);
        let objetosIndex = store.objectIndex;
        let sujetosIndex = store.subjectIndex;

        let Catalogo = new Catalog.Catalog(objetosIndex, sujetosIndex);
        let Dataset_ = new Dataset.Dataset(objetosIndex, sujetosIndex);
        let Organization_ = new Organization.Organization(objetosIndex, sujetosIndex);

        console.log("Aqui se el parser de Catalog");
        Catalogo.existeCatalog();
        console.log("Aqui se el parser de Dataset");
        Dataset_.existeDataset();
        console.log("el parser del Organization");
        Organization_.existeOrganization();


        //return true;
     }else {
       // (<HTMLDivElement>document.getElementById('ErrorParse')).innerText = '';

     (<HTMLDivElement>document.getElementById('ErrorParse')).innerText = xmldom.errr();



     //  xmldom.errr()='';
    // return false;
      }


    }
  }
