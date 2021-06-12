import { Track } from './track.model';
export class FullLicense {
    
    private _fullLicenseID: string;
    private _track: Track;
    private _creationDate: Date;


    /**
     * Getter fullLicenseID
     * @return {string}
     */
	public get fullLicenseID(): string {
		return this._fullLicenseID;
	}

    /**
     * Getter track
     * @return {Track}
     */
	public get track(): Track {
		return this._track;
	}

    /**
     * Getter creationDate
     * @return {Date}
     */
	public get creationDate(): Date {
		return this._creationDate;
	}

    /**
     * Setter fullLicenseID
     * @param {string} value
     */
	public set fullLicenseID(value: string) {
		this._fullLicenseID = value;
	}

    /**
     * Setter track
     * @param {Track} value
     */
	public set track(value: Track) {
		this._track = value;
	}

    /**
     * Setter creationDate
     * @param {Date} value
     */
	public set creationDate(value: Date) {
		this._creationDate = value;
	}

}