import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchConcern'
})
export class SearchConcernPipe implements PipeTransform {

  transform(items: any[], filterdata: string): unknown {
    if(!items) return [];
    if(!filterdata) return items;
     console.log(filterdata);
     filterdata = filterdata.toString().toLowerCase();
     return items.filter( it => {
       console.log(it);
     return it.name.toLowerCase().includes(filterdata);
      });
  }

}
