var layouts = [
  [
    [4, 4, 4],
    [6, 6],
    [4, 4, 4]
  ],
  [
    [6, 6],
    [4, 4, 4]
  ]
];

angular
  .module('image', [])
  .directive('viewport', viewport)
  .controller('image', imageController);

function viewport () {
  return {
    controller: function($scope, $element) {
      var el = $element;

      el.bind('dragenter', function (e) {
        console.log('enter');
      });

      el.bind('dragover', function (e) {

      });

      el.bind('dragleave', function (e) {
        console.log('leave');
      });

      el.bind('dragend', function (e) {
        console.log('end', e);
      });
      
      el.bind('drop', function (e) {
        console.log(e);
        var image = e.originalEvent.dataTransfer.files[0]
          , reader = new FileReader;
        
        e.preventDefault();

        reader.onload = function(e) {
          $scope.$apply(function() {
            $scope.imageSrc = e.target.result;  
          });
        };

        reader.readAsDataURL(image);
        
        return false;
      });
    }
  }  
}

function imageController ($scope) {
  $scope.layout = layouts[0];

  $scope.changeLayout = function () {
    $scope.layout = $scope.layout == layouts[0]
      ? layouts[1]
      : layouts[0]; 
  }
}
