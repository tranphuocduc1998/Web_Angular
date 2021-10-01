import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from './modules/share/shared.module';

// layouts
import { DefaultLayoutComponent } from './layouts';

// CoreUI
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostServices } from './services/post-services.service';
import { AuthServices } from './services/auth-services.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmationDialogService } from './components/confirm-dialog/confirm-dialog.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { GalleryModule } from '@ngx-gallery/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './services/custom-paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { TabsModule } from 'ngx-bootstrap/tabs';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,

    MatDialogModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    CdkTableModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    SelectDropDownModule,
    GalleryModule
  ],
  providers: [
    ConfirmationDialogService,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    PostServices,
    AuthServices,
    BsModalService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
