import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiphySearch } from '../../models';
import { Subject } from 'rxjs';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  private giphyServ = inject(GiphyService)
  private fb = inject(FormBuilder)
  protected form!: FormGroup

  @Output()
  newSearchParams = new Subject<GiphySearch>()
  
  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control<string>('', [Validators.required]),
      limit: this.fb.control<number>(5),
      rating: this.fb.control<string>('g')
    })
  }
  
  onClear() {}

  onSearch() {
    const params : GiphySearch = this.form.value
    console.info('Params: ', params)
    // this.giphyServ.getGiphyImages(params).then(result => { console.info('Promise result: ', result)}).catch(err => {console.info('Promise error: ', err)})
    this.newSearchParams.next(params)
  }
}
