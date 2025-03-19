import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTableFilter'
})
export class SearchTableFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: { contact: string; firstName: string; }) => {
      let rVal = (val.contact.toLocaleLowerCase().includes(args)) || (val.firstName.toLocaleLowerCase().includes(args))
      return rVal;
    })

  }

}
