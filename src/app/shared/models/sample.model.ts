import { AudioUnit } from './audio-unit.model';
// export interface Sample {
//     queuePosition: number,
//     id: string,
//     artistName: string,
//     sampleTitle: string,
//     audioFile: string,
//     sampleImage: string,
//     audioFileDownLoadUri: string,
//     imageDownLoadUri: string,
//     genre: string,
//     trackType: string,
//     songKey: string,
//     region: string,
//     audioDescription: string,
//     sampleID: number,
//     samplePrice: string
// }
// export interface Sample {
//     sampleID: string;
//     title: string;
//     genre: string;
//     tempo: number;
//     moods: Array<string>;
//     tags: Array<string>;
//     audioFileName: string,
//     imageFileName: string;
//     lep: number;
//     artistName: string;
// }


export class Sample {

    private _sampleID: string;
    private _audioUnit: AudioUnit;


	constructor() {
	}


    /**
     * Getter sampleID
     * @return {string}
     */
	public get sampleID(): string {
		return this._sampleID;
	}

    /**
     * Getter audioUnit
     * @return {AudioUnit}
     */
	public get audioUnit(): AudioUnit {
		return this._audioUnit;
	}

    /**
     * Setter sampleID
     * @param {string} value
     */
	public set sampleID(value: string) {
		this._sampleID = value;
	}

    /**
     * Setter audioUnit
     * @param {AudioUnit} value
     */
	public set audioUnit(value: AudioUnit) {
		this._audioUnit = value;
	}

}