import { Component, OnInit } from '@angular/core';
import { <%= classify(tabla) %>Service } from '../shared/<%= dasherize(tabla) %>.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.css']
})
export class <%= classify(name) %>Component implements OnInit {

  public records;
  private reloadList = new BehaviorSubject<boolean>(false);

  constructor( private service: <%= classify(tabla) %>Service ) { }

  ngOnInit() {
    this.getListData();
    this.reloadList.subscribe( update => update === true ? this.getListData() : null);
  }


  getListData() {
    this.records = this.service.getRecords();
  }


  removeItem( id: number ) {
    this.service.deleteRecord(id).subscribe(
      (response: any) => this.reloadList.next(true)
    );
  }

}