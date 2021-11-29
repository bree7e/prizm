import { Directive, Input, TemplateRef } from '@angular/core';

type DropdownTemplateType = 'item' | 'group' | 'selectedItem' | 'header' | 'empty' | 'emptyfilter' | 'footer';

@Directive({
  selector: '[zyfraDropdownTemplate]',
})
export class ZyfraDropdownTemplateDirective {
  @Input() zyfraDropdownTemplate: DropdownTemplateType;

  constructor(public templateRef: TemplateRef<any>) {}

  get template() {
    return this.templateRef;
  }

  public getType() {
    return this.zyfraDropdownTemplate;
  }
}