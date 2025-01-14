import { PrizmDropdownZoneDirective } from '../../../directives/event-zone/event-zone.directive';

export type PrizmDropdownHostWidth = string | number | null;
export type PrizmDropdownHostContext = {
  custom: PrizmDropdownHostCustomContext;
};
export type PrizmDropdownHostCustomContext = Record<string, unknown>;
