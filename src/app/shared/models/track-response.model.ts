import { AudioUnit } from "./audio-unit.model";
import { Track } from "./track.model";

export class TrackResponse {

    private _mixedIns: Array<AudioUnit>;
    private _track: Track;


	constructor() {
	}



    /**
     * Getter mixedIns
     * @return {Array<AudioUnit>}
     */
	public get mixedIns(): Array<AudioUnit> {
		return this._mixedIns;
	}

    /**
     * Getter track
     * @return {Track}
     */
	public get track(): Track {
		return this._track;
	}

    /**
     * Setter mixedIns
     * @param {Array<AudioUnit>} value
     */
	public set mixedIns(value: Array<AudioUnit>) {
		this._mixedIns = value;
	}

    /**
     * Setter track
     * @param {Track} value
     */
	public set track(value: Track) {
		this._track = value;
	}
    

    


}