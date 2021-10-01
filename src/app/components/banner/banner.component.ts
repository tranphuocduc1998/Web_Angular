import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-banner-component',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    encapsulation:ViewEncapsulation.None
})

export class BannerComponent implements OnInit {
    @Input() url?: any;
    constructor() {

    }

    ngOnInit() {

    }
}