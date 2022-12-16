import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RawLoaderContent, TuiDocExample } from '@prizm/doc-base';
import { PrizmSize } from '@prizm-ui/components';

@Component({
  selector: 'prizm-button-example',
  templateUrl: './group-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupBarComponent {
  sizeVariants: ReadonlyArray<PrizmSize> = ['s', 'm', 'xm', 'l', 'xl'];
  size: PrizmSize = this.sizeVariants[0];

  readonly setupModule: RawLoaderContent = import('!!raw-loader!./examples/setup-module.md');

  readonly exampleOutline: TuiDocExample = {
    TypeScript: import('!!raw-loader!./examples/base/prizm-charts-group-bar-example.component.ts'),
    HTML: import('!!raw-loader!./examples/base/prizm-charts-group-bar-example.component.html'),
  };
}
