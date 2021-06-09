import { User } from './user.model';
 export class Artist {

    private _artistID: string;
    private _birthDate: Date;
    private _creationDate: Date;
    private _lep: number;
    private _realFirstName: string;
    private _realLastName: string;
    private _user: User;


    /**
     * Getter artistID
     * @return {string}
     */
	public get artistID(): string {
		return this._artistID;
	}

    /**
     * Getter birthDate
     * @return {Date}
     */
	public get birthDate(): Date {
		return this._birthDate;
	}

    /**
     * Getter creationDate
     * @return {Date}
     */
	public get creationDate(): Date {
		return this._creationDate;
	}

    /**
     * Getter lep
     * @return {number}
     */
	public get lep(): number {
		return this._lep;
	}

    /**
     * Getter realFirstName
     * @return {string}
     */
	public get realFirstName(): string {
		return this._realFirstName;
	}

    /**
     * Getter realLastName
     * @return {string}
     */
	public get realLastName(): string {
		return this._realLastName;
	}

    /**
     * Getter user
     * @return {User}
     */
	public get user(): User {
		return this._user;
	}

    /**
     * Setter artistID
     * @param {string} value
     */
	public set artistID(value: string) {
		this._artistID = value;
	}

    /**
     * Setter birthDate
     * @param {Date} value
     */
	public set birthDate(value: Date) {
		this._birthDate = value;
	}

    /**
     * Setter creationDate
     * @param {Date} value
     */
	public set creationDate(value: Date) {
		this._creationDate = value;
	}

    /**
     * Setter lep
     * @param {number} value
     */
	public set lep(value: number) {
		this._lep = value;
	}

    /**
     * Setter realFirstName
     * @param {string} value
     */
	public set realFirstName(value: string) {
		this._realFirstName = value;
	}

    /**
     * Setter realLastName
     * @param {string} value
     */
	public set realLastName(value: string) {
		this._realLastName = value;
	}

    /**
     * Setter user
     * @param {User} value
     */
	public set user(value: User) {
		this._user = value;
	}
   

 }