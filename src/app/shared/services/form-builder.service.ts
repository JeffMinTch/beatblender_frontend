import { Selection } from 'app/shared/models/selection.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MinMaxSlider } from '../models/min-max-slider.model';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  categories: string[] = ['Tracks', 'People', 'Playlists'];

  constructor(
    private fb: FormBuilder
  ) { }

  buildSearchForm(): FormGroup {
    return this.fb.group({
      'search': ['']
    });
  }

  buildTrackFilterForm(): Observable<Map<string, Array<Selection> | Array<MinMaxSlider>>> {
      const filterFormMap: Map<string, Array<Selection> | Array<MinMaxSlider>> = new Map<string, Array<Selection> | Array<MinMaxSlider>>();
      const selectionList: Array<Selection> = new Array<Selection>();
      selectionList.push({
        contentList: this.categories,
        label: 'categories',
        placeholder: 'categories' 
      });
      // selectionList.push({
      //   contentList: this.moods,
      //   label: 'moods',
      //   placeholder: 'moods' 
      // });
      // selectionList.push({
      //   contentList: this.categories,
      //   label: 'categories',
      //   placeholder: 'categories' 
      // });
  
      filterFormMap.set('selection', selectionList);
      const minMaxSliderArray: Array<MinMaxSlider> = new Array<MinMaxSlider>();
      // minMaxSliderArray.push({
      //   label: 'Tempo',
      //   minValue: 1,
      //   maxValue: 300
      // });
      // minMaxSliderArray.push({
      //   label: 'Lep',
      //   minValue: 1,
      //   maxValue: 1000
      // });
      filterFormMap.set('minMaxSlider', minMaxSliderArray);
      return of(filterFormMap);
    } 
}
