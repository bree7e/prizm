import { Injectable, Injector, Type } from '@angular/core';
import { noop, Observable, Observer, Subject } from 'rxjs';
import { ZuiBaseDialogContext, ZuiDialogBaseOptions } from '../components/dialogs/dialog/dialog.models';
import { PolymorphContent, ZuiOverscrollService } from '../directives';
import {
  ZUI_OVERLAY_BACKDROP_NO_POINTERS,
  ZuiOverlayControl,
  ZuiOverlayGlobalPosition,
  ZuiOverlayInsidePlacement,
  ZuiOverlayService, ZuiOverlaySlidePosition,
} from '../modules/overlay';
import { takeUntil } from 'rxjs/operators';
import { ZuiOverscrollMode } from '../directives/overscroll/overscroll.model';
import { generateId } from '../util';
import { ZuiOverlayConfig } from '../modules/overlay/models';


@Injectable()
export abstract class AbstractZuiDialogService<T extends ZuiDialogBaseOptions, O = unknown, DATA = unknown> {
  protected abstract readonly component: Type<unknown>;
  protected abstract readonly defaultOptions: T;
  protected readonly overlayService: ZuiOverlayService;
  protected readonly overscrollService: ZuiOverscrollService
  protected constructor(
    injector: Injector
  ) {
    this.overlayService = injector.get(ZuiOverlayService);
    this.overscrollService = injector.get(ZuiOverscrollService);
  }

  public open<O = unknown, DATA = unknown>(
    content: PolymorphContent<ZuiBaseDialogContext<O>> | unknown,
    options: Partial<T> = {},
    cb: (data: {
      control: ZuiOverlayControl,
      dialog: ZuiBaseDialogContext<any, any>,
      observer: Observer<O>,
      destroy$: Observable<void>,
    }) => void = noop,
  ): Observable<O> {
    const destroy$ = new Subject<void>()
    return new Observable(observer => {
      const completeWith = (result: O): void => {
        observer.next(result);
        observer.complete();
      };

      const dialog = {
        ...this.defaultOptions,
        ...(options),
        content,
        component: this.component,
        completeWith,
        $implicit: observer,
        createdAt: Date.now(),
        id: options.id ?? this.defaultOptions.id ?? generateId(),
      };

      const control = this.overlayService
        .position(this.getPosition(dialog))
        .config(this.getConfig(dialog))
        .content(dialog.component, {
          context: dialog
        })
        .create();

      control.open();

      this.setOverscrollMode(
        options.overscroll ?? 'scroll',
        control,
        destroy$
      );

      if (typeof cb === 'function') {
        cb({control, dialog, observer, destroy$: destroy$.asObservable()});
      }


      return (): void => {
        control.close();
        destroy$.next();
        destroy$.complete();
      };
    })
  }

  protected getConfig(
    dialog: ZuiBaseDialogContext<any, any>,
  ): Partial<ZuiOverlayConfig> {
    return {
      backdrop: dialog.backdrop ?? true,
      containerClass: dialog.containerClass ?? '',
      backdropClass: [
        dialog.backdrop && ZUI_OVERLAY_BACKDROP_NO_POINTERS,
        dialog.backdropClass
      ].filter(Boolean).join(' '),
      wrapperClass: dialog.wrapperClass,
    }
  }

  protected getPosition(
    dialog: ZuiBaseDialogContext<any, any>,
  ): ZuiOverlayGlobalPosition | ZuiOverlaySlidePosition | ZuiOverlayGlobalPosition {
    return new ZuiOverlayGlobalPosition(
      {
        placement: dialog.position ?? ZuiOverlayInsidePlacement.CENTER,
        width: dialog.width ?? 'auto',
        height: dialog.height ?? 'auto'
      }
    );
  }

  private setOverscrollMode(
    mode: ZuiOverscrollMode,
    control: ZuiOverlayControl,
    destroy$: Observable<void>
  ): void {
    control.viewEl.style.pointerEvents = 'unset';
    this.overscrollService.run(
      mode,
      control.viewEl,
    ).pipe(
      takeUntil(destroy$)
    ).subscribe();
  }
}