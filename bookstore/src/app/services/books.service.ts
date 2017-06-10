import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Book} from '../models/Book';

@Injectable()
export class BooksService {

  constructor(private http: Http) {

  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }


  getAllBooks(): Observable<Book[]> {
    return this.http.get("api/books").map(this.extractData).catch(this.handleError);
  }

  getBookById(id: string):Observable<Book> {
    console.log("Service-"+id);
    return this.http.get("api/book/"+id).map(this.extractData).catch(this.handleError);
  }


  updateBook(book: any):Observable<Book>  {

    let url:string = ("api/book/"+book._id);

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(url, book, {headers:headers}).map(this.extractData).catch(this.handleError);
  }
  saveBook(book: Book):Observable<Book>  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post("api/book", book, {headers:headers}).map(this.extractData).catch(this.handleError);
  }

  removeBook(id: string):Observable<string> {
    return this.http.delete("api/book/"+id).map(this.extractData).catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
