import { Directive, ElementRef, Inject, NgZone, Optional, Renderer2, Self } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { ZUI_FOCUSABLE_ITEM_ACCESSOR } from '../../../tokens/focusable-item-accessor';
import { ZuiFocusableElementAccessor } from '../../../types/focusable-element-accessor';
import { zuiPx } from '../../../util/format/px';
import { AbstractZuiAutofocusHandler } from './abstract.handler';

@Directive()
export class ZuiIosAutofocusHandler extends AbstractZuiAutofocusHandler {
    constructor(
        @Optional()
        @Self()
        @Inject(ZUI_FOCUSABLE_ITEM_ACCESSOR)
        zuiFocusableComponent: ZuiFocusableElementAccessor | null,
        @Inject(ElementRef) elementRef: ElementRef<HTMLElement>,
        @Inject(Renderer2) private readonly renderer: Renderer2,
        @Inject(NgZone) private readonly ngZone: NgZone,
        @Inject(WINDOW) private readonly windowRef: Window,
    ) {
        super(zuiFocusableComponent, elementRef);
        this.patchCssStyles();
    }

    public setFocus(): void {
        if (this.isTextFieldElement) {
            this.ngZone.runOutsideAngular(() => this.iosWebkitAutofocus());
        } else {
            this.element.focus();
        }
    }

    private iosWebkitAutofocus(): void {
        const fakeInput: HTMLInputElement = this.makeFakeInput();
        const duration = this.getDurationTimeBeforeFocus();
        let fakeFocusTimeoutId = 0;
        let elementFocusTimeoutId = 0;

        const blurHandler = (): void => fakeInput.focus({preventScroll: true});
        const focusHandler = (): void => {
            clearTimeout(fakeFocusTimeoutId);

            fakeFocusTimeoutId = this.windowRef.setTimeout(() => {
                clearTimeout(elementFocusTimeoutId);

                fakeInput.removeEventListener(`blur`, blurHandler);
                fakeInput.removeEventListener(`focus`, focusHandler);

                elementFocusTimeoutId = this.windowRef.setTimeout(() => {
                    this.element.focus({preventScroll: false});
                    fakeInput.remove();
                }, duration);
            });
        };

        fakeInput.addEventListener(`blur`, blurHandler, {once: true});
        fakeInput.addEventListener(`focus`, focusHandler);

        if (this.insideDialog()) {
            this.windowRef.document.body.appendChild(fakeInput);
        } else {
            this.element.parentElement?.appendChild(fakeInput);
        }

        fakeInput.focus({preventScroll: true});
    }

    /**
     * @note:
     * emulate textfield position in layout with cursor
     * before focus to real textfield element
     */
    private makeFakeInput(): HTMLInputElement {
        const fakeInput: HTMLInputElement = this.renderer.createElement(`input`);
        const rect: DOMRect = this.element.getBoundingClientRect();

        fakeInput.style.height = zuiPx(rect.height);
        fakeInput.style.width = zuiPx(rect.width / 2);
        fakeInput.style.position = `fixed`;
        fakeInput.style.opacity = `0`;
        fakeInput.style.fontSize = zuiPx(16); // disable possible auto zoom
        fakeInput.readOnly = true; // prevent keyboard for fake input

        // @note: emulate position cursor before focus to real textfield element
        fakeInput.style.top = zuiPx(rect.top);
        fakeInput.style.left = zuiPx(rect.left);

        return fakeInput;
    }

    private getDurationTimeBeforeFocus(): number {
        return (
            parseFloat(
                this.windowRef
                    .getComputedStyle(this.element)
                    .getPropertyValue(`--zui-duration`),
            ) || 0
        );
    }

    /**
     * @note:
     * unfortunately, in older versions of iOS
     * there is a bug that the fake input cursor
     * will move along with the dialog animation
     * and then that dialog will be shaking
     */
    private insideDialog(): boolean {
        return !!this.element.closest(`zui-dialog`);
    }

    /**
     * @note:
     * This is necessary so that the viewport isn't recalculated
     * and then the dialogs don't shake.
     *
     * Also, we need to fixed height viewport,
     * so that when focusing the dialogs don't shake
     */
    private patchCssStyles(): void {
        const documentRef = this.windowRef.document;

        for (const element of [documentRef.documentElement, documentRef.body]) {
            element.style.setProperty(`overflow`, `auto`);
            element.style.setProperty(`height`, `100%`);
        }
    }
}