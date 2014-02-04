App.controller('ExpensesController', function($scope, $modal) {
    var self = this;

    //jsondiffpatch.config.objectHash = function (obj) {
    //    return obj.id || obj.description || obj.amount || JSON.stringify(obj);
    //};

    $scope.expenses = [
        {
            id: 1,
            date: '2013-04-12',
            description: "Some stuff",
            amount: 132.50
        },
        {
            id: 2,
            date: '2013-04-18',
            description: "Vegetables",
            amount: 45.32
        },
        {
            id: 3,
            date: '2013-04-19',
            description: "Food",
            amount: 187.99
        }
    ];

    //this.expensesOrig = angular.copy($scope.expenses);

    $scope.addExpense = function() {
        var gasto1 = {
            id: -1,
            date: self.getFormattedDate(),
            description: '',
            amount: 0.00
        };
        self.openDialog(gasto1, function(result) {
            if (result) {
                $scope.expenses.push(result);
            }
            gasto1 = undefined;
        });
    };

    $scope.editExpense = function (gasto) {
        var gasto1 = angular.copy(gasto);
        self.openDialog(gasto1, function (result) {
            if (result) {
                angular.copy(result, gasto);
            }
            gasto1 = undefined;
        });
    };

    //$scope.quitarGasto = function (gasto) {
    //    $scope.expenses = jQuery.grep($scope.expenses, function (item) {
    //        return item.id !== gasto.id;
    //    });
    //};

    //$scope.guardarGastos = function () {
    //    var delta = jsondiffpatch.diff(angular.copy(self.expensesOrig), angular.copy($scope.expenses), true);
    //    alert(JSON.stringify(delta));
    //};

    this.getFormattedDate = function () {
        var now = new Date();
        var yyyy = now.getFullYear().toString();
        var mm = (now.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = now.getDate().toString();

        return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
    };

        this.openDialog = function(gasto, success) {
        opts = {
            backdrop: true,
            backdropFade: true,
            keyboard: true,
            backdropClick: true,
            controller: 'DialogController',
            template: $('#expenses-dialog').html(),
            resolve: { item: function() { return gasto; } }
        };
        $modal.open(opts)
            .result.then(success);
    };
});

App.controller('DialogController', function ($scope, $modalInstance, item) {
    $scope.expense = item;

    $scope.save = function() {
        $modalInstance.close($scope.expense);
    };

    $scope.close = function() {
        $modalInstance.close(undefined);
    };
});