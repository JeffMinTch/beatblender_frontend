import { BasicLicense } from './basic-license.model';
import { FullLicense } from './full-license.model';
import { MixedIn } from './mixed-in.model';
export class FullLicenseResponse {

    private _fullLicense: FullLicense;
    private _basicLicenseList: Array<BasicLicense>;




    /**
     * Getter fullLicense
     * @return {FullLicense}
     */
	public get fullLicense(): FullLicense {
		return this._fullLicense;
	}

    /**
     * Getter basicLicenseList
     * @return {Array<BasicLicense>}
     */
	public get basicLicenseList(): Array<BasicLicense> {
		return this._basicLicenseList;
	}

    /**
     * Setter fullLicense
     * @param {FullLicense} value
     */
	public set fullLicense(value: FullLicense) {
		this._fullLicense = value;
	}

    /**
     * Setter basicLicenseList
     * @param {Array<BasicLicense>} value
     */
	public set basicLicenseList(value: Array<BasicLicense>) {
		this._basicLicenseList = value;
	}


}