import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-thongketruycap-component',
    templateUrl: './thongketruycap.component.html',
    styleUrls: ['./thongketruycap.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ThongketruycapComponent implements OnInit {
    @Input() items?: any;
    @Input() titleStyle?: any;
    @Input() titleClass?: any;

    constructor() {

    }

    ngOnInit() {

    }
}