import { Handlerprofile } from './../models/handlerprofile.model';
import { BaseService } from './../../../shared/services/base.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Http, Response, Headers } from '@angular/http';
import { ConfigService } from 'src/app/shared/utils/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandlerprofileService extends BaseService {

  baseUrl = '';
  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }

  getHandlerProfile(): Observable<Handlerprofile> {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:align
    const authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    // tslint:disable-next-line:quotemark
    return this.http.get(this.baseUrl + "/handler/api/HandlerProfile/getProfile", { headers })
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
  }

  UpdateUserprofile(form: Handlerprofile , id: string) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:align
    const authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.put(this.baseUrl + '/handler/api/HandlerProfile/' + id, form, { headers })
      .subscribe((response) => {
        this.getHandlerProfile();
      });
  }
}
