import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthServices } from './auth-services.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Form } from '@angular/forms';
import { delay, map } from 'rxjs/operators';

export interface ResData {
  mathongbao?: number,
  thongbao?: string,
  dulieu?: any,
}

@Injectable({
  providedIn: 'root'
})
export class PostServices {

  private BASE_URL = environment.ApiEndpoint.BASE;

  constructor(private http: HttpClient, private auth: AuthServices) { }

  // Hàm này mặc định không được thây đổi giá trị nào
  private hamGui(url: string, params: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'NHANVIEN_ID': this.auth.nhanVienId.toString(),
        'NGUOIDUNG_ID': this.auth.nguoiDungId.toString(),
        'DONVI_ID': this.auth.donViId.toString(),
        'LOG_DN_ID': this.auth.logDnId.toString(),
        'MODULE_ID': this.auth.moduleId.toString(),
      })
    };

    params['V_NGONNGU_ID'] = this.auth.ngonngu;
    params['V_LOG_DN_ID'] = this.auth.logDnId;
    params['V_FORM_ID'] = this.auth.formId;
    params['V_DONVI_ID'] = this.auth.donViId;
    params['V_NHANVIEN_ID'] = this.auth.nhanVienId;
    params['V_NGUOIDUNG_ID'] = this.auth.nguoiDungId;
    params['V_SERVER_ID'] = this.auth.serverId;
    params['V_MODULE_ID'] = this.auth.moduleId;

    return this.http.post(url, params, httpOptions);
  }
}
