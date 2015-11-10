(function (window) {
    'use strict';
    
    angular
        .module('angular-datetimepicker-dialog', [
            'ui.bootstrap.datetimepicker',
            'ngDialog'
        ])
        .directive('datetimepickerDialog', angularDatetimepickerDialog );

    
    angularDatetimepickerDialog.$inject = ['ngDialog'];


    function angularDatetimepickerDialog(ngDialog) {

        var directive = {
            restrict: 'EA',
            scope: {
                datePickerConfig: '@',
                onSetTime: '&',
                ngModel: '=',
                formatView: '@'  
            },
            replace: true,
            
            controller: directiveCtrl,
            controllerAs: 'vm',
            templateUrl: function(elem, attr){
                return attr.template;
            }
        };
        return directive;
    }

    directiveCtrl.$inject = ['$scope', 'ngDialog', '$timeout']
    function directiveCtrl($scope, ngDialog, $timeout){
        var vm = this;

        this.getViewDate = function(){
            if(!$scope.ngModel){
                return '';
            }
            var m = moment($scope.ngModel); 
            var str = m.format( $scope.formatView || 'DD.MM.YYYY, HH:mm');
            return str;
        }
        // $scope.datePickerConfig = $scope.$parent.$eval($scope.datePickerConfig);
        this.open = function(){
            var dialog =  ngDialog.open({
                template: 'datetimepicker-dialog.html',
                controller: ['$scope', function(_scope) {
                    _scope.model = $scope.ngModel;
                    _scope.config = $scope.$parent.$eval($scope.datePickerConfig);//$scope.datePickerConfig;
                    _scope.onSetTime = function(n, o){
                        dialog.close();
                        $scope.ngModel = _scope.model;
                        console.log('$scope.ngModel', $scope.ngModel);
                        if($scope.onSetTime){
                            $timeout(function(){
                                $scope.onSetTime(n, o);    
                            }, 0);    
                        }
                    }
                    _scope.close = function(){
                        dialog.close();
                    };
                }]
            });
        }
    }

})(window);