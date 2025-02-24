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
  
  ngOnInit(): void {
    this.form = this.createForm()
  }
  private createForm() : FormGroup {
    return this.form = this.fb.group({ q: this.fb.control<string>('', [Validators.required, Validators.minLength(1)]),
    limit: this.fb.control<number>(5, [Validators.min(1), Validators.max(25)]),
    rating: this.fb.control<string>('g', [Validators.required])
  })
  }
  onClear() {
    this.form = this.createForm()
    this.giphyServ.clearResults()
  }

  onSearch() {
    const params : GiphySearch = this.form.value
    console.info('Params: ', params)
    // this.giphyServ.getGiphyImages(params).subscribe((result:any) => { next: console.info('Result: ', result)})
    this.giphyServ.getGiphyImages(params).then(result => { console.info('Promise result: ', result)}).catch(err => {console.info('Promise error: ', err)})
    // this.newSearchParams.next(params)
  }
}
