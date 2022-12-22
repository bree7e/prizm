import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { INavigationTree } from '../../navigation.interfaces';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ActiveNavigationItemService } from '../../services/active-navigation-item.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'prizm-navigation-item-simple',
  templateUrl: './prizm-navigation-item-simple.component.html',
  styleUrls: ['./prizm-navigation-item-simple.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrizmNavigationItemSimpleComponent {
  @Input() public set data(tree: INavigationTree) {
    this.data$.next(tree);
  }
  @Input() public deep: number;

  public data$: BehaviorSubject<INavigationTree> = new BehaviorSubject<INavigationTree>(null);
  public isActive$: Observable<boolean> = combineLatest([
    this.activeItemService.activeItem$,
    this.data$,
  ]).pipe(map(([activeItem, data]) => activeItem === data));

  public get menuItem(): INavigationTree {
    return this.data$.getValue();
  }

  constructor(public activeItemService: ActiveNavigationItemService) {}

  public navClick(): void {
    const data = this.data$.getValue();
    const current = this.activeItemService.activeItem$.getValue();
    this.activeItemService.activeItem = current === data ? null : data;
  }
}
