import { Component, inject } from '@angular/core';
import { GiphyService } from './giphy.service';
import { GiphySearch } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  private giphyServ = inject(GiphyService)
  protected searchParams!: GiphySearch

  // fetchGiphyImages($event: GiphySearch) {
  //   console.info('In fetchGiphyImages: ', this.searchParams)
  //   this.giphyServ.getGiphyImages(this.searchParams).then(result => { console.info('Promise result: ', result); this.giphyImages = result }).catch(err => { console.info('Promise error: ', err) })
  // }
}
