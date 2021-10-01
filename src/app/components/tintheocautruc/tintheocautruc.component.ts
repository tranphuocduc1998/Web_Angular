import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";



@Component({
    selector: 'app-tintheocautruc',
    templateUrl: './tintheocautruc.component.html',
    styleUrls: ['./tintheocautruc.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TintheocautrucComponent implements OnInit {
    @Input() tabs?: any;
    @Input() tinNoiBat?: any;
    @Input() tinBenTrai?: any;
    @Input() tinBenPhai?: any;

    constructor() {

    }

    ngOnInit() {

    }

}