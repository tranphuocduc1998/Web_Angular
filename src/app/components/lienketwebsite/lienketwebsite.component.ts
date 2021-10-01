import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
    selector: 'app-lienketwebsite-component',
    templateUrl: './lienketwebsite.component.html',
    styleUrls: ['./lienketwebsite.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LienketwebsiteComponent implements OnInit {
    @Input() items?: any;
    @Input() titleStyle?: any;
    @Input() titleClass?: any;

    curentItem: any = '#';

    constructor() {
    }

    ngOnInit() {

    }

    onChange() {
        if (this.curentItem === '#') {
            return;
        }
        window.open(this.curentItem, "_blank");
    }
}