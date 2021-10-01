import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth-services.service';
import { ConfirmationDialogService } from 'src/app/components/confirm-dialog/confirm-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardBauCu implements CanActivate {

  constructor(private router: Router, private auth: AuthServices, private dialog: ConfirmationDialogService) { }

  async canActivate(): Promise<boolean> {
    if (this.auth.truyCap) {
      return true;
    } else {
      this.dialog.confirm('Thông báo', 'Người dùng chưa thực hiện đăng nhập. Vui lòng đăng nhập lại.', 'Đồng ý', 'Hủy', false, 'warning');
      this.router.navigate(['bc'], { replaceUrl: true });
      return false;
    }

  }

}









