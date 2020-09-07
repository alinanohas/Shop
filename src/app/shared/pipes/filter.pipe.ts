import { Pipe, PipeTransform } from '@angular/core';
import { IColor } from '../interfaces/color.interface';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value, args:any[]): any {
    if (!value) { return [] }
    if (args.length == 0) { return value }
    if (args.length > 0) {
      return value.filter(
        item => {
          for (let i = 0; i < args.length; i++) {
            if (item.color == args[i])
             return item
          }
          for (let i = 0; i < args.length; i++) {
            if (item.subcategory == args[i])
             return item
          }
          for (let i = 0; i < args.length; i++) {
            if (item.size == args[i])
             return item
          }
          for (let i = 0; i < args.length; i++) {
            if (item.vendor == args[i])
             return item
          }
        }
        
      )
    }
  }
}