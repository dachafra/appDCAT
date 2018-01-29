import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';

import * as rdf from 'rdflib';
  import * as xmldom from 'xmldom/dom-parser.js';
import * as Catalog from './Catalog.modal';
import * as Dataset from './Dataset.modal';
import * as Organization from './Organization.modal';
import { Observable } from 'rxjs/Rx';




@Component({
  selector: 'app-input-rdf',
  templateUrl: './input-rdf.component.html',
  styleUrls: ['./input-rdf.component.css']
})
export class InputRdfComponent implements OnInit {
  RdfData: string;
  private currentQuery: string ;
  private errorValidator: string ;
  Erreur: any;

@ViewChild('abc')abc: string;
  constructor() { }

  ngOnInit() {
  }

  detectText() {
    this.RdfData = this.currentQuery;
  }
  Validate(): void {

    (<HTMLDivElement>document.getElementById('ErrorParse')).innerText = '';
    this.RdfData = this.currentQuery;
    let store = rdf.graph();
    let contentType = 'application/rdf+xml';
    let baseUrl = 'http://IoFTriples.com';
  rdf.parse(this.RdfData, store, baseUrl, contentType );

  console.log('Tipo Error =>  ', xmldom.errr());
  if (xmldom.errr() === undefined) {

    (<HTMLDivElement>document.getElementById('ErrorParse')).innerText = 'Parseado con éxito';
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
