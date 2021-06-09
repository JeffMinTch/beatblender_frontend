import { Artist } from "./artist.model"

export class ArtistAlias {

    private _artistALiasID: string;
    private _artistName: string;
    private _creationDate: Date;
    private _artist: Artist;


    constructor() {

    }



    /**
     * Getter artistALiasID
     * @return {string}
     */
	public get artistALiasID(): string {
		return this._artistALiasID;
	}

    /**
     * Getter artistName
     * @return {string}
     */
	public get artistName(): string {
		return this._artistName;
	}

    /**
     * Getter creationDate
     * @return {Date}
     */
	public get creationDate(): Date {
		return this._creationDate;
	}

    /**
     * Getter artist
     * @return {Artist}
     */
	public get artist(): Artist {
		return this._artist;
	}

    /**
     * Setter artistALiasID
     * @param {string} value
     */
	public set artistALiasID(value: string) {
		this._artistALiasID = value;
	}

    /**
     * Setter artistName
     * @param {string} value
     */
	public set artistName(value: string) {
		this._artistName = value;
	}

    /**
     * Setter creationDate
     * @param {Date} value
     */
	public set creationDate(value: Date) {
		this._creationDate = value;
	}

    /**
     * Setter artist
     * @param {Artist} value
     */
	public set artist(value: Artist) {
		this._artist = value;
	}


    








}