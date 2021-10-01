import { PostServices } from "./post-services.service";

export class UploadAdapter {
    private loader;

    constructor(loader: any, private postService: PostServices) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            this.postService.postPtBaiVietHinhAnh(file).subscribe(data => {
                let url = data.toString().replace('https://vnptbd.vn/api','https://vnptbd.vn/oerpapi/api')
                console.log("🚀 ~ file: upload-adapter.service.ts ~ line 13 ~ UploadAdapter ~ this.postService.postPtBaiVietHinhAnh ~ url", url)
                resolve({
                    default: url
                });
            });
        }));
    }

    abort() {
        console.log('UploadAdapter abort');
    }
}