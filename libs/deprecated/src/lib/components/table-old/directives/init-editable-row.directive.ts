import { Directive } from '@angular/core';
import { InitEditableRow } from 'primeng/table';

@Directive({
  selector: '[prizmInitEditableRow]',
})
export class PrizmInitEditableRowDirective extends InitEditableRow {}
