# FlexCalendar

An Elegant Calendar Built With Angular.js

## Installation

### bower

```shell
bower install flex-calendar --save
```
and run
```shell
bower install
```
## Usage

Add to index.html:

```html
<link rel="stylesheet" href="bower_components/flex-calendar.css">
<script type="text/javascript" src="bower_components/angular-translate/angular-translate.min.js.js"></script>
<script type="text/javascript" src="bower_components/flex-calendar.js"></script>
```

Inject ``'flex-calendar'`` into your main module:

```javascript
angular.module('App', ['flexcalendar'])
```

Add ``<flex-calendar options="options" events="events"></flex-calendar>`` directive to your html file.

## Options

Flex Calendar takes a few options:

```javascript
app.controller('myController', ['$scope', function($scope) {
  "use strict";
  // With "use strict", Dates can be passed ONLY as strings (ISO format: YYYY-MM-DD)
  $scope.options = {
    defaultDate: "2015-08-06",
    minDate: "2015-01-01",
    maxDate: "2015-12-31",
    disabledDates: [
        "2015-06-22",
        "2015-07-27",
        "2015-08-13",
        "2015-08-15"
    ],
    dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
    mondayIsFirstDay: true,//set monday as first day of week. Default is false
    eventClick: function(date) { // called before dateClick and only if clicked day has events
      console.log(date);
    },
    dateClick: function(date) { // called every time a day is clicked
      console.log(date);
    },
    changeMonth: function(month, year) {
      console.log(month, year);
    },
    filteredEventsChange: function(filteredEvents) {
      console.log(filteredEvents);
    },
  };

  $scope.events = [
    {foo: 'bar', eventClass: 'expired', date: "2015-08-18"}, //value of eventClass will be added to CSS class of the day element
    {foo: 'bar', date: "2015-08-20"}
  ];
}]);
```

## Translate
To add default English translation, inject ``'flexcalendar.defaultTranslation'`` into your main module:

```javascript
angular.module('App', ['flexcalendar' , 'flexcalendar.defaultTranslation'])
``` 

If you need other translations, inject ``'pascalprecht.translate'`` into your main module:

```javascript
angular.module('App', ['flexcalendar' , 'pascalprecht.translate'])
``` 

and configure your app

```javascript
app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
      JANUARY: 'January',
      FEBRUARY: 'February',
      MARCH: 'March',
      APRIL: 'April',
      MAI: 'Mai',
      JUNE: 'June',
      JULY: 'July',
      AUGUST: 'August',
      SEPTEMBER: 'September',
      OCTOBER: 'October',
      NOVEMBER: 'November',
      DECEMBER: 'December',

      SUNDAY: 'Sunday',
      MONDAY: 'Monday',
      TUESDAY: 'Tuesday',
      WEDNESDAY: 'Wednesday',
      THURSDAY: 'Thurday',
      FRIDAY: 'Friday',
      SATURDAY: 'Saturday'
  });
  $translateProvider.translations('fr', {
      JANUARY: 'Janvier',
      FEBRUARY: 'Févier',
      MARCH: 'Mars',
      APRIL: 'Avril',
      MAI: 'Mai',
      JUNE: 'Juin',
      JULY: 'Juillet',
      AUGUST: 'Août',
      SEPTEMBER: 'Septembre',
      OCTOBER: 'Octobre',
      NOVEMBER: 'Novembre',
      DECEMBER: 'Décembre',

      SUNDAY: 'Dimanche',
      MONDAY: 'Lundi',
      TUESDAY: 'Mardi',
      WEDNESDAY: 'Mercredi',
      THURSDAY: 'Jeudi',
      FRIDAY: 'Vendredi',
      SATURDAY: 'Samedi'
  });
  $translateProvider.translations('pt', {
      JANUARY: 'Janeiro',
      FEBRUARY: 'Fevereiro',
      MARCH: 'Março',
      APRIL: 'Abril',
      MAI: 'Maio',
      JUNE: 'Junho',
      JULY: 'Julho',
      AUGUST: 'Agosto',
      SEPTEMBER: 'Setembro',
      OCTOBER: 'Outubro',
      NOVEMBER: 'Novembro',
      DECEMBER: 'Dezembro',

      SUNDAY: 'Domingo',
      MONDAY: 'Segunda',
      TUESDAY: 'Terça',
      WEDNESDAY: 'Quarta',
      THURSDAY: 'Quinta',
      FRIDAY: 'Sexta',
      SATURDAY: 'Sábado'
  });
  $translateProvider.preferredLanguage('fr');
});
```

## Example

[Here an example :)](http://codepen.io/Russian60/pen/MwOoqR)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Note
Date string use the ISO format: YYYY-MM-DD

## To Do

## License

The MIT License (MIT)

Copyright (c) 2015 Russian Rebouças

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
