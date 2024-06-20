import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(private _gifsService:GifsService){}

  get gifs(){
    return this._gifsService.gifList;
  }

}
