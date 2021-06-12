import { Track } from "./track.model";
import { BasicLicense } from "./basic-license.model";

export class TrackResponse {

    private _basicLicenses: Array<BasicLicense>;
    private _track: Track;


	constructor() {
	}


    /**
     * Getter basicLicenses
     * @return {Array<BasicLicense>}
     */
	public get basicLicenses(): Array<BasicLicense> {
		return this._basicLicenses;
	}

    /**
     * Getter track
     * @return {Track}
     */
	public get track(): Track {
		return this._track;
	}

    /**
     * Setter basicLicenses
     * @param {Array<BasicLicense>} value
     */
	public set basicLicenses(value: Array<BasicLicense>) {
		this._basicLicenses = value;
	}

    /**
     * Setter track
     * @param {Track} value
     */
	public set track(value: Track) {
		this._track = value;
	}




    
    

    


}