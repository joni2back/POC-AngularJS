function DialogCtrl($scope, dialog, item) {
	$scope.gasto = item;
	
	$scope.guardar = function() {
		dialog.close($scope.gasto);
	};
	
	$scope.cerrar = function() {
		dialog.close(undefined);
	};
}