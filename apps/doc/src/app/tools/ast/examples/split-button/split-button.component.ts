import { Component, OnInit } from '@angular/core';
import {
  PrizmHtmlItem,
  prizmHtmlParse,
  prizmHtmlStringify,
  PrizmTemplateTaskProcessor,
  PrizmTemplateTask,
  ZyfraSplitButtonTemplateTasks,
} from '@prizm-ui/ast';

@Component({
  selector: 'prizm-ast-split-button-example',
  templateUrl: './split-button.component.html',
  styles: [
    `
      .block {
        display: flex;
        gap: 1rem;
      }
    `,
  ],
})
export class PrizmAstSplitButtonExampleComponent implements OnInit {
  readonly tasks: PrizmTemplateTask[] = ZyfraSplitButtonTemplateTasks;
  // readonly tasks: PrizmTemplateTask[] = [
  //   {
  //     selector: 'zyfra-split-button',
  //     tasks: [
  //       prizmAstCreateActionBy(PrizmChangeNameTemplateTask, {
  //         name: 'prizm-split-button',
  //       }),
  //     ],
  //     inputs: {
  //       label: [prizmAstCreateActionBy(PrizmMoveToContentTemplateTask, {})],
  //       icon: [
  //         prizmAstCreateActionBy(PrizmAddCommentTemplateTask, {
  //           comment: 'TODO need fix api for pass right icon'
  //         })
  //       ],
  //       iconPos: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       style: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       menuStyle: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       menuStyleClass: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       styleClass: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       appendTo: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       dir: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       showTransitionOptions: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       hideTransitionOptions: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
  //       model: [
  //         prizmAstCreateActionBy(PrizmRemoveAttributeTemplateTask, {}),
  //         prizmAstCreateActionBy(PrizmAddCommentTemplateTask, {
  //           comment: 'TODO use dropdown-host component to show children menus'
  //         })
  //       ],
  //     },
  //     outputs: {
  //       onDropdownClick: [
  //         prizmAstCreateActionBy(PrizmRemoveAttributeTemplateTask, {}),
  //         prizmAstCreateActionBy(PrizmAddCommentTemplateTask, {
  //           comment: 'TODO use dropdown-host component to catch event for change (onDropdownClick)'
  //         })
  //       ],
  //       onClick: [
  //         prizmAstCreateActionBy(PrizmAddAttributeTemplateTask, {
  //           attr: '(clickIcon)',
  //           passValue: true,
  //         }),
  //         prizmAstCreateActionBy(PrizmRenameTemplateTask, {
  //           newAttrName: 'clickButton',
  //         }),
  //       ],
  //     },
  //   }
  // ];
  readonly html = `
<zyfra-split-button
  label="SplitButton"
  icon="old-icon"
  iconPos="left"
  [disabled]="true"
  [model]="model"
  showTransitionOptions="225ms ease-out"
  hideTransitionOptions="195ms ease-in"
  (onClick)="onClick($event)"
  (onDropdownClick)="onDropdownClick($event)"
></zyfra-split-button>
`;
  result: string;

  public ngOnInit(): void {
    this.parse();
  }

  private parse(): void {
    const parsed = prizmHtmlParse(this.html);
    const nodeProcessor = new PrizmTemplateTaskProcessor(this.tasks);
    this.result = prizmHtmlStringify(nodeProcessor.processTasks(parsed) as PrizmHtmlItem[]);
  }
}
