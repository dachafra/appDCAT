import { Component, OnInit } from '@angular/core';
import * as rdf from 'rdflib';
//import 'jquery';

@Component({
  selector: 'app-input-rdf',
  templateUrl: './input-rdf.component.html',
  styleUrls: ['./input-rdf.component.css']
})
export class InputRdfComponent implements OnInit {
  RdfData: string;
  private currentQuery: string = '';
  constructor() { }

  ngOnInit() {
  }
  detectText() {
    this.RdfData = this.currentQuery;
  }
  Validate() {
    let store= rdf.graph();
    let contentType='application/rdf+xml';
    let baseUrl="http://IoFTriples.com";
    try{
       rdf.parse(this.RdfData,store,baseUrl,contentType);
       console.log("Parseado con éxito");
      } catch(err){
        console.log(err);
      }

  }

}
