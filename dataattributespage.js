const APP = {};

window.onload = function()
{
    APP.periodictable = new PeriodicTable();

    APP.display = new PeriodicTableDisplay(APP.periodictable, "periodictable");
}
