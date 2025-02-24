import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnDestroy {
  
  private giphyServ = inject(GiphyService)
  private sub!: Subscription

  giphyImages: string[] = []

ngOnInit(): void {
  this.giphyServ.giphyResults.subscribe(images => {
    // next
    next: this.giphyImages = images
  })
}

ngOnDestroy(): void {
  this.sub.unsubscribe
}
}
