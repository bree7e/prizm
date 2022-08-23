import { InjectionToken, ValueProvider } from '@angular/core';
import { PolymorphContent } from '../../../directives';
import { ZuiInputSize } from '../../input';
import { ZuiContextWithImplicit } from '../../../types';
import { ZuiMultiSelectItemWithChecked, ZuiMultiSelectIdentityMatcher, ZuiMultiSelectSearchMatcher } from './multi-select.model';

export interface ZuiMultiSelectOptions<T> {
    readonly items: unknown[];
    readonly searchable: boolean;
    readonly label: string;
    readonly placeholder: string;
    readonly size: ZuiInputSize;
    readonly stringify: (i:Omit<ZuiMultiSelectItemWithChecked<T>, 'stringify'>, nullContent?: string) => string;
    readonly emptyContent: string;
    readonly nullContent: string;
    readonly searchMatcher: ZuiMultiSelectSearchMatcher<T>,
    readonly identityMatcher: ZuiMultiSelectIdentityMatcher<T>,
    readonly minDropdownHeight: number;
    readonly outer: boolean;
    readonly maxDropdownHeight: number;
    readonly valueContent: PolymorphContent<ZuiContextWithImplicit<ZuiMultiSelectItemWithChecked<T>>>;

}

/** Default values for dropdown-host options */
export const ZUI_MULTI_SELECT_DEFAULT_OPTIONS: ZuiMultiSelectOptions<unknown> = {
  items: [],
  searchable: false,
  outer: false,
  minDropdownHeight: 0,
  maxDropdownHeight: 342,
  emptyContent: "Ничего не найдено",
  nullContent: "Не выбрано",
  searchMatcher: (searchValue: string, item: unknown): boolean => {
    return item?.toString().toLowerCase().includes(searchValue.toLowerCase());
  },
  stringify: (i: Omit<ZuiMultiSelectItemWithChecked<unknown>, 'stringify'>, nullContent: string) => {
    if (i.obj == null && nullContent) return nullContent;
    return i.obj?.toString?.();
  },
  identityMatcher: (a: unknown, b: unknown): boolean => {
    return a === b;
  },
  valueContent: '',
  placeholder: '',
  size: 'l',
  label: 'Выберите из списка',
};

export const ZUI_MULTI_SELECT_OPTIONS = new InjectionToken<ZuiMultiSelectOptions<unknown>>(
    'Default parameters for select',
    {
        factory: (): ZuiMultiSelectOptions<unknown> => ZUI_MULTI_SELECT_DEFAULT_OPTIONS,
    },
);

export const zuiMultiSelectOptionsProvider: (
    options: Partial<ZuiMultiSelectOptions<unknown>>,
) => ValueProvider = (options: Partial<ZuiMultiSelectOptions<unknown>>) => ({
    provide: ZUI_MULTI_SELECT_OPTIONS,
    useValue: {...ZUI_MULTI_SELECT_DEFAULT_OPTIONS, ...options},
});