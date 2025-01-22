import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PrizmTreeItemComponent } from '../components/tree-item/tree-item.component';
import { PrizmTreeAccessor, PrizmTreeController } from '../misc/tree.interfaces';
import { PRIZM_TREE_ACCESSOR, PRIZM_TREE_CONTROLLER } from '../misc/tree.tokens';
import { prizmDefaultProp } from '@prizm-ui/core';
import { prizmIsPresent } from '../../../util';

@Directive({
  selector: '[prizmTreeController][map]',
  exportAs: 'prizmTreeController',
  providers: [
    {
      provide: PRIZM_TREE_ACCESSOR,
      useExisting: PrizmTreeControllerDirective,
    },
    {
      provide: PRIZM_TREE_CONTROLLER,
      useExisting: PrizmTreeControllerDirective,
    },
  ],
})
export class PrizmTreeControllerDirective<T> implements PrizmTreeController, PrizmTreeAccessor<T> {
  @Input()
  @prizmDefaultProp()
  prizmTreeController = true;

  @Input()
  @prizmDefaultProp()
  map: Map<T, boolean> = new Map();

  @Input()
  @prizmDefaultProp()
  prizmTreeItemExpandKeyFn: (item: T) => any = (item: T) => item;

  @Output()
  readonly toggled = new EventEmitter<T>();

  @Output()
  readonly expandedChanged = new EventEmitter<{ value: T; isExpanded: boolean }>();

  readonly items = new Map<PrizmTreeItemComponent, T>();

  public register(item: PrizmTreeItemComponent, value: T): void {
    this.items.set(item, value);
  }

  public unregister(item: PrizmTreeItemComponent): void {
    this.items.delete(item);
  }

  public getValue(item: PrizmTreeItemComponent): T | undefined {
    const value = this.items.get(item);
    return value && this.prizmTreeItemExpandKeyFn(value);
  }

  public isExpanded(item: PrizmTreeItemComponent): boolean {
    const value = this.getValue(item);

    return (value && this.map.get(value)) ?? this.prizmTreeController;
  }

  public toggle(item: PrizmTreeItemComponent): void {
    const value = this.getValue(item);
    const isExpanded = !this.isExpanded(item);

    if (!prizmIsPresent(value)) {
      return;
    }

    this.toggled.emit(value);
    this.expandedChanged.emit({
      value,
      isExpanded,
    });
    this.map.set(value, isExpanded);
  }

  public toggleByItemValue(value: T, forceState?: boolean): void {
    const isExpanded = forceState ?? !this.map.get(value);

    this.toggled.emit(value);
    this.expandedChanged.emit({
      value,
      isExpanded,
    });
    this.map.set(value, isExpanded);
  }
}
