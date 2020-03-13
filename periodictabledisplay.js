class PeriodicTableDisplay
{
	constructor(periodictable, tableid)
	{
		this._periodictable = periodictable;
        this._tableid = tableid;

		this._categoryClassMappings =
		{
			"Alkali metal": "alkalimetal",
			"Alkaline earth metal": "alkalineearthmetal",
			"Lanthanide": "lanthanide",
			"Actinide": "actinide",
			"Transition metal": "transitionmetal",
			"Post-transition metal": "posttransitionmetal",
			"Metalloid": "metalloid",
			"Reactive nonmetal": "reactivenonmetal",
			"Noble gas": "noblegas",
			"Unknown": "unknown"
		}

		this._groupNames =
		{
			1: "Alkali metals",
			2: "Alkaline earth metals ",
			15: "Pnictogens",
			16: "Chalcogens",
			17: "Halo­gens",
			18: "Noble gases"
		};

		this._createCells();
		this._createColumnHeadings();
		this._createRowHeadings();
		this._populate();

		document.getElementById(this._tableid).addEventListener('click', event =>
		{
			const target = event.target;

			if(target.parentElement.classList.contains("elementcell"))
			{
				target = event.target.parentElement;
			}

			if(target.classList.contains("elementcell"))
			{
				const element = this._periodictable.GetElement(target.dataset.atomicnumber);

				const details = `Name: ${element.name}\nAtomic Number: ${element.atomicnumber}\nChemical Symbol: ${element.symbol}`;

				alert(details);
			}
		});
    }

	_createCells()
	{
		let table = document.getElementById(this._tableid);

		let currentcell;

		for(let row = 0; row < this._periodictable.rowcount; row++)
		{
            let newrow = document.createElement('tr');
			table.appendChild(newrow);

			for(let column = 0; column < this._periodictable.columncount; column++)
			{
                let cell = document.createElement('td');

				cell.setAttribute("data-row", row);
				cell.dataset.column = column;

                newrow.appendChild(cell);
			}
		}
	}

	_createColumnHeadings()
	{
		for(let column = 1; column <= 18; column++)
		{
			let currentcell = document.querySelector(`[data-row='0'][data-column='${column}']`);
			currentcell.innerHTML = `${column}<br /><span class="groupname">${this._groupNames[column] || "&nbsp;"}</span>`;
			currentcell.classList.add("headingcell");
		}
	}

	_createRowHeadings()
	{
		for(let row = 1; row <= 7; row++)
		{
			let currentcell = document.querySelector(`[data-row='${row}'][data-column='0']`);
			currentcell.innerHTML = row;
			currentcell.classList.add("headingcell");
		}
	}

    _populate()
    {
		let currentcell = null;
		let tooltip = "";

		for(let element of this._periodictable.data)
		{
			currentcell = document.querySelector(`[data-row='${element.tablerow18col}'][data-column='${element.tablecolumn18col}']`);

			currentcell.setAttribute('data-atomicnumber', element.atomicnumber);

			currentcell.innerHTML = `
				${element.name}<br />
				${element.atomicnumber}<br />
				<span class="chemicalsymbol">${element.symbol}</span><br />
				${element.atomicweight}`;

			currentcell.classList.add("elementcell");
		}

		this.ColorByCategory();
    }

	ColorByCategory()
	{
        for(let element of this._periodictable.data)
		{
			const currentcell = document.querySelector(`[data-atomicnumber='${element.atomicnumber}']`);

			currentcell.classList.add(this._categoryClassMappings[element.category]);
		}
	}
}
