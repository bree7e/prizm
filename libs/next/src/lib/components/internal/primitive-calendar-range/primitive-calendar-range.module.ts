import { NgModule } from '@angular/core';
import { ZuiMapperPipeModule } from '../../../pipes/mapper/mapper.module';
import { ZuiCalendarModule } from '../../calendar/calendar.module';
import { ZuiScrollbarModule } from '../../scrollbar/scrollbar.module';
import { ZuiPrimitiveCalendarRangeComponent } from './primitive-calendar-range.component';

/**
 * @internal
 */
@NgModule({
    imports: [ZuiMapperPipeModule, ZuiScrollbarModule, ZuiCalendarModule],
    declarations: [ZuiPrimitiveCalendarRangeComponent],
    exports: [ZuiPrimitiveCalendarRangeComponent],
})
export class ZuiPrimitiveCalendarRangeModule {}
