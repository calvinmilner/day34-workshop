import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { filter, firstValueFrom, map, Subject, tap } from "rxjs";
import { GiphySearch } from "../models";

@Injectable()
export class GiphyService {

    private http = inject(HttpClient)

    giphyResults = new Subject<string[]>()

    getGiphyImages(query: GiphySearch): Promise<string[]> {
        // let q = 'sleeping babies' => 'sleeping+babies'
        // .set('api_key', api.key)
        const params = new HttpParams().set('q', query.q.replace(' ', '+')).set('limit', query.limit).set('rating', query.rating)
        return firstValueFrom<string[]>(this.http.get<any>('https://api.giphy.com/v1/gifs/search?api_key=e4h0xdConybuhKBpu7dwxy48SHrzOcQ3', { params: params }).pipe(
            // data => any[]
            map(result => result['data']),
            tap(result => { console.info('TAP 0: ', result) }),
            map((data: any[]) => { return data.map((g: any) => g.images.fixed_height.url) }),
            // fixed_height => string[] of url
            tap(images => {
                console.info('TAP 1: ', images)
                this.giphyResults.next(images)
            })
        ))
        // .then(result => { this.giphyResults.next(result)
        //     return result
        // })

        // return firstValueFrom(this.http.get<GiphyResults>('https://api.giphy.com/v1/gifs/search?api_key=e4h0xdConybuhKBpu7dwxy48SHrzOcQ3&q=cats&limit=10&rating=g').pipe(map(data => data), map(images => images), map(fixed_height => fixed_height), map(url => url)))
    }
}