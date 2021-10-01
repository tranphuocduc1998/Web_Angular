import { Component, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
    selector: 'app-dongho',
    templateUrl: './dongho.component.html',
    styleUrls: ['./dongho.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DonghoComponent implements OnInit {
    thu: string = '';
    time = new Date();
    constructor() {
        this.thu = this.tinhNgay();
    }

    ngOnInit() {
        setInterval(() => {
            this.time = new Date();
        }, 1000);
    }

    tinhNgay() {
        const currentDate = new Date().getDay();
        switch (currentDate) {
            case 0:
                return "Chủ nhật";
            case 1:
                return "Thứ hai";
            case 2:
                return "Thứ ba";
            case 3:
                return "Thứ tư";
            case 4:
                return "Thứ năm";
            case 5:
                return "Thứ sáu";
            case 6:
                return "Thứ bảy";
        }
        return "";
    }
}