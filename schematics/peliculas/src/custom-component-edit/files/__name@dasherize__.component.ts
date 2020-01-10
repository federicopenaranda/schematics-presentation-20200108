import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import { <%= classify(tabla) %> } from '../shared/<%= dasherize(tabla) %>.model';
import { <%= classify(tabla) %>Service } from '../shared/<%= dasherize(tabla) %>.service';


@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.css']
})
export class <%= classify(name) %>Component implements OnInit {

  public formData: <%= classify(tabla) %> = new <%= classify(tabla) %> ();
  public recordForm: FormGroup;
  public recordFile1: string = '';
  public editedRecordId: number = 0;
  public editedRecord$ = new BehaviorSubject<number>(0);
  public id: number = 0;

  constructor(private service: <%= classify(tabla) %>Service, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.recordForm = new FormGroup({
      <% for (let i=1; i<fields2.length; i++) { %> 
        '<%= fields2[i].name %>': new FormControl(null),
      <% } %>
    });

    this.route.paramMap.subscribe((params: any) => {
      this.editedRecordId = params.params.id;

      if (params.params.id) {
        this.editedRecord$.next(params.params.id);
        this.editedRecordId = params.params.id;
      } else {
        this.editedRecordId = 0;
      }
    });

    this.editedRecord$.subscribe(recordId => recordId > 0 ? this.loadRecord(recordId) : null);
  }


loadRecord(id: number) {
  this.service.loadRecord(id).subscribe(
    (loadedRecord: any) => {
      <% for (let i=0; i<fields2.length; i++) { %> 
        this.recordForm.get('<%= fields2[i].name %>').setValue(loadedRecord[0].<%= fields2[i].name %>);
      <% } %>
    }
  );
}


saveRecord() {
  this.formData = Object.assign(this.formData, this.recordForm.value);

  this.service.saveRecord(this.formData).subscribe(
    (data: any) => this.router.navigate(['<%= dasherize(module) %>/<%= dasherize(name) %>'])
  );
}


updateRecord() {
  this.formData = Object.assign(this.formData, this.recordForm.value);
  this.formData.id_<%= tabla %> = this.editedRecordId;

  this.service.updateRecord(this.formData.id_<%= tabla %>, this.formData).subscribe(
    (data: any) => this.router.navigate(['<%= dasherize(module) %>/<%= dasherize(name) %>'])
  );
}


  /* getCategoriasValues(categorias: Array<number>) {
    this.categoriaPelicula.push(...categorias)
  } */


}
