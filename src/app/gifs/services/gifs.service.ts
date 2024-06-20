import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGiphyResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = "OyfdDBmIdsN6CLPxjAhZ23d0kcQxxqTZ";
  private urlBase: string = "https://api.giphy.com/v1/gifs";


  constructor(private _httpClient: HttpClient) {
    this.loadLocalStorage();
  }


  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem("tagsHistory", JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('tagsHistory')) return;
    const temp = localStorage.getItem('tagsHistory');
    this._tagsHistory = JSON.parse(temp!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(newTag: string): void {
    if (newTag.length == 0) return;
    this.organizeHistory(newTag);

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", 10)
      .set("q", newTag);

    this._httpClient.get<SearchGiphyResponse>(`${this.urlBase}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        //console.log(resp);
      });


  }
}
