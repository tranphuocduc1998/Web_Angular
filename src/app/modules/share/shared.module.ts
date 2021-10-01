import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { RouterModule } from '@angular/router';
import { SafePipe, HtmlPipe } from 'src/app/services/safe.pipe';
import { OnlyNumberDirective } from '../../services/only-number.directive';
import { OnlyDecimalDirective } from '../../services/only-decimal.directive';
import { UtilsService } from 'src/app/services/utils-service.service';
import { DebounceClickDirective } from 'src/app/services/debounce-click.service';

@NgModule({
  declarations: [
    SafePipe,
    HtmlPipe,

    OnlyNumberDirective,
    OnlyDecimalDirective,
    DebounceClickDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    RouterModule,
  ],
  exports: [
    DebounceClickDirective,
    OnlyNumberDirective,
    OnlyDecimalDirective,
    FormsModule,
    ModalModule,
    MatProgressSpinnerModule,
    SafePipe,
    HtmlPipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [BsModalService, UtilsService]
})
export class SharedModule { }
