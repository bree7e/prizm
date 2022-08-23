import { Pipe, PipeTransform } from '@angular/core';
import { ZuiMapper } from '../../types/mapper';

@Pipe({name: `zuiMapper`})
export class ZuiMapperPipe implements PipeTransform {
    /**
     * Maps object to an arbitrary result through a mapper function
     *
     * @param value an item to transform
     * @param mapper a mapping function
     * @param args arbitrary number of additional arguments
     */
    public transform<T, G>(value: T, mapper: ZuiMapper<T, G>, ...args: unknown[]): G {
        return mapper(value, ...args);
    }
}