import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostServices } from 'src/app/services/post-services.service';
import { AuthServices } from 'src/app/services/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class ComboboxService {
  HT_FORM_ID: number = 1;
  constructor(private http: HttpClient,
    private auth: AuthServices, private postService: PostServices) { }

  async loaddulieuchocombobox(id, bang_id, para) {
    return new Promise((resolve, reject) => {
      this.postService.postHt1004SeleIdName(id, bang_id, para).subscribe(data => {
        const res: any = data;
        resolve(res.dulieu.table);
        if (res.dulieu.table) {
          if (res.dulieu.table.length !== 0) {
            let combobox: any;
            combobox = Object.values(res.dulieu.table);
          }
        }
      });
    });
  }

  async loadComBoBox(id, bang_id, para) {
    return await this.loaddulieuchocombobox(id, bang_id, para);
  }
}
