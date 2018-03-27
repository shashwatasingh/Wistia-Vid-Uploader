var myApp = angular.module("wistiapp",[]);

myApp.component("wistiaUpload",{
    templateUrl: 'uploaderTemplate.html',
    controller: UploadController
});

UploadController.$inject=['$scope'];

function UploadController($scope){
    $scope.title = 'Upload Videos Using Blueimp';
    $scope.message='';
    var wistiaUrl = 'https://upload.wistia.com/?api_password=1159cea558a1df35b391f57a9203ba13be9c138b45d8106f51eef40b82fb6ff4';
    var container = angular.element(document.querySelector('#videocontainer'));
    $scope.cssprogress = { 'width' : '0%', background : '#2874A6'};
    angular.element(document.querySelector('#fileupload')).fileupload({
        url: wistiaUrl,
        add: function (e, data) {
            data.submit();
        },
        start: function(e){
            $scope.cssprogress = {'width' : '0%', background : '#2874A6'};
            $scope.message = 'Uploading your video...';
            $scope.$apply();
        },
        progress: function (e, data) {
            var progressPercent = parseInt(data.loaded / data.total * 100, 10);
            $scope.cssprogress = {'width' : progressPercent + '%', background : '#2874A6'};
            $scope.$apply();
        },
        done: function (e, data) {
            $scope.cssprogress = {'width' : '100%', background : '#5cb85c'};
            container.empty();
            container.append('<div id= "videoplugin" class="wistia_embed wistia_async_' + data.result.hashed_id + ' video-item"></div>');
            $scope.message = 'Your video was uploaded successfully!';
            $scope.$apply();
        },
        fail: function(e, data){
            $scope.cssprogress = {'width' : '100%', background : '#B81115'};
            $scope.message = 'An error has occurred: "' + data.errorThrown + '". Please check that number of videos do not exceed 3' ;
            container.empty();
            $scope.$apply();
        }
    });
};