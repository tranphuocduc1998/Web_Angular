import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() showbtnCancel: boolean;
  @Input() color: string;
  @Input() showbtnOther: string;

  result: any;

  constructor(public bsModalRef: BsModalRef) { }

  confirm() {
    this.result = true;
    this.bsModalRef.hide();
  }

  info() {
    this.result = "other"
    this.bsModalRef.hide();
  }

  decline() {
    this.result = false;
    this.bsModalRef.hide();
  }

}
