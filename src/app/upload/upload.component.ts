import { Component, OnInit } from '@angular/core';
import {Archivo} from './file.modal';

import * as rdf from 'rdflib';

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

  constructor() {
  }

  ngOnInit() {
  }

  detectFiles(event) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (ev: any) => {
      console.log('MEHDI');
      this.RdfData = ev.target.result;

    };
    reader.readAsText(file, 'UTF-8');
  }

  Validate() {
    let store= rdf.graph();
    let contentType='application/rdf+xml';
    let baseUrl="http://IoFTriples.com";
    console.log(this.RdfData);
    try{
     rdf.parse(this.RdfData,store,baseUrl,contentType);
     console.log("Parseado con éxito");
      } catch(err){
        console.log(err);
      }
    }
  }
