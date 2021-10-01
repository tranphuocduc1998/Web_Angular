import { Component, Input, OnInit, TemplateRef, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


@Component({
    selector: 'app-menu-component',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MenuComponent implements OnInit {
    @Input() items?: any;
    @Input() showSearch?: boolean = false;
    @Input() showLanguage?: boolean = false;
    @Input() backgroundStyle?: any;
    @Input() backgroundColor?: any;
    @Input() marginLeft?: any;

    currentRoute: string = '';
    hoveredColor: string = '';
    // modalRef: BsModalRef;

    constructor(public route: Router) {
        let moduleUrl = `/${this.route.url.split('/')[1]}`;
        if (moduleUrl.lastIndexOf("?") >= 0) {
            moduleUrl = moduleUrl.substr(0, route.url.lastIndexOf("?"));
        }
        this.currentRoute = '/' + moduleUrl;
    }

    ngOnInit() {
        this.getHoveredColor();
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

    refresh() {

    }
}