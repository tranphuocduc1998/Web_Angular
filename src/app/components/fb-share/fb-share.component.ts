import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'fb-share',
    template: `<div class="fb-share-button" data-href="http://localhost:4200/portal/chitiet" data-layout="button_count"
    data-size="large"><a target="_blank"
        [href]="url"
        class="fb-xfbml-parse-ignore">Chia sẻ</a></div>`
})

export class FbSharedComponent implements OnInit {
    @Input() url?: string;

    constructor() {

    }

    ngOnInit() {

    }
}