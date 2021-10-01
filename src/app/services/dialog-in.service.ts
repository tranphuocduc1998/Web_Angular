
import { Injectable } from '@angular/core';
import { PostServices } from 'src/app/services/post-services.service';
import { UtilsService } from 'src/app/services/utils-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DialogInService {
  public dataInSauRenDer: any;
  public flagTrangThaiDaLayDuLieuXong: number = 0; // 0 la chua hoan tat gop du lieu , 1 la hoan tat
  public srcPDF: SafeResourceUrl;

  fileName: string = '';

  constructor(
    private postService: PostServices,
    public sanitizer: DomSanitizer,
    private utilsService: UtilsService) {
    this.dataInSauRenDer = [];
  }

  layChuoiIn(procNameid, chuoiMaHs, xuatWord, chuoiTK, valueOne, valueTwo, valueThree,
    valueFour, valueFive, valueSix, valueSeven, valueEight, valueNine) {
    return new Promise(resolve => {
      this.postService.postHT2000ThuTucTongHop(36, 0, 6, 0, 0,
        procNameid, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        chuoiMaHs, xuatWord, chuoiTK, valueOne, valueTwo, valueThree, valueFour,
        valueFive, valueSix, valueSeven, valueEight, valueNine).subscribe(data => {
          const res: any = data;
          let chuoiInBienNhan = '';
          let procName = '';
          if (res.mathongbao === 1) {
            if (res.dulieu.table.length > 0) {
              procName = res.dulieu.table[0].proc_name;
              chuoiInBienNhan = res.dulieu.table[0].chuoiin;
              this.fileName = res.dulieu.table[0].filename;
              if (res.dulieu.table1[0].loaitb === 0) {
                this.utilsService.openSnackBar(res.dulieu.table1[0].tb, 5000, 'info', 'center', 'bottom');
              } else {
                this.inBienNhan(chuoiInBienNhan, procName, xuatWord).then((data) => {
                  const res: any = data;
                  return resolve(data);
                })
              }
            }
          }
        });
    });
  }

  inBienNhan(chuoiIn, procName, xuatWord) {
    return new Promise(resolve => {
      if (chuoiIn) {
        this.postService.postReport(chuoiIn, procName).subscribe(data => {
          const fileData: any = data;
          if (Number(xuatWord) === 0) {
            const b: any = new Blob([fileData], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(b);
            this.flagTrangThaiDaLayDuLieuXong = 1;
            this.dataInSauRenDer = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            return resolve(url);
          } else if (Number(xuatWord) === 1 || Number(xuatWord) === 2) {
            const b: any = new Blob([fileData], { type: 'application/octet-stream' });
            FileSaver.saveAs(b, this.fileName);
            return resolve(0);
          }
        });
      }
    });
  }
}




