(function(){

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
    var app = angular.module('mynotes', ['ionic', 'mynotes.notestore'])

    // states like routes
    app.config(function($stateProvider, $urlRouterProvider){
        $stateProvider.state('list', {
            url: '/list',
            templateUrl: 'templates/list.html'
        });

        $stateProvider.state('add', {
            url: '/add',
            templateUrl: 'templates/edit.html',
            controller: 'AddCtrl'
        });

        $stateProvider.state('edit', {
            url: '/edit/:noteId',
            templateUrl: 'templates/edit.html',
            controller: 'EditCtlr'
        });

        // default state by router:
        $urlRouterProvider.otherwise('/list');
    });

    //---------------ListController-------------------------------
    app.controller('ListCtlr', function($scope, NoteStore){

        $scope.reordering = false;
        $scope.notes = NoteStore.list();

        $scope.delete = function(noteId) {
            NoteStore.delete(noteId);
        };

        $scope.move = function(note, fromIndex, toIndex) {
            console.log('move from ' + fromIndex + ' to ' + toIndex);
            NoteStore.move(note, fromIndex, toIndex); // call move func
        };

        $scope.toggleReorder = function() {
            $scope.reordering = !$scope.reordering;
        };
    }); //---------------ListController-------------------------------

    app.controller('AddCtrl', function($scope, $state, NoteStore){
        $scope.note = {
            id: new Date().getTime().toString(),
            title: '',
            description: ''
        };

        $scope.save = function() {
            NoteStore.create($scope.note);
            $state.go('list');
        };
    }); //---------------Add Controller-------------------------------


    app.controller('EditCtlr', function($scope, $state, NoteStore){
        // copy must have a save button.  set id by calling function:
        $scope.note = angular.copy(NoteStore.get($state.params.noteId));

        $scope.save = function() {
            NoteStore.update($scope.note);
            $state.go('list');
        };
    }); //---------------Edit Controller-------------------------------


    //-------------------------------------------------------------------
    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the
        // accessory bar above the keyboard for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
}());
