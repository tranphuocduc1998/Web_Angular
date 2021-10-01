import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'fb-like',
    template: `<div class="fb-like" 
    [data-href]="url" 
    data-width=""
    data-layout="standard" 
    data-action="like" 
    data-size="large"  
    data-share="true">`
})

export class FbLikeComponent implements OnInit {
    @Input() url?: string;

    constructor() {

    }

    ngOnInit() {

    }
}