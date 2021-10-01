import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostServices, ResData } from './post-services.service';
import { AuthServices } from 'src/app/services/auth-services.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Observable, Observer } from 'rxjs';
import { ConfirmationDialogService } from '../components/confirm-dialog/confirm-dialog.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

class PropsTimer { days?: number; hours?: number; minutes?: number; seconds: number; }
@Injectable({
  providedIn: 'root'
})


export class UtilsService {
  listKyTuDacBiet = [
    'alter',
    'begin',
    'cast',
    'create',
    'cursor',
    'declare',
    'delete',
    'drop',
    'exec',
    'execute',
    'fetch',
    'insert',
    'kill',
    'open',
    'select',
    'sys',
    'sysobjects',
    'syscolumns',
    'table',
    'update',
    '<script',
    '</script',
    'ALTER',
    'BEGIN',
    'CAST',
    'CREATE',
    'CURSOR',
    'DECLARE',
    'DELETE',
    'DROP',
    'EXEC',
    'EXECUTE',
    'FETCH',
    'INSERT',
    'KILL',
    'OPEN',
    'SELECT',
    'SYS',
    'SYSOBJECTS',
    'SYSCOLUMNS',
    'TABLE',
    'UPDATE',
    '<SCRIPT',
    '</SCRIPT',
    '--',
    '/*',
    '*/',
    '@@',
    '"',
    '\'',
    '(',
    ')',
    '@',
    '-'
  ];
  HT_FORM_ID: any;

  constructor(private snackBar: MatSnackBar,
    private postService: PostServices,
    private auth: AuthServices,
    private router: Router,
    private dialog: ConfirmationDialogService) {

  }

  openSnackBar(message: string, duration: number, type: string = 'custom-css-class',
    horizontalPosition: any = 'center', verticalPosition: any = 'bottom'): any {
    this.snackBar.open(message, '', {
      duration,
      horizontalPosition,
      verticalPosition,
      panelClass: [type + '-snackbar']
    });
  }

  dismissSnackBar(): any {
    this.snackBar.dismiss();
  }

  decodeText(str): any {
    try {
      for (let i = 0; i < this.listKyTuDacBiet.length; i++) {
        str = str.replaceAll('⛔' + i + '🚫', this.listKyTuDacBiet[i]);
      }
    } catch (err) { }

    return str;
  }

  startTimer({ days = 0, hours = 0, minutes = 0, seconds }: PropsTimer): Observable<PropsTimer> {
    let timer: number = seconds + (minutes * 60) + (hours * 3600) + (days * 86400);
    return new Observable((observer: Observer<PropsTimer>) => {
      const start = setInterval(() => {
        if (timer <= 0) {
          clearInterval(start);
          observer.complete();
        } else {
          timer--;
          observer.next({ seconds: timer });
        }
      }, 1000);
    });
  }

  cleanAccents(str: string): any {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

    return str;
  }

  // tslint:disable-next-line:typedef
  async compressImage(src, newX, newY) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      };
      img.onerror = error => rej(error);
    });
  }

  xuLyDatetime(datetime): string {
    const date = new Date(datetime ? datetime : new Date());
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  }

  slugifyPipe(input: string): string {
    // Đổi chữ hoa thành chữ thường
    let slug = input.toLowerCase();
    // Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    // Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, '-');
    // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    // Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    // In slug ra textbox có id “slug”
    return slug;
  }

  xoa_dau(str): any {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  }

  tinhTyLePhanTram(tuSo: number, mauSo: number): string {
    if (tuSo > mauSo) {
      return '100%';
    }
    let result = Number((tuSo / mauSo) * 100).toFixed(2);
    switch (result) {
      case '0.00':
        if (tuSo > 0) {
          return '0.01';
        }
        result = '0';
        break;
      case '100.00':
        if (tuSo < mauSo) {
          return '99.99';
        }
        result = '100';
        break;

      default:
        break;
    }
    return result;
  }

  parseToNumberWithDotString(num: any): string {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  kiemTraDinhDang(event: any) {
    const vnf_regex_vina = /((088|091|094|083|084|085|081|082)+([0-9]{7})\b)/g;
    const vnf_regex_viettel = /((086|096|097|098|032|033|034|035|036|037|038|039)+([0-9]{7})\b)/g;
    const vnf_regex_mobi = /((089|090|093|070|079|077|076|078)+([0-9]{7})\b)/g;
    const vnf_regex_vietnammobile = /((092|056|058)+([0-9]{7})\b)/g;
    const vnf_regex_gmobile = /((099|059)+([0-9]{7})\b)/g;
    const vnf_regex_itelecom = /((087)+([0-9]{7})\b)/g;
    if (event) {
      if (vnf_regex_vina.test(event) === false) {
        if (vnf_regex_viettel.test(event) === false) {
          if (vnf_regex_mobi.test(event) === false) {
            if (vnf_regex_vietnammobile.test(event) === false) {
              if (vnf_regex_gmobile.test(event) === false) {
                if (vnf_regex_itelecom.test(event) === false) {
                  // số điện thoại không hợp lệ
                  return [{ hople: 0, nhamang: 0 }];
                } else {
                  // số itelecom
                  return [{ hople: 1, nhamang: 6 }];
                }
              } else {
                // số itelecom
                return [{ hople: 1, nhamang: 5 }];
              }
            } else {
              // số vietnammobile
              return [{ hople: 1, nhamang: 4 }];
            }
          } else {
            // số mobo
            return [{ hople: 1, nhamang: 3 }];
          }
        } else {
          // số viettel
          return [{ hople: 1, nhamang: 2 }];
        }
      } else { // hợp lệ
        // số vina
        return [{ hople: 1, nhamang: 1 }];
      }
    } else {
      // 'Bạn chưa điền số điện thoại!'
      return [{ hople: 0, nhamang: 0 }];
    }
  }

  returnValueSMSGui(dataRow: any) {
    const soDienThoaiGui = dataRow.sdtgui;
    const soSmsDaGui = dataRow.smsdagui;
    const gioiHanSms = dataRow.smstoida;
    const choPhepGui = dataRow.mokhoasms;
    const thamBien_1 = dataRow.ts1;
    const thamBien_2 = dataRow.ts2;
    const thamBien_3 = dataRow.ts3;
    const thamBien_4 = dataRow.ts4;
    const thamBien_5 = dataRow.ts5;
    const templateId = dataRow.idtemplate;
    return [{
      sdt: soDienThoaiGui, smsDaGui: soSmsDaGui, soLuongGioiHan: gioiHanSms, choPhepGuiSMS: choPhepGui,
      thamBien_1: thamBien_1, thamBien_2: thamBien_2, thamBien_3: thamBien_3, thamBien_4: thamBien_4,
      thamBien_5: thamBien_5, idtemplate: templateId
    }];
  }

  hasDecimal(num) {
    return !!(num % 1);
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = () => {
      callback(true);
    }
    img.onerror = () => {
      callback(false);
    };
    img.src = url;
  }

  thongBaoLoi(data: ResData, infoDuration = 1000, infoColor = 'warning', errorDuration = 1000, errorColor = 'red'): void {
    if (data.mathongbao === -1) {
      this.openSnackBar(data.thongbao, infoDuration, infoColor);
    } else {
      this.openSnackBar('Thao tác không thành công, vui lòng thực hiện lại sau', errorDuration, errorColor);
    }
  }

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
}
