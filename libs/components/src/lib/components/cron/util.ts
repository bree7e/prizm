import { PrizmCronUiDayType } from './model';
import { PRIZM_CRON_UI_DAYS_OF_WEEK_CRON_KEYS } from './const';
import { PrizmInputCarouselArrayContent } from '../input/carousel';
import { getArrWithStringNumbers } from '../../util/common/get-arr-string-numbers';

export function getCarousel(length: number, start = 1): PrizmInputCarouselArrayContent<string> {
  return new PrizmInputCarouselArrayContent(
    getArrWithStringNumbers(length, start),
    (item, el) => item === el
  );
}
export function getArrWithWeekNumber(): string[] {
  return ['2', '3', '4', '5', '6', '7', '1'];
}

export function getCarouselWeek(): PrizmInputCarouselArrayContent<string> {
  return new PrizmInputCarouselArrayContent(getArrWithWeekNumber(), (item, el) => item === el);
}

export function prizmConvertDayToType(day: string, dayOfWeek: string): PrizmCronUiDayType {
  if (day === '*') return PrizmCronUiDayType.every;
  else if (day === '?') {
    if (dayOfWeek === '*') return PrizmCronUiDayType.every;
    if (dayOfWeek.includes('/')) return PrizmCronUiDayType.afterDayOfWeek;
    else if (dayOfWeek.endsWith('L')) return PrizmCronUiDayType.lastChosenDayOfWeek;
    else if (dayOfWeek.includes('#')) return PrizmCronUiDayType.onTheChosenDayOfWeek;
    else if (PRIZM_CRON_UI_DAYS_OF_WEEK_CRON_KEYS.find(a => dayOfWeek.includes(a)))
      return PrizmCronUiDayType.specifiedDayOfWeek;
  } else if (day.includes('/')) {
    return PrizmCronUiDayType.afterDayOfMonth;
  } else if (day.startsWith('L-')) {
    return PrizmCronUiDayType.lastChosenDaysOfMonth;
  } else if (day === 'L') {
    return PrizmCronUiDayType.lastDayOfMonth;
  } else if (day === 'LW') {
    return PrizmCronUiDayType.lastWeekDayOfMonth;
  } else if (day.includes('-')) {
    return PrizmCronUiDayType.between;
  } else if (day.endsWith('W')) {
    return PrizmCronUiDayType.nearestWeekDayToTheChosenDayOfMonth;
  }

  return PrizmCronUiDayType.specifiedDayOfMonth;
}

/**
 * Определяет, может ли элемент списка Cron отобразиться на основе переданных элементов и проверяемого элемента.
 *
 * @param {unknown[]} items - Массив элементов, которые могут быть отображены.
 * @param {unknown} item - Элемент, который необходимо проверить на возможность отображения.
 * @returns {boolean} Возвращает true, если список элементов пуст и проверяемый элемент содержится в нем, иначе false.
 */
export function canShowCronListItem(items: unknown[], item: unknown): boolean {
  return !items.length || items.includes(item);
}
