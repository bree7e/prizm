import { PRIZM_RANGE_SEPARATOR_CHAR } from './date-time';
import { PrizmDayRange } from './day-range';
import { PrizmDateMode, PrizmTimeMode } from '../../types';
import { PrizmTimeRange } from './time-range';
import { PrizmTime } from './time';

export class PrizmDateTimeRange {
  constructor(
    public dayRange: PrizmDayRange,
    public timeRange: PrizmTimeRange | null = new PrizmTimeRange(new PrizmTime(0, 0), new PrizmTime(0, 0))
  ) {}

  public static safeUpdateTimeFrom(origin: PrizmDateTimeRange | null, time: PrizmTime): PrizmDateTimeRange {
    origin = PrizmDateTimeRange.createIfNotExist(origin);
    if (!origin.timeRange) origin.timeRange = new PrizmTimeRange(new PrizmTime(0, 0), new PrizmTime(0, 0));
    origin.timeRange.from = time;
    return origin;
  }

  public static safeUpdateTimeTo(origin: PrizmDateTimeRange | null, time: PrizmTime): PrizmDateTimeRange {
    origin = PrizmDateTimeRange.createIfNotExist(origin);
    if (!origin.timeRange) origin.timeRange = new PrizmTimeRange(new PrizmTime(0, 0), new PrizmTime(23, 59));
    origin.timeRange.to = time;
    return origin;
  }

  public static createIfNotExist(origin: PrizmDateTimeRange | null): PrizmDateTimeRange {
    if (!origin || !(origin instanceof PrizmDateTimeRange))
      origin = new PrizmDateTimeRange(
        PrizmDayRange.fromLocalNativeDate(new Date(), new Date()),
        new PrizmTimeRange(new PrizmTime(0, 0), new PrizmTime(0, 0))
      );

    return origin;
  }

  public static fromLocalNativeDate(from: Date, to: Date): PrizmDateTimeRange {
    const dayRange = PrizmDayRange.fromLocalNativeDate(from, to);
    const timeRange = new PrizmTimeRange(
      PrizmTime.fromLocalNativeDate(from),
      PrizmTime.fromLocalNativeDate(to)
    );
    return new PrizmDateTimeRange(dayRange, timeRange);
  }

  public toLocalNativeDate(): [Date | null, Date | null] {
    const from = this.dayRange.from.toLocalNativeDate();
    if (this.timeRange?.from) {
      from.setHours(this.timeRange.from.hours);
      from.setMinutes(this.timeRange.from.minutes);
      from.setSeconds(this.timeRange.from.seconds);
    }

    const to = this.dayRange.to.toLocalNativeDate();
    if (this.timeRange?.to) {
      from.setHours(this.timeRange.to.hours);
      from.setMinutes(this.timeRange.to.minutes);
      from.setSeconds(this.timeRange.to.seconds);
    }

    return [from ?? null, to ?? null];
  }

  public copy(): PrizmDateTimeRange {
    return new PrizmDateTimeRange(this.dayRange, this.timeRange);
  }

  public toString(
    dateFormat: PrizmDateMode = `DMY`,
    timeFormat: PrizmTimeMode = `HH:MM`,
    dateSeparator = `.`
  ): string {
    if (!this.dayRange?.from || !this.dayRange?.to || !this.timeRange?.from || !this.timeRange?.to) return '';

    const from = this.dayRange.from.getFormattedDay(dateFormat, dateSeparator);
    const fromTime = this.timeRange.from.toString(timeFormat);
    const to = this.dayRange.to.getFormattedDay(dateFormat, dateSeparator);
    const toTime = this.timeRange.to.toString(timeFormat);
    return `${from} ${fromTime}${PRIZM_RANGE_SEPARATOR_CHAR}${to} ${toTime}`;
  }

  public updateDayRange(dayRange: PrizmDayRange): void {
    this.dayRange = dayRange;
  }
}
