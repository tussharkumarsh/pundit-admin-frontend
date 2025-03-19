import { PipeTransform, Pipe } from "@angular/core";
import * as _ from "lodash";
@Pipe({
    name: 'concernSearch'
})
export class ConcernSearchFilter implements PipeTransform {
    tempArr: any = []
    searchedArr: any = []

        transform(items: any[], filter: Object): any {
            if (!items || !filter) {
                return items;
            }
            return items.filter(item => item.indexOf(filter) !== -1);
        }

    }