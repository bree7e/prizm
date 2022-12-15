import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrizmDestroyService } from '@prizm-ui/helpers';
import { PrizmCronUiMonthState } from '../../cron-ui-month.state';


@Component({
  selector: 'prizm-cron-month',
  styleUrls: [
    './month.component.less',
    '../../cron-element.component.less'
  ],
  templateUrl: './month.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PrizmDestroyService,
  ]
})
export class PrizmCronMonthComponent {
  constructor(
    public readonly cronUiState: PrizmCronUiMonthState
  ) {
  }
  // public readonly typeControl = new FormControl(PrizmCronUiMonthType.every);
  // public readonly type = PrizmCronUiMonthType;
  // public readonly periodRepeat = getCarouselWithMonth();
  // public readonly periodAfter = getCarouselWithMonth();
  // public afterRepeatValue = this.periodRepeat.first;
  // public afterRepeatStart = this.periodAfter.first;
  //
  // public readonly periodStart = getCarouselWithMonth();
  // public betweenStart = this.periodStart.first;
  //
  // public readonly periodEnd = getCarouselWithMonth();
  // public betweenEnd = this.periodEnd.first;
  //
  // public selected: string[] = [
  //   PRIZM_CRON_UI_MONTH_CRON_KEYS[0]
  // ];
  //
  // public readonly items: PrizmCronUiListItem[] = Object.values(PRIZM_CRON_UI_MONTH_SHORT_OBJ).map(
  //   (value, idx) => ({
  //     key: PRIZM_CRON_UI_MONTH_CRON_KEYS[idx],
  //     value,
  //   })
  // )
  //
  // constructor(
  //   public readonly cron: PrizmCronService,
  //   public readonly cronUi: PrizmCronUiService,
  //   public readonly destroy$: PrizmDestroyService,
  // ) {}
  //
  // public ngOnInit(): void {
  //   this.cron.month$.pipe(
  //     map(i => prizmConvertMonthToType(i)),
  //     filter(i => i != this.typeControl.value),
  //     tap((type) => {
  //       this.typeControl.setValue(type);
  //     }),
  //     takeUntil(this.destroy$)
  //   ).subscribe();
  //
  //   this.typeControl.valueChanges.pipe(
  //     distinctUntilChanged(),
  //     tap(
  //       (value: PrizmCronUiMonthType) => {
  //         switch (value) {
  //           case PrizmCronUiMonthType.between:
  //             this.updateBetween();
  //           break;
  //           case PrizmCronUiMonthType.every:
  //             this.cron.updateWith({
  //               month: `*`
  //             })
  //           break;
  //           case PrizmCronUiMonthType.specified:
  //             this.updateSelected();
  //           break;
  //
  //           case PrizmCronUiMonthType.after:
  //             this.updateAfter();
  //           break;
  //         }
  //       }
  //     ),
  //     takeUntil(this.destroy$)
  //   ).subscribe()
  // }
  //
  // public updateAfter(): void {
  //   this.cron.updateWith({
  //     month: `${this.afterRepeatStart}/${this.afterRepeatValue}`
  //   })
  // }
  //
  // public updateBetween (): void {
  //   this.cron.updateWith({
  //     month: `${this.betweenStart}-${this.betweenEnd}`
  //   })
  // }
  //
  // public updateSelected(): void {
  //   this.cron.updateWith({
  //     month: this.selected.join(',')
  //   })
  // }
}