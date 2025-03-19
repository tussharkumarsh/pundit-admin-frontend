import { PipeTransform, Pipe } from "@angular/core";
import * as _ from "lodash";
@Pipe({
    name: 'searchSparePart'
})
export class SearchSparePartFilter implements PipeTransform {
    tempArr: any = []
    searchedArr: any = []

    
    transform(value: any,text:any,sparePartMap:any) {
        console.log(text)
        console.log(value)
        this.searchedArr = []
        var searchText = _.lowerCase(text).replace(/[\s]/g, "");
        if (text) {
            value.filter((elem: { sparePartId: string | number; }) => {
                if ((_.lowerCase(sparePartMap[elem.sparePartId].description).replace(/[\s]/g, "").includes(searchText))|| (_.lowerCase(sparePartMap[elem.sparePartId].partCode).replace(/[\s]/g, "").includes(searchText))) {
                    this.searchedArr.push(elem)
                }
            })
            return this.searchedArr;
        } else {
            return value;
        }


    }
}