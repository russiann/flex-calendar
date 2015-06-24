# FlexCalendar

A Elegant Calendar Built With Angular.js

## Installation

Add to index.html:

```html
<link rel="stylesheet" href="path/to/flex-calendar.css">
<script type="text/javascript" src="path/to/flex-calendar.js"></script>
```

Inject ``'russian60.flex-calendar'`` into your main module:

```javascript
angular.module('App', ['flex-calendar'])
```

## Usage

Add ``<flex-calendar options="options" events="events"></flex-calendar>`` directive to your html file.

Flex Calendar takes a few options:

```javascript
app.controller('SchedulingController', ['$scope', function($scope) {
  // Dates can be passed as strings or Date objects 
  $scope.options = {
    defaultDate: "2015-06-23",
    minDate: new Date([2015, 06, 12]),
    maxDate: new Date([2015, 12, 31]),
    dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
    eventClick: function(date) {
      console.log(date);
    },
    dateClick: function(date) {
      console.log(date);
    },
    changeMonth: function(month) {
      console.log(month);
    }
  };
  
  $scope.events = [
    {foo: 'bar', date: new Date([2015, 12, 31])},
    {foo: 'bar', date: new Date([2015, 6, 4])}
  ];
}]);
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## To Do

1. Bower Package


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

