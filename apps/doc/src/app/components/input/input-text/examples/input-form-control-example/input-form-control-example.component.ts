import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'prizm-input-form-control-example',
  templateUrl: './input-form-control-example.component.html',
  styleUrls: ['./input-form-control-example.component.less'],
})
export class InputFormControlExampleComponent {
  public readonly control = new FormControl('');

  public valueText = '';
  public ngModelText = '';

  public changeControl(): void {
    // Skip event emission to verify that label changes position even in this case
    this.control.setValue('New text control from method!', { emitEvent: false });
  }

  public changeText(): void {
    this.valueText = 'New text random text ' + Math.random();
  }

  public changeNgModel(): void {
    this.ngModelText = 'New for ngModel';
  }
}
