import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
    selector: 'app-left-images-component',
    templateUrl: './left-images.component.html',
    styleUrls: ['./left-images.component.scss'],
    encapsulation:ViewEncapsulation.None
})

export class LeftImagesComponent implements OnInit {
    @Input() images?: any;

    constructor() {

    }

    ngOnInit() {

    }
}