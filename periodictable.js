class PeriodicTable
{
	constructor()
	{
		this._rowcount = 10;
		this._columncount = 19;
        this._data = periodictabledata;
        this._FilterChangedEventHandlers = [];
    }

	get columncount() { return this._columncount };
	get rowcount() { return this._rowcount; };
	get data() { return this._data; };

	GetElement(atomicnumber)
	{
		return this._data[atomicnumber - 1];
	}
}
