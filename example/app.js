(function (window) {
    'use strict';
    
    var ng = angular
        .module('app', [
            'angular-datetimepicker-dialog'
        ])
        .controller('AppCtrl', AppCtrl );

    
    AppCtrl.$inject = ['$scope'];


    function AppCtrl($scope) {


        this.date = moment(new Date()).format('YYYY-MM-DD HH:mm');
        var self = this;

        this.dateSet = function(){
            this.date = moment(this.date).format('YYYY-MM-DD HH:mm');
        }
        
    }


    angular.element(document).ready(function() {
        setTimeout(function(){
            angular.bootstrap(document, [ng.name]);
        }, 0);
    });

})(window);