import { AudioUnit } from "./audio-unit.model";

export class MixedIn {

    private _child: AudioUnit;
    private _creationDate: Date;
    private _mixedInID: string;
    private _parent: AudioUnit;



    /**
     * Getter child
     * @return {AudioUnit}
     */
	public get child(): AudioUnit {
		return this._child;
	}

    /**
     * Getter creationDate
     * @return {Date}
     */
	public get creationDate(): Date {
		return this._creationDate;
	}

    /**
     * Getter mixedInID
     * @return {string}
     */
	public get mixedInID(): string {
		return this._mixedInID;
	}

    /**
     * Getter parent
     * @return {AudioUnit}
     */
	public get parent(): AudioUnit {
		return this._parent;
	}

    /**
     * Setter child
     * @param {AudioUnit} value
     */
	public set child(value: AudioUnit) {
		this._child = value;
	}

    /**
     * Setter creationDate
     * @param {Date} value
     */
	public set creationDate(value: Date) {
		this._creationDate = value;
	}

    /**
     * Setter mixedInID
     * @param {string} value
     */
	public set mixedInID(value: string) {
		this._mixedInID = value;
	}

    /**
     * Setter parent
     * @param {AudioUnit} value
     */
	public set parent(value: AudioUnit) {
		this._parent = value;
	}


}