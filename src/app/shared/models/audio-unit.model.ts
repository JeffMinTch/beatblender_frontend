import { ArtistAlias } from "./artist-alias.model"
import { Artist } from "./artist.model"

export class AudioUnit {
    private _artistAlias: ArtistAlias;
    private _audioFileName: string;
    private _audioUnitID: string;
    private _creator: Artist;
    private _downloads: number;
    private _genre: string;
    private _imageFileName: string;
    private _lep: number;
    private _moods: Array<string>;
    private _tags: Array<string>;
    private _tempo: number;
    private _title: string;
    private _uploadDate: Date;


    /**
     * Getter artistAlias
     * @return {ArtistAlias}
     */
	public get artistAlias(): ArtistAlias {
		return this._artistAlias;
	}

    /**
     * Getter audioUnitID
     * @return {string}
     */
	public get audioUnitID(): string {
		return this._audioUnitID;
	}

    /**
     * Getter creator
     * @return {Artist}
     */
	public get creator(): Artist {
		return this._creator;
	}

    /**
     * Getter downloads
     * @return {number}
     */
	public get downloads(): number {
		return this._downloads;
	}

    /**
     * Getter genre
     * @return {string}
     */
	public get genre(): string {
		return this._genre;
	}

    /**
     * Getter imageFileName
     * @return {string}
     */
	public get imageFileName(): string {
		return this._imageFileName;
	}

    /**
     * Getter lep
     * @return {number}
     */
	public get lep(): number {
		return this._lep;
	}

    /**
     * Getter moods
     * @return {Array<string>}
     */
	public get moods(): Array<string> {
		return this._moods;
	}

    /**
     * Getter tags
     * @return {Array<string>}
     */
	public get tags(): Array<string> {
		return this._tags;
	}

    /**
     * Getter tempo
     * @return {number}
     */
	public get tempo(): number {
		return this._tempo;
	}

    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}

    /**
     * Getter uploadDate
     * @return {Date}
     */
	public get uploadDate(): Date {
		return this._uploadDate;
	}

    /**
     * Setter artistAlias
     * @param {ArtistAlias} value
     */
	public set artistAlias(value: ArtistAlias) {
		this._artistAlias = value;
	}

    /**
     * Setter audioUnitID
     * @param {string} value
     */
	public set audioUnitID(value: string) {
		this._audioUnitID = value;
	}

    /**
     * Setter creator
     * @param {Artist} value
     */
	public set creator(value: Artist) {
		this._creator = value;
	}

    /**
     * Setter downloads
     * @param {number} value
     */
	public set downloads(value: number) {
		this._downloads = value;
	}

    /**
     * Setter genre
     * @param {string} value
     */
	public set genre(value: string) {
		this._genre = value;
	}

    /**
     * Setter imageFileName
     * @param {string} value
     */
	public set imageFileName(value: string) {
		this._imageFileName = value;
	}

    /**
     * Setter lep
     * @param {number} value
     */
	public set lep(value: number) {
		this._lep = value;
	}

    /**
     * Setter moods
     * @param {Array<string>} value
     */
	public set moods(value: Array<string>) {
		this._moods = value;
	}

    /**
     * Setter tags
     * @param {Array<string>} value
     */
	public set tags(value: Array<string>) {
		this._tags = value;
	}

    /**
     * Setter tempo
     * @param {number} value
     */
	public set tempo(value: number) {
		this._tempo = value;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

    /**
     * Setter uploadDate
     * @param {Date} value
     */
	public set uploadDate(value: Date) {
		this._uploadDate = value;
	}


    /**
     * Getter audioFileName
     * @return {string}
     */
	public get audioFileName(): string {
		return this._audioFileName;
	}

    /**
     * Setter audioFileName
     * @param {string} value
     */
	public set audioFileName(value: string) {
		this._audioFileName = value;
	}



    
}