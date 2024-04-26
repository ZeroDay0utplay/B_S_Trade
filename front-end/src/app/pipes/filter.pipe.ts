import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(stocks: string[], searchText: string): any[] {
    if(!stocks) return [];
    if(!searchText) return stocks;
    searchText = searchText.toLowerCase();
    return stocks.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
  }

}
