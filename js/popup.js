'use strict';
var reres = angular.module('reres', []);

reres.controller('mapListCtrl', function($scope) {
    var bg, ReResMap, maps = [];

    function init() {
        bg = chrome.extension.getBackgroundPage();
        ReResMap = bg.ReResMap;
        maps = [];
        for (var i in ReResMap) {
            ReResMap[i].forEach(function (item) {
                maps.push(item);
            });
        }
        //原始规则列表
        $scope.maps = maps;
        console.log($scope.maps);
    }
    function update() {
        bg.localStorage.ReResMap = JSON.stringify(ReResMap);
        init();
    }

    init();

    //当前编辑的规则
    $scope.curRule = {
        req: '',
        res: '',
        type: 'file',
        checked: true
    }

    //编辑框显示状态
    $scope.editShow = 'none';

    //编辑框保存按钮文本
    $scope.editType = '添加';

    // 点击添加按钮
    $scope.addRule = function () {
        $scope.curRule = {
            req: '',
            res: '',
            type: 'file',
            checked: true
        };
        $scope.editType = '添加';
        $scope.editShow = 'block';
    };

    //编辑后保存
    $scope.saveRule = function () {
        if($scope.editType == '添加'){
            ReResMap[$scope.curRule.type].push($scope.curRule);
            update();
        }else{

        };
        $scope.editShow = 'none';
    };
});