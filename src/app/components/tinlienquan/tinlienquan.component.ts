import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-tinlienquan',
    templateUrl: './tinlienquan.component.html',
    styleUrls: ['./tinlienquan.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TinlienquanComponent implements OnInit {
    @Input() title?: any;
    @Input() items?: any;
    constructor() {

    }

    ngOnInit() {

    }

}