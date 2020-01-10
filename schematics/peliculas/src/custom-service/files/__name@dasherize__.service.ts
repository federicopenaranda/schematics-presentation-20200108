import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { <%= classify(name) %> } from './<%= name %>.model';

interface ServerResponse {
  success: string;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('observe', 'response');


  constructor( private http: HttpClient ) { }


  public getRecords() {
    return this.http.get( 'http://localhost:3000/<%= name %>');
  }


  public loadRecord(id) {
    return this.http.get( `http://localhost:3000/<%= name %>/${id}`);
  }


  public saveRecord( record: <%= classify(name) %> ) {
    return this.http.post<ServerResponse>( 'http://localhost:3000/<%= name %>', record, { headers: this.headers });
  }


  public updateRecord( id: number, record: <%= classify(name) %> ) {
    return this.http.put<ServerResponse>( `http://localhost:3000/<%= name %>/${id}`, record, { headers: this.headers });
  }


  public deleteRecord( id: number ) {
    return this.http.delete<ServerResponse>( `http://localhost:3000/<%= name %>/${id}`, { headers: this.headers });
  }

}