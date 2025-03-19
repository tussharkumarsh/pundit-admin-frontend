import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAllOrderFilter'
})
export class SearchAllOrderFilterPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   if (!args) {
  //     return value;
  //   }
  //   return value.filter((val: { requestNumber: string; requesterName: string; }) => {
  //     let rVal = (val.requestNumber.toLocaleLowerCase().includes(args)) || (val.requesterName.toLocaleLowerCase().includes(args))
  //     return rVal;
  //   })

  // }



  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: { requestNumber: string; requesterName: any; }) => {
      let rVal = (val.requestNumber.toLocaleLowerCase().includes(args)) || (val.requesterName?.toLocaleLowerCase().includes(args) || '')
      return rVal;
    })

  }

}
