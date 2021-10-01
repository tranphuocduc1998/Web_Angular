import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';


import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmationDialogService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private modalServiceDefault: NgbModal
  ) { }

  confirm(title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel',
    showbtnCancel = false,
    color = '',
    showbtnOther?): Observable<any> {
    const config = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText,
        showbtnCancel,
        color,
        showbtnOther
      },
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered'
    }
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return new Observable<any>(this.getResult());
  }

  private getResult() {
    return (observer) => {
      const subscription = this.bsModalRef.onHidden.subscribe(() => {
        observer.next(this.bsModalRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }

  // public confirmDefault(
  //   message: string,
  //   color: string = 'info',
  //   showbtnCancel: boolean = false,
  //   title: string = 'Thông báo',
  //   btnOkText: string = 'Đồng ý',
  //   btnCancelText: string = 'Huỷ',
  //   dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
  //     const modalRef = this.modalServiceDefault.open(ConfirmDialogComponent, { size: dialogSize, centered: true });
  //     modalRef.componentInstance.title = title;
  //     modalRef.componentInstance.message = message;
  //     modalRef.componentInstance.btnOkText = btnOkText;
  //     modalRef.componentInstance.btnCancelText = btnCancelText;
  //     modalRef.componentInstance.showbtnCancel = showbtnCancel;
  //     modalRef.componentInstance.color = color;
  //     return modalRef.result;
  //   }

  confirmDefault(
    message: string,
    color: string = 'info',
    showbtnCancel: boolean = false,
    title: string = 'Thông báo',
    btnOkText: string = 'Đồng ý',
    btnCancelText: string = 'Huỷ',
    dialogSize: 'sm' | 'lg' = 'sm'
  ): Observable<boolean> {
    const config = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText,
        showbtnCancel,
        color,
        size: dialogSize,
        centered: true
      },

      ignoreBackdropClick: true,
      class: 'modal-dialog-centered'
    }
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return new Observable<boolean>(this.getResult());
  }
}
