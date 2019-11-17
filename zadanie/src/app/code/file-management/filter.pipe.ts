import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], prop: string, value: string , method:Method): any {
    if (arr) {
      if (!value) {
        return arr
      } else {
        return arr.filter(obj => this.filter(String(obj[prop]),value, method))
      }
    } else {
      return []
    }
  }

  filter(source : string, target :string, method:Method) : boolean {
    if (method == "includes"){
      return source.includes(target)
    }else if (method == "equal"){
      if (source == "true"){
        return true;
      }
    }
    return false;
  }
}

type Method ="includes" | "equal" | "not-equal"