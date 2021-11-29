import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'zyfra-confirm-dialog',
  templateUrl: './zyfra-confirm-dialog.component.html',
  styles: [],
  providers: [ConfirmationService],
})
export class ZyfraConfirmDialogComponent implements OnInit {
  @Input() message: any = '';
  @Input() key: string;
  @Input() icon: string;
  @Input() header: string = '';
  @Input() accept: Function = () => {};
  @Input() reject: Function = () => {};
  @Input() acceptMessages: { severity: string; summary: string; detail: string }[] = [
    { severity: '', summary: '', detail: '' },
  ];
  @Input() rejectMessages: { severity: string; summary: string; detail: string }[] = [
    { severity: '', summary: '', detail: '' },
  ];
  @Input() acceptLabel: string = 'yes';
  @Input() rejectLabel: string = 'no';
  @Input() acceptIcon: string;
  @Input() rejectIcon: string;
  @Input() acceptButtonStyleClass: string;
  @Input() rejectButtonStyleClass: string;
  @Input() acceptVisible: boolean = true;
  @Input() rejectVisible: boolean = true;
  @Input() style: string;
  @Input() styleClass: string;
  @Input() maskStyleClass: string;
  @Input() blockScroll: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() closable: boolean = true;
  @Input() focusTrap: boolean = true;
  @Input() appendTo: any;
  @Input() dismissableMask: boolean;
  @Input() baseZIndex: number = 0;
  @Input() autoZIndex: boolean = true;
  @Input() breakpoints: object;
  @Input() transitionOptions: string = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
  @Input() defaultFocus: string = 'accept';

  msgs: Message[] = [];

  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {}

  onClick(e) {
    this.confirmationService.confirm({
      message: this.message,
      header: this.header,
      icon: this.icon,
      accept: () => {
        this.msgs = this.acceptMessages;
        this.accept();
      },
      reject: () => {
        this.msgs = this.rejectMessages;
        this.reject();
      },
    });
  }

  /* onHide */
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  onHideHindler(event) {
    this.onHide.emit(event);
  }

  ngOnDestroy() {}
}