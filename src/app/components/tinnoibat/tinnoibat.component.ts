import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector: 'app-tinnoibat',
    templateUrl: './tinnoibat.component.html',
    styleUrls: ['./tinnoibat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('500ms', style({ transform: 'translateX(0%)' }))
            ]),
        ]),

        trigger('slideUpDown', [
            transition(':enter', [
                style({ transform: 'translateY(100%)' }),
                animate('500ms ease-in', style({ transform: 'translateY(0%)' }))
            ])
        ])
    ]
})

export class TinnoibatComponent implements OnInit {
    @Input() tintuc?: any;

    counter = 0;

    constructor(public router: Router) {
    }

    ngOnInit() {

    }

    imageHover(evt: any) {
        this.counter = evt;
    }
}