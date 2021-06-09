import { AudioUnit } from "./audio-unit.model"

export class Track {
    
    private _audioUnit: AudioUnit;
    private _trackID: string;


	constructor() {
	}



    /**
     * Getter audioUnit
     * @return {AudioUnit}
     */
	public get audioUnit(): AudioUnit {
		return this._audioUnit;
	}

    /**
     * Getter trackID
     * @return {string}
     */
	public get trackID(): string {
		return this._trackID;
	}

    /**
     * Setter audioUnit
     * @param {AudioUnit} value
     */
	public set audioUnit(value: AudioUnit) {
		this._audioUnit = value;
	}

    /**
     * Setter trackID
     * @param {string} value
     */
	public set trackID(value: string) {
		this._trackID = value;
	}


}