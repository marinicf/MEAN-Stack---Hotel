import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { Rezervacija } from './rezervacija.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  baseUrl:string = 'http://127.0.0.1:3000/'

  dajSveRez(){
    return this.http.get(this.baseUrl + 'rezervacije')
    .pipe(
      map((resData:[]) =>{
        return resData
      }),catchError(this.handleError));
  }

  addRez(rezData: Rezervacija){
    return this.http.post(this.baseUrl + 'rezervacije', rezData )
  }

  putRez(editData:any, id:number){
    return this.http.put(this.baseUrl + 'rezervacije/'+id, editData)
  }

  deleteRez(id:number){
    return this.http.delete(this.baseUrl + 'rezervacije/'+id)
  }

  //rxjs uvjek vraca observable
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
