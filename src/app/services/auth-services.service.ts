import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { LocalKey } from './local-key';
import { HttpHeaders } from '@angular/common/http';
import { ConfirmationDialogService } from './../components/confirm-dialog/confirm-dialog.service';

interface StoreUserCredential {
  nhanvien_id: number;
  nguoidung_id: number;
  donvi_id: number;
  log_dn_id: number;
  tennguoidung: string;
  avatar: string;
  module_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  ngonngu: number = 1;
  logDnId: number = 0;
  formId: number = 1;
  donViId: number = 0;
  nhanVienId: number = 0;
  nguoiDungId: number = 0;
  serverId: number = 1;
  moduleId: number = 0;
  routerData: string = '';
  thongTinTraoDoi: boolean = false;
  isFormCongViec: boolean = false;

  tenNguoiDung: string = '';
  avatar: string = '';
  truyCap: boolean = false;
  url: string = '';

  //
  tempHSC_hopdong_id: any;
  tempHSC_dvtn_id: any;
  tempHSC_quytrinh_id: any;
  tempHSC_kieu_yc_id: any;

  // dot cap so nha
  tempDotCapId: string;
  ten_nv: string;
  donvi_nd_id: string;

  // cap so nha don le
  tempDiaChiId: string;
  tempSoTo: string;
  tempSoThua: string;
  tempHoSoId: string;

  // giao ho so di
  tempidHoSoGiao: number;
  tempiddonvitiepnhan: number;
  tempidquytrinh: number;
  tempidkieuyc: number;
  tempidtths: number;
  tempidphuongxa: number;

  private _isLogin = new Subject();
  isLogin$ = this._isLogin.asObservable();


  private _isModule = new Subject();
  isModule$ = this._isModule.asObservable();

  constructor(private dialog: ConfirmationDialogService) {
    this.loadUserCredentials();
  }

  private loadUserCredentials() {
    if (localStorage.getItem(LocalKey.STORE_KEY) !== null) {
      const res: any = localStorage.getItem(LocalKey.STORE_KEY);
      this.storeUserCredential(JSON.parse(res));
    }
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        const token = localStorage.getItem(LocalKey.STORE_KEY);
        if (token === undefined || token === null) {
          this.clearUserCredential();
        } else {
          const store: StoreUserCredential = JSON.parse(token);
          if (store.module_id === this.moduleId) {
            this.storeUserCredential(JSON.parse(token));
          } else {
            this.nhanVienId = 0;
            this.nguoiDungId = 0;
            this.donViId = 0;
            this.logDnId = 0;
            this.tenNguoiDung = '';
            this.avatar = '';
            this.truyCap = false;
            this._isLogin.next(false);
          }
        }
      }
    }, false);
  }

  storeUserCredential(store: StoreUserCredential) {
    this.nhanVienId = store.nhanvien_id ? store.nhanvien_id : 0;
    this.nguoiDungId = store.nguoidung_id ? store.nguoidung_id : 0;
    this.donViId = store.donvi_id ? store.donvi_id : 0;
    this.logDnId = store.log_dn_id ? store.log_dn_id : 0;
    this.tenNguoiDung = store.tennguoidung ? store.tennguoidung : '';
    this.avatar = store.avatar ? store.avatar : '';
    this.moduleId = store.module_id ? store.module_id : this.moduleId;
    this.truyCap = true;
    localStorage.setItem(LocalKey.STORE_KEY, JSON.stringify(store));
    this._isLogin.next(true);
  }

  clearUserCredential() {
    this.nhanVienId = 0;
    this.nguoiDungId = 0;
    this.donViId = 0;
    this.logDnId = 0;
    this.tenNguoiDung = '';
    this.avatar = '';
    this.truyCap = false;
    localStorage.removeItem(LocalKey.STORE_KEY);
    this._isLogin.next(false);
  }

  kiemTraModule(moduleId: number) {
    if (this.moduleId !== moduleId) {
      this.clearUserCredential();
    }
    this.moduleId = moduleId;
    this._isModule.next(true);
  }

  public storeDoanhNghiep(_maThamDinh, _maDoanhNghiep) {
    // this.tempidHoSoGiao = _idHoSoGiao;
    localStorage.setItem(LocalKey.LOCAL_CRM_DOANHNGHIEP.DOANHNGHIEP_MATD, _maThamDinh);
    localStorage.setItem(LocalKey.LOCAL_CRM_DOANHNGHIEP.DOANHNGHIEP_MADN, _maDoanhNghiep);
  }

  public storeGiaoPhieu(_idHoSoGiao) {
    this.tempidHoSoGiao = _idHoSoGiao;
    // this.tempiddonvitiepnhan = _quytrinhid;
    // this.tempidquytrinh = _kieuycid;
    // this.tempidkieuyc = _donvitiepnhanid;
    // this.tempidtths = _tths_id;
    // this.tempidphuongxa = _phuongxa_id;
    localStorage.setItem(LocalKey.LOCAL_HSG.HSGID, _idHoSoGiao);
    // localStorage.setItem(LocalKey.LOCAL_HSG.DVTNID, _donvitiepnhanid);
    // localStorage.setItem(LocalKey.LOCAL_HSG.KIEUYCID, _kieuycid);
    // localStorage.setItem(LocalKey.LOCAL_HSG.QTID, _quytrinhid);
    // localStorage.setItem(LocalKey.LOCAL_HSG.TTHS, _tths_id);
    // localStorage.setItem(LocalKey.LOCAL_HSG.PHUONGXAID, _phuongxa_id);
  }

  public storeChuyenHoSoCapSoNha(_hopdong_id, _quytrinhid, _kieuycid, _donvitiepnhanid) {
    this.tempHSC_hopdong_id = _hopdong_id;
    this.tempHSC_quytrinh_id = _quytrinhid;
    this.tempHSC_kieu_yc_id = _kieuycid;
    this.tempHSC_dvtn_id = _donvitiepnhanid;
    localStorage.setItem(LocalKey.LOCAL_CHUYENHOSO.HOPDONG_ID, _hopdong_id);
    localStorage.setItem(LocalKey.LOCAL_CHUYENHOSO.QTID, _quytrinhid);
    localStorage.setItem(LocalKey.LOCAL_CHUYENHOSO.KIEUYCID, _kieuycid);
    localStorage.setItem(LocalKey.LOCAL_CHUYENHOSO.DVTNID, _donvitiepnhanid);
  }

  public storeDotCap(_dotcapid) {
    this.tempDotCapId = _dotcapid;
    localStorage.setItem(LocalKey.LOCAL_DOTCAP.DOTCAP_ID, _dotcapid);
  }

  public storeCapSoNha(_hoSoId, _diaChiId, _soTo, _soThua, _idPhuongXa) {
    this.tempHoSoId = _hoSoId;
    this.tempDiaChiId = _diaChiId;
    this.tempSoThua = _soThua;
    this.tempSoTo = _soTo;
    localStorage.setItem(LocalKey.LOCAL_CAPSONHA.HOSO_ID, _hoSoId);
    localStorage.setItem(LocalKey.LOCAL_CAPSONHA.DIACHI_ID, _diaChiId);
    localStorage.setItem(LocalKey.LOCAL_CAPSONHA.SOTHUA, _soThua);
    localStorage.setItem(LocalKey.LOCAL_CAPSONHA.SOTO, _soTo);
    localStorage.setItem(LocalKey.LOCAL_CAPSONHA.IDPHUONGXA, _idPhuongXa);
  }

  public httpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'LOG_DN_ID': this.logDnId.toString(),
        'FORM_ID': this.formId.toString(),
        'DONVI_ID': this.donViId.toString(),
        'NHANVIEN_ID': this.nhanVienId.toString(),
        'NGUOIDUNG_ID': this.nguoiDungId.toString(),
        'DVTK_ID': this.donViId.toString(),
        'SERVER_ID': this.serverId.toString(),
        'TOKEN': 'huqf15www4',
        'MODULE_ID': this.moduleId.toString(),
      })
    };
    return {
      httpOptions: httpOptions
    };
  }

  kiemTraQuyenDangNhap(idMod, pageName) {
    let hanhDong = 1;
    let ketQua = false;
    if (idMod === 1) { } else if (idMod === 2) {
      hanhDong = 2;
    }
    return new Observable((observer: Observer<any>) => {
      // this.postHT2000ThuTucTongHop(0, 9, 5, hanhDong, 9,
      //   localStorage.getItem(LocalKey.LOCAL_KEY.MODULE_ID), localStorage.getItem(LocalKey.LOCAL_KEY.NGUOIDUNG_ID),
      //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      //   pageName, '', '', '', '', '', '', '', '', '', '', '', '').subscribe(data => {
      //     const res: any = data;
      //     if (res.mathongbao === 1) {
      //       if (res.dulieu.table1.length > 0) {
      //         if (res.dulieu.table2.length > 0) {
      //           res.dulieu.table2.forEach(element => {
      //             if (Number(element.id) === Number(res.dulieu.table1[0].id)) {
      //               ketQua = true;
      //             }
      //           });
      //         }
      //         observer.next({ access: ketQua, thongbao: 'Bạn không có quyền truy cập menu này, vui lòng liên hệ quản trị viên để biết chi tiết !' });
      //         observer.complete();
      //       } else {
      //         // this.dialog.confirm('Không có dữ liệu về trang này!', 'warning', false);
      //         // * trang nay chua duoc khai bao trong csdl
      //         observer.next({ access: ketQua, thongbao: '' });
      //         observer.complete();
      //       }
      //     }
      //   }, (err) => {
      //     // this.dialog.confirm(err, 'warning', false);
      //     this.dialog.confirm('Thông báo', err, 'Đồng ý', 'Hủy', false, 'warning');
      //   });
    });
  }


}
