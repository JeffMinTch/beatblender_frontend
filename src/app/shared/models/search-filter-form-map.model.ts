import { MinMaxSlider } from './min-max-slider.model';
import { Selection } from './selection.model';
import { FormControl, FormGroup } from '@angular/forms';
export interface SearchFilterFormMap {

    selectionFormMap: Map<FormControl, Selection>;
    minMaxSliderFormMap: Map<FormGroup, MinMaxSlider>;

}