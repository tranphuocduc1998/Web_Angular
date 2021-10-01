import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
    selector: 'app-right-images-component',
    templateUrl: './right-images.component.html',
    styleUrls: ['./right-images.component.scss'],
    encapsulation:ViewEncapsulation.None
})

export class RightImagesComponent implements OnInit {
    @Input() images?: any;

    constructor() {
    }

    ngOnInit() {

    }
}