import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-breadcrumb-component',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BreadcrumbComponent implements OnInit {
    public breadcrumbs?: Breadcrumb[];
    public currentRoute: any;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.currentRoute = '/' + router.url.split('/')[1];

        let breadcrumb: Breadcrumb = {
            label: "Trang chủ",
            url: ''
        };

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute);
                this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
            });
    }

    ngOnInit() {

    }

    private getBreadcrumbs(activatedRoute: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []
    ): Breadcrumb[] {
        const ROUTE_DATA_BREADCRUMB = "title";
        let children: ActivatedRoute[] = activatedRoute.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (let child of children) {
            if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length == 0) {
                continue;
            }

            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            let routeURL: string = child.snapshot.url
                .map(segment => segment.path)
                .join("/");


            url += `/${routeURL}`;



            let breadcrumb: Breadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                url: url
            };

            if (child === children[children.length - 1]) {
                breadcrumb.url = '#';
            }

            breadcrumbs.push(breadcrumb);

            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }

}

export interface Breadcrumb {
    label: string;
    url: string;
}