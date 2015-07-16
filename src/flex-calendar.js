(function(){

  angular
    .module('flexcalendar', [])
    .directive('flexCalendar', flexCalendar);

    function flexCalendar() {

      var template =
      '<div class="flex-calendar">'+
        '<div class="month">'+
          '<div class="arrow" ng-click="prevMonth()"></div>'+
          '<div class="label">{{selectedMonth}} {{selectedYear}}</div>'+
          '<div class="arrow" ng-click="nextMonth()"></div>'+
        '</div>'+
        '<div class="week">'+
          '<div class="day" ng-repeat="day in weekDays(options.dayNamesLength) track by $index">{{day}}</div>'+
        '</div>'+
        '<div class="days">'+
          '<div class="day"'+
            'ng-repeat="day in days  track by $index"'+
            'ng-class="{selected: isDefaultDate(day), event: day.event, disabled: day.disabled, out: !day}"'+
            'ng-click="onClick(day, $index, $event)"'+
          '>'+
            '<div class="number">{{day.day}}</div>'+
          '</div>'+
        '</div>'+
      '</div>';

      var directive = {
        restrict: 'E',
        scope: {
          options: '=?',
          events: '=?'
        },
        template: template,
        controller: Controller
      };

      return directive;

    }

    Controller.$inject = ['$scope'];

    function Controller($scope) {
      var MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      var WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

      $scope.days = [];
      $scope.options = $scope.options || {};
      $scope.options.dayNamesLength = $scope.options.dayNamesLength || 1;

      $scope.onClick = onClick;
      $scope.allowedPrevMonth = allowedPrevMonth;
      $scope.allowedNextMonth = allowedNextMonth;
      $scope.weekDays = weekDays;
      $scope.isDefaultDate = isDefaultDate;
      $scope.prevMonth = prevMonth;
      $scope.nextMonth = nextMonth;

      if ($scope.options.minDate) {
        $scope.options.minDate = new Date($scope.options.minDate);
      }

      if ($scope.options.maxDate) {
        $scope.options.maxDate = new Date($scope.options.maxDate);
      }

      $scope.$watch('options.defaultDate', function() {
        calculateSelectedDate();
      });

      $scope.$watch('options.disabledDates', function() {
        calculateDisabledDates();
      });

      $scope.$watch('events', function() {
        calculateWeeks();
      });

      /////////////////

      function onClick(date, index, domEvent) {
        if (!date || date.disabled) { return; }
        $scope.options.defaultDate = date.date;
        if (date.event) {
          $scope.options.eventClick(date, domEvent);
        } else {
          $scope.options.dateClick(date, domEvent);
        }
      }

      function bindEvent(date) {
        if (!date || !$scope.events) { return; }
        $scope.events.forEach(function(event) {
          event.date = new Date(event.date);
          if (date.year === event.date.getFullYear() && date.month === event.date.getMonth() && date.day === event.date.getDate()) {
            date.event = event;
          }
        });
      }

      function allowedDate(date) {
        if (!$scope.options.minDate && !$scope.options.maxDate) {
          return true;
        }
        var currDate = new Date([date.year, date.month + 1, date.day]);
        if ($scope.options.minDate && (currDate < $scope.options.minDate)) { return false; }
        if ($scope.options.maxDate && (currDate > $scope.options.maxDate)) { return false; }
        return true;
      }

      function disabledDate(date) {
        if (!$scope.options.disabledDates) return false;
        for(var i = 0; i < $scope.options.disabledDates.length; i++){
          if(date.year === $scope.options.disabledDates[i].getFullYear() && date.month === $scope.options.disabledDates[i].getMonth() && date.day === $scope.options.disabledDates[i].getDate()){
            return true;
            break;
          }
        }
      }

      function allowedPrevMonth() {
        var prevYear = null;
        var prevMonth = null;
        if (!$scope.options.minDate) { return true; }
        var currMonth = MONTHS.indexOf($scope.selectedMonth);
        if (currMonth === 0) {
          prevYear = ($scope.selectedYear - 1);
        } else {
          prevYear = $scope.selectedYear;
        }
        if (currMonth === 0) {
          prevMonth = 11;
        } else {
          prevMonth = (currMonth - 1);
        }
        if (prevYear < $scope.options.minDate.getFullYear()) { return false; }
        if (prevYear === $scope.options.minDate.getFullYear()) {
          if (prevMonth < $scope.options.minDate.getMonth()) { return false; }
        }
        return true;
      }

      function allowedNextMonth() {
        var nextYear = null;
        var nextMonth = null;
        if (!$scope.options.maxDate) { return true; }
        var currMonth = MONTHS.indexOf($scope.selectedMonth);
        if (currMonth === 11) {
          nextYear = ($scope.selectedYear + 1);
        } else {
          nextYear = $scope.selectedYear;
        }
        if (currMonth === 11) {
          nextMonth = 0;
        } else {
          nextMonth = (currMonth + 1);
        }
        if (nextYear > $scope.options.maxDate.getFullYear()) { return false; }
        if (nextYear === $scope.options.maxDate.getFullYear()) {
          if (nextMonth > $scope.options.maxDate.getMonth()) { return false; }
        }
        return true;
      }

      function flattenWeek(){
        $scope.days = $scope.weeks.reduce(function(a, b) {
          return a.concat(b);
        });
      }

      function calculateWeeks() {
        $scope.weeks = [];
        var week = null;
        var daysInCurrentMonth = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth) + 1, 0).getDate();

        for (var day = 1; day < daysInCurrentMonth + 1; day += 1) {
          var date = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day);
          var dayNumber = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day).getDay();
          week = week || [null, null, null, null, null, null, null];
          week[dayNumber] = {
            year: $scope.selectedYear,
            month: MONTHS.indexOf($scope.selectedMonth),
            day: day,
            date: date,
            _month : date.getMonth() + 1,
          };

          if (allowedDate(week[dayNumber])) {
            if ($scope.events) { bindEvent(week[dayNumber]); }
          } else {
            week[dayNumber].disabled = true;
          }

          if (week[dayNumber] && disabledDate(week[dayNumber])) {
            week[dayNumber].disabled = true;
          }

          if (dayNumber === 6 || day === daysInCurrentMonth) {
            $scope.weeks.push(week);
            week = undefined;
          }
        }

        flattenWeek();
      }

      function calculateSelectedDate() {
        if ($scope.options.defaultDate) {
          $scope.options._defaultDate = new Date($scope.options.defaultDate);
        } else {
          $scope.options._defaultDate = new Date();
        }

        $scope.selectedYear  = $scope.options._defaultDate.getFullYear();
        $scope.selectedMonth = MONTHS[$scope.options._defaultDate.getMonth()];
        $scope.selectedDay   = $scope.options._defaultDate.getDate();
        calculateWeeks();
      }

      function calculateDisabledDates() {
        if (!$scope.options.disabledDates || $scope.options.disabledDates.length === 0) return;
        for(var i = 0; i < $scope.options.disabledDates.length; i++){
          $scope.options.disabledDates[i] = new Date($scope.options.disabledDates[i]);
        }
        calculateWeeks();
      }

      function weekDays(size) {
        return WEEKDAYS.map(function(name) { return name.slice(0, size); });
      }

      function isDefaultDate(date) {
        if (!date) { return; }
        var result = date.year === $scope.options._defaultDate.getFullYear() &&
          date.month === $scope.options._defaultDate.getMonth() &&
          date.day === $scope.options._defaultDate.getDate();
        return result;
      }

      function prevMonth() {
        if (!$scope.allowedPrevMonth()) { return; }
        var currIndex = MONTHS.indexOf($scope.selectedMonth);
        if (currIndex === 0) {
          $scope.selectedYear -= 1;
          $scope.selectedMonth = MONTHS[11];
        } else {
          $scope.selectedMonth = MONTHS[currIndex - 1];
        }
        var month = {name: $scope.selectedMonth, index: currIndex - 1, _index: currIndex+2 };
        $scope.options.changeMonth(month);
        calculateWeeks();
      }

      function nextMonth() {
        if (!$scope.allowedNextMonth()) { return; }
        var currIndex = MONTHS.indexOf($scope.selectedMonth);
        if (currIndex === 11) {
          $scope.selectedYear += 1;
          $scope.selectedMonth = MONTHS[0];
        } else {
          $scope.selectedMonth = MONTHS[currIndex + 1];
        }
        var month = {name: $scope.selectedMonth, index: currIndex + 1, _index: currIndex+2 };
        $scope.options.changeMonth(month);
        calculateWeeks();
      }
    }

})();
