import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private _gifsService: GifsService) { }

  get tagHistory(): string[] {
    return this._gifsService.tagsHistory;
  }

  searchTag(tag: string) {
    this._gifsService.searchTag(tag);
  }


}
