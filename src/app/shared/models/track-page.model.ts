import { Track } from './track.model';
import { PaginationResponseParams} from  './pagination-response-params.model';

export class TrackPage extends PaginationResponseParams {

    private _tracks: Array<Track>; 

    /**
     * Getter tracks
     * @return {Array<Track>}
     */
	public get tracks(): Array<Track> {
		return this._tracks;
	}

    /**
     * Setter tracks
     * @param {Array<Track>} value
     */
	public set tracks(value: Array<Track>) {
		this._tracks = value;
	}

}