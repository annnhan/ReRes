'use strict';
var reres = angular.module('reres', []);

reres.controller('mapListCtrl', function($scope) {
    var bg = chrome.extension.getBackgroundPage();

    //保存规则数据到localStorage
    function saveData() {
        bg.localStorage.ReResMap = JSON.stringify($scope.maps);
    }

    //当前编辑的规则
    $scope.curRule = {
        req: '',
        res: '',
        type: 'file',
        checked: true
    }

    $scope.maps = bg.ReResMap;

    //编辑框显示状态
    $scope.editDisplay = 'none';

    //编辑框保存按钮文本
    $scope.editType = '添加';

    //输入错误时候的警告
    $scope.inputError = '';

    //验证输入合法性
    $scope.virify = function () {
        if (!$scope.curRule.req || !$scope.curRule.res) {
            $scope.inputError = '输入不能为空';
            return false;
        }
        try {
            new RegExp($scope.curRule.req)
        } catch (e){
            $scope.inputError = 'req正则格式错误';
            return false;
        }
        $scope.inputError = '';
        return true;
    }

    // 点击添加按钮
    $scope.addRule = function () {
        if ($scope.editDisplay === 'none') {
            $scope.curRule = {
                req: '',
                res: '',
                type: 'file',
                checked: true
            };
            $scope.editType = '添加';
            $scope.editDisplay = 'block';
        } else {
            $scope.editType === '添加' && ($scope.editDisplay = 'none');
        }
    };

    //点击编辑按钮
    $scope.edit = function (rule) {
        $scope.curRule = rule;
        $scope.editType = '编辑';
        $scope.editDisplay = 'block';
    }

    //编辑后保存
    $scope.saveRule = function () {
        if ( $scope.virify() ) {
            if ($scope.editType === '添加') {
                $scope.maps.push($scope.curRule);
            } else {

            }
            saveData();
            $scope.editDisplay = 'none';
        }
    };

    //删除规则
    $scope.removeUrl = function (rule) {
        for (var i = 0, len = $scope.maps.length; i< len; i++) {
            if ($scope.maps[i] === rule) {
                $scope.maps.splice(i, 1);
            }
        }
        saveData();
    }
});