# webix-highcharts

features :
----------

* property 'autoreset' (default: true) : removes automatically ('onBeforeLoad') the data of the datastore to avoid adding series  in case of reloading.
* a hacked setParams() method which currently only allows to set X axis limits

problems:
---------

* the highcharts library needs to be loaded beforehand. ( And needs a special piece of code ('highcharts-standalone') if used without jQuery ).

* strange (random) resizing problems ( at least under chrome 44 )


