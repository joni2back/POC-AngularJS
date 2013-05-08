angular.module('app-poc', ['ui.bootstrap']);

function GastosCtrl($scope, $dialog) {
	var self = this;

	jsondiffpatch.config.objectHash = function(obj) {
		return obj.id || obj.descripcion || obj.valor || JSON.stringify(obj);
	};
			
	$scope.gastos = [
		{
			id: 1,
			fecha: '2013-04-12',
			descripcion: "Compra loca",
			valor: 132.50
		},
		{
			id: 2,
			fecha: '2013-04-18',
			descripcion: "Pago Gas",
			valor: 45.32
		},
		{
			id: 3,
			fecha: '2013-04-19',
			descripcion: "Pago EPE",
			valor: 187.99
		}
	];
	
	this.gastosOrig = angular.copy($scope.gastos);
	
	$scope.agregarGasto = function() {
		var gasto1 = {
			id: -1,
			fecha: '2013-05-06',
			descripcion: '',
			valor: 0.00
		};
		self.openDialog(gasto1, function(result) {
			if(result) {
			  $scope.gastos.push(result);
			}
			gasto1 = undefined;
		});
	};
	
	$scope.editarGasto = function(gasto) {
		var gasto1 = angular.copy(gasto);
		self.openDialog(gasto1, function(result) {
			if(result) {
			  angular.copy(result, gasto);
			}
			gasto1 = undefined;
		});
	};
	
	$scope.quitarGasto = function(gasto) {
		$scope.gastos = jQuery.grep($scope.gastos, function(item) {
			return item.id !== gasto.id;
		});
	};
	
	$scope.guardarGastos = function() {
		var delta = jsondiffpatch.diff(angular.copy(self.gastosOrig), angular.copy($scope.gastos), true);
		alert(JSON.stringify(delta));
	};
	
	this.openDialog = function(gasto, success) {
			opts = {
				backdrop: true,
				backdropFade: true,
				keyboard: true,
				backdropClick: true,
				controller: 'DialogCtrl',
				template: $('#gastos-dialog').html(),
				resolve: {item: function() { return gasto; }}
			};		
		$dialog.dialog(opts)
		  .open()
		  .then(success);
	}
}