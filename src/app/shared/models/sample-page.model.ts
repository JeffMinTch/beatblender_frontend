import { Sample } from './sample.model';
import { PaginationResponseParams } from "./pagination-response-params.model";

export class SamplePage extends PaginationResponseParams {

    private _samples: Array<Sample>;




    /**
     * Getter samples
     * @return {Array<Sample>}
     */
	public get samples(): Array<Sample> {
		return this._samples;
	}

    /**
     * Setter samples
     * @param {Array<Sample>} value
     */
	public set samples(value: Array<Sample>) {
		this._samples = value;
	}
	



}