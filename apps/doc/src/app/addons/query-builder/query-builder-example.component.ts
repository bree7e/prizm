import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConditionPrepareFn } from '@prizm-ui/addon-query-builder';
import { prizmPure } from '@prizm-ui/core';
import { RawLoaderContent, TuiDocExample } from '@prizm-ui/doc';
import { DEEP_EXPRESSION, SIMPLE_EXPRESSION } from './query-builder-example.constants';

@Component({
  selector: 'prizm-query-builder-example',
  templateUrl: './query-builder-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryBuilderExampleComponent {
  public readonly basicExample: TuiDocExample = {
    TypeScript: import('./examples/query-builder-basic-example/query-builder-basic-example.component?raw'),
    HTML: import('./examples/query-builder-basic-example/query-builder-basic-example.component.html?raw'),
    LESS: import('./examples/query-builder-basic-example/query-builder-basic-example.component.less?raw'),
  };

  public readonly scrollableExample: TuiDocExample = {
    TypeScript: import(
      './examples/query-builder-scrollable-example/query-builder-scrollable-example.component?raw'
    ),
    HTML: import(
      './examples/query-builder-scrollable-example/query-builder-scrollable-example.component.html?raw'
    ),
    LESS: import(
      './examples/query-builder-scrollable-example/query-builder-scrollable-example.component.less?raw'
    ),
  };

  public readonly setupModule: RawLoaderContent = import('./examples/setup-module.md?raw');

  control = new FormControl(SIMPLE_EXPRESSION);

  template?: TemplateRef<never>;

  disabled = false;

  expressions = [SIMPLE_EXPRESSION, DEEP_EXPRESSION];

  prepare = noop;

  preparePresets: ConditionPrepareFn[] = [noop, prepareSetDefaults];

  prizmInputLayoutWidth = 'initial';

  prizmQueryBuilderNodeWidth = 'initial';

  operatorOptions = ['equal', 'startWith', 'endWith', 'contains'];
  fieldOptions = ['firstName', 'lastName', 'age', 'gender', 'email', 'phone', 'address'];

  @prizmPure
  public stringify(value: unknown) {
    return JSON.stringify(value, null, 2);
  }
}

const prepareSetDefaults: ConditionPrepareFn = form => {
  form.patchValue({
    field: 'default',
    operator: 'default',
    value: 'default',
  });
};

const noop = () => {};
