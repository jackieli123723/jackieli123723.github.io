(function ($) {

var tdcd = angular.module('tdcd', []);

tdcd.directive('tdcDatepicker', function () {
    return {
        scope: {
            model: '=tdcDatepicker'
        },
        link: function (scope, element) {
            element.DatePicker({
                format:'Y-m-d',
                flat: true,
                date: scope.model,
                calendars: 1,
                onRender: function(date) {
                    return { disabled: (date.valueOf() > moment().subtract('day', 1).toDate().valueOf()) };
                },
                onChange: function (formated) {
                    scope.$apply(function () { scope.model = formated; });
                },
                locale: {
                    days: ["日", "一", "二", "三", "四", "五", "六", "日"],
                    daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
                    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    weekMin: '周'
                }
            });
        }
    };
});

tdcd.directive('tdcDropdown', function () {
    return {
        scope: { },
        link: function ($scope, $element, $attrs) {
            $element.children().eq(0).on('click', function () {
                $element.children().eq(1).toggle();
            });

            function handleBodyClick(evt) {
                if (!$.contains($element[0], evt.target)) {
                    $element.children().eq(1).hide();
                    $scope.$emit('dropdown.hide');
                }
            }
            
//            $element.children().eq(1).on('click', function (evt) {
//            	evt.preventDefault();
//            });
            
            $(document.body).on('click', handleBodyClick);
            $element.on('$destroy', function () { $(document.body).off('click', handleBodyClick); });
        }
    };
});

tdcd.directive('tdcInput', function () {
    return {
        scope: {
            model: '=tdcInput'
        },
        link: function (scope, element) {
            element.val(scope.model);

            var isDate = element.is('input[type=date]');
            function parseVal() {
                var val = !isDate ? element.val() : Date.parse(element.val());
                if (_.isString(val) || !isNaN(val)) {
                    scope.$apply(function() { scope.model = element.val(); });
                }
            }

            element.on('keypress', function () {
                if(event.which === 13) parseVal();
            });

            if (isDate) element.on('change', function () {
                parseVal();
            });
        }
    };
});

tdcd.directive('tdcRadio', function () {
    return {
        template: '<a ng-repeat="it in listData" ng-class="getItemClass(it)" ng-click="select(it)">{{it.text}}</a>',
        scope: {
            model: '=tdcRadio',
            listData: '=tdcListData'
        },
        controller: function ($scope, $attrs) {
            var selectedClass = $attrs.tdcSelectedClass || 'active';

            $scope.getItemClass = function (item) {
                if ($scope.model === item.value) return selectedClass;
            };

            $scope.select = function (item) {
                $scope.model = item.value;
            };
        }
    }
});


tdcd.directive('vbox', function() {
	  return {
	    link: function(scope, element, attrs) {
	      attrs.$observe('vbox', function(value) {
	        element.get(0).setAttribute('viewBox', value);
	      })
	    }
	  };
	});


tdcd.directive('tdcSelect', function () {
    return {
        templateUrl: 'ui/tdc-select.html',
        transclude: true,
        scope: {
            model: '=tdcSelect',
            invert: '=tdcInvert',
            listData: '=tdcListData'
        },
        controller: function ($scope, $element, $attrs) {
            if ($attrs.tdcInvert) {
                $scope.canInvert = true;
                if (_.isUndefined($scope.invert)) $scope.invert = 1;
                $scope.invertOptions = [{ value: 1, text: '是' }, { value: 0, text: '不是' }];
                $scope.$watch('invert', function (){ $scope.showFlag = false; });
            }

            $scope.valueField = $attrs.tdcValueField || 'value';
            $scope.textField = $attrs.tdcTextField || 'text';
            $scope.group = $attrs.tdcGroup;

            function handleBodyClick(evt) {
                if (!$.contains($element[0], evt.target)) {
                    $scope.$apply(function () { $scope.showFlag = false;});
                }
            }
            $(document.body).on('click', handleBodyClick);
            $element.on('$destroy', function () { $(document.body).off('click', handleBodyClick); });

            function getValue(item) {
                return $scope.valueField === 'this' ? item : item[$scope.valueField];
            }

            $scope.selected = _.find($scope.listData, function (d) { return getValue(d) === $scope.model; });

            $scope.getSelected = function () {
                return $scope.selected;
            };

            $scope.getListData = function () { return $scope._listData; };
            $scope.$watch('listData', refreshListData);
            function refreshListData() {
                if ($scope.group) {
                    var gl = {};
                    _.each($scope.listData, function (li) {
                        var gd = gl[li[$scope.group]] = gl[li[$scope.group]] || { __isGroup: true, __showFlag: false, text: li[$scope.group], items: [] };
                        gd.items.push(li);
                    });

                    var topItems = gl[undefined];
                    delete  gl[undefined];

                    var listData = topItems ? topItems.items.concat(_.values(gl)) : _.values(gl);
                    $scope._listData = _.flatten(_.map(listData, function (l) { return !l.__isGroup || l.items.length > 2 ? l : l.items; }));
                } else {
                    $scope._listData = $scope.listData;
                }
            }

            $scope.toggleShow = function () {
                $scope.showFlag = !$scope.showFlag;
            };

            $scope.toggleGroup = function (l) {
                l.__showFlag = !l.__showFlag;
            };

            $scope.setVal = function (li) {
                $scope.model = getValue(li);
                $scope.selected = li;
                $scope.showFlag = false;
            };
        }
    };
});


tdcd.directive('leftMenu', function () {
    return {
        templateUrl: 'ui/leftmenu.html',
        transclude: true,
        scope: {
        }
    };
});


tdcd.directive('share', function () {
    return {
        templateUrl: 'ui/share.html',
        transclude: true,
        scope: {
        }
    };
});
})(jQuery);