import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-language-component',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LanguageComponent implements OnInit {
    @Input() backgroundColor?: any;

    currentlanguage: any = '';
    languages: any = [
        { name: 'Tiếng Việt', src: '/assets/Hinh/Icons/i7.png' },
        { name: 'Tiếng Anh', src: '/assets/Hinh/Icons/i6.png' },
    ];

    hoveredColor: string = '';

    constructor(public router: Router) {
        this.currentlanguage = this.languages[0];
    }

    ngOnInit() {
        this.getHoveredColor();
    }

    changeLanguage(item: any) {
        if (item.src === this.currentlanguage.src) {
            return;
        }

        this.currentlanguage = item;
    }

    getHoveredColor() {
        switch (this.backgroundColor) {
            case 'bg-primary':
                this.hoveredColor = '#007bff';
                break;
            case 'bg-success':
                this.hoveredColor = '#28a745';
                break;
            case 'bg-danger':
                this.hoveredColor = '#dc3545'
                break;
            default:
                this.hoveredColor = '#007bff';
                break;
        }
    }
}