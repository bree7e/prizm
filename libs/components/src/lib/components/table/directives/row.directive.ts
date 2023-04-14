import { Directive, Inject, Input, TemplateRef, TrackByFunction } from '@angular/core';
import { prizmDefaultProp } from '@prizm-ui/core';
import { Observable } from 'rxjs';
import { PrizmTableRowContext } from '../table.types';

@Directive({
  selector: `ng-template[prizmRow]`,
  exportAs: 'prizmRow',
})
export class PrizmRowDirective<T extends Partial<Record<keyof T, any>>> {
  @Input()
  @prizmDefaultProp()
  prizmRowOf: readonly T[] = [];

  @Input()
  @prizmDefaultProp()
  prizmRowGetChildren: (element: T) => Observable<T[]>;

  public static ngTemplateContextGuard<T>(
    _dir: PrizmRowDirective<T>,
    _ctx: unknown
  ): _ctx is PrizmTableRowContext<T> {
    return true;
  }

  @Input()
  prizmRowTrackBy: TrackByFunction<T> = (i: number) => {
    return i;
  };

  constructor(@Inject(TemplateRef) readonly template: TemplateRef<PrizmTableRowContext<T>>) {}
}
