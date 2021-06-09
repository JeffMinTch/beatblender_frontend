import { Sample } from './sample.model';
import { User } from "./user.model";

export class BasicLicense {

    private _basicLicenseID: string;
    private _creationdDate: Date;
    private _downloader: User;
    private _lep: number;
    private _sample: Sample;



    /**
     * Getter basicLicenseID
     * @return {string}
     */
	public get basicLicenseID(): string {
		return this._basicLicenseID;
	}

    /**
     * Getter creationdDate
     * @return {Date}
     */
	public get creationdDate(): Date {
		return this._creationdDate;
	}

    /**
     * Getter downloader
     * @return {User}
     */
	public get downloader(): User {
		return this._downloader;
	}

    /**
     * Getter lep
     * @return {number}
     */
	public get lep(): number {
		return this._lep;
	}

    /**
     * Getter sample
     * @return {Sample}
     */
	public get sample(): Sample {
		return this._sample;
	}

    /**
     * Setter basicLicenseID
     * @param {string} value
     */
	public set basicLicenseID(value: string) {
		this._basicLicenseID = value;
	}

    /**
     * Setter creationdDate
     * @param {Date} value
     */
	public set creationdDate(value: Date) {
		this._creationdDate = value;
	}

    /**
     * Setter downloader
     * @param {User} value
     */
	public set downloader(value: User) {
		this._downloader = value;
	}

    /**
     * Setter lep
     * @param {number} value
     */
	public set lep(value: number) {
		this._lep = value;
	}

    /**
     * Setter sample
     * @param {Sample} value
     */
	public set sample(value: Sample) {
		this._sample = value;
	}
	

    

}