import { PipeTransform, Pipe } from "@angular/core";
import * as _ from "lodash";
@Pipe({
    name: 'customerProductSerialNumberSearch'
})
export class CustomerProductSerialNumberSearchFilter implements PipeTransform {
    tempArr: any = []
    searchedArr: any = []


    transform(value: any, text: string, field1: string, field2: string) {
        this.searchedArr = []
        var searchText = _.lowerCase(text).replace(/[\s]/g, "");
        if (text) {
            value.filter((elem: { [x: string]: string | undefined; }) => {
                if ((_.lowerCase(elem[field1]).replace(/[\s]/g, "").includes(searchText)) || (_.lowerCase(elem[field2]).replace(/[\s]/g, "").includes(searchText))) {
                    this.searchedArr.push(elem)
                }
            })
            return this.searchedArr;
        } else {
            return value
        }


    }
}