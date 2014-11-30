angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap', 'datePicker']);

function CalendarCtrl($scope) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.newEvent = {
      title: '新しいイベント',
      club: '',
      start: '',
      end: ''
    };

    // GET /api/events 
    /* default event */
    $scope.events = [
      {title:'会議', club: 'バドミントンサークル',start: new Date(y, m, 1, 16), end: new Date(y, m, 1, 18)},
      {title:'練習', club: 'Glee Club',start: new Date(y, m, d - 4, 18), end: new Date(y, m, d - 4, 20)},
      {title:'会議', club: 'ダンスサークル',start: new Date(y, m, d - 4, 20), end: new Date(y, m, d - 4, 22)},
      {title:'会議', club: 'ダンスサークル',start: new Date(y, m, d - 18, 20), end: new Date(y, m, d - 18, 22)},
      {title:'会議', club: 'ダンスサークル',start: new Date(y, m, d + 4, 20), end: new Date(y, m, d + 4, 22)},
      {title:'会議', club: 'ダンスサークル',start: new Date(y, m, d + 14, 20), end: new Date(y, m, d + 14, 22)},
      {title:'会議', club: 'ダンスサークル',start: new Date(y, m, d + 24, 20), end: new Date(y, m, d + 24, 22)},
      {title:'会議', club: 'ダンスサークル',start: new Date(y, m, d + 16, 20), end: new Date(y, m, d + 16, 22)},
      {title:'会議', club: 'ダンスサークル',start: new Date(y, m, d + 7, 20), end: new Date(y, m, d + 7, 22)},
      {title:'練習', club: 'フットサル',start: new Date(y, m, 28, 20), end: new Date(y, m, 28, 22)}
    ];

    /* alert on eventClick */
    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
        $scope.editEvent = true;
        event.start = +new Date(event.start._d);
        event.end = +new Date(event.end._d);
        $scope.eventToBeEdit = event;
    };

    /* alert on Drop */
     $scope.alertOnDrop = function( event, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped on ' + event.start.format());
    };
    /* alert on Resize */
    $scope.alertOnResize = function( event, jsEvent, ui, view){
       $scope.alertMessage = ('Event end date was moved to ' + event.end.format());
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

    // POST /api/addEvent
    /* add custom event*/
    $scope.addEvent = function() {
      var event = angular.copy($scope.newEvent);
      $scope.events.push(event);
      $scope.newEvent = {
        title: '',
        start: '',
        end: '',
        club: ''
      };
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    $scope.showAddNewEventFrom = function() {
      $scope.editEvent = false;
    }

    /* Change View */
    $scope.changeView = function(view,calendar) {
      calendar.fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(calendar){
        calendar.fullCalendar('render');
      }
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}