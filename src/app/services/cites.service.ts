import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cite, CiteDataSend, ResponseCite, ResponseCiteUpdate, UpdateStatusCite } from '../models/Cite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitesService {

  private URL_API: string = environment.baseUrlApu;
  private httpClient = inject(HttpClient);

  getCites(typeCite: string = ''): Observable<ResponseCite> {
    return this.httpClient.get<ResponseCite>(this.URL_API + `/cites/${typeCite}`)
  }

  getCitesByUser(id: string, typeCite: string): Observable<ResponseCite> {
    return this.httpClient.get<ResponseCite>(this.URL_API + `/cites/user/${id}/${typeCite}`)
  }

  postAddCite(body: CiteDataSend): Observable<any> {
    return this.httpClient.post(this.URL_API + '/cites', body)
  }

  postUpdateCite(body: UpdateStatusCite, id: string): Observable<any> {
    return this.httpClient.put<ResponseCiteUpdate>(this.URL_API + `/cites/${id}`, body)
  }

}
