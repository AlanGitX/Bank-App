import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filer'
})
export class FilerPipe implements PipeTransform {

  transform(allTransactions:[],searchkey:string,propName:string): any [] {
    const result:any=[];
    if(!allTransactions || searchkey== '' || propName == ''){
      return allTransactions;
    }
    allTransactions.forEach((item:any)=>{
      if (      item[propName].trim().toLowerCase().includes(searchkey.toLowerCase())
      ) {
        result.push(item);
      }
    })
    return result;
  }

}
