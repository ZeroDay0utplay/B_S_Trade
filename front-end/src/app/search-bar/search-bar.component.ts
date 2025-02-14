import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs';
import { Stock } from '../Interfaces/stocks';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})


export class SearchBarComponent implements OnInit{
  stocks: Stock[] = [];
  filteroptions!: Observable<Stock[]>
  formcontrol = new FormControl('');

  constructor(
    private getStockService: GetDataService
  ){}

  ngOnInit(){
    this.getStockService.getData('/stocks')
    .subscribe(
      stocks => {
        this.stocks = stocks;
      }
    )
    this.filteroptions = this.formcontrol.valueChanges.pipe(
      startWith(''), map(value => this._LISTFILTER(value || ''))
    )
  }

  private _LISTFILTER(value: string): Stock[] {
    const searchvalue = value.toLocaleLowerCase();
    return this.stocks.filter(option => option.stock_name.toLocaleLowerCase().includes(searchvalue));
  }

  changeRoute(route: string){
    console.log(route);
    window.location.href= '/predict/' + route;
  }
}