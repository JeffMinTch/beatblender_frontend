export class PaginationRequestParams {

    private _sortBy: string;
    private _pageNo: number;
    private _pageSize: number;


	constructor(sortBy: string, pageNo: number, pageSize: number) {
		this._sortBy = sortBy;
		this._pageNo = pageNo;
		this._pageSize = pageSize;
	}


    /**
     * Getter sortBy
     * @return {string}
     */
	public get sortBy(): string {
		return this._sortBy;
	}

    /**
     * Getter pageNo
     * @return {number}
     */
	public get pageNo(): number {
		return this._pageNo;
	}

    /**
     * Getter pageSize
     * @return {number}
     */
	public get pageSize(): number {
		return this._pageSize;
	}

    /**
     * Setter sortBy
     * @param {string} value
     */
	public set sortBy(value: string) {
		this._sortBy = value;
	}

    /**
     * Setter pageNo
     * @param {number} value
     */
	public set pageNo(value: number) {
		this._pageNo = value;
	}

    /**
     * Setter pageSize
     * @param {number} value
     */
	public set pageSize(value: number) {
		this._pageSize = value;
	}

    
}