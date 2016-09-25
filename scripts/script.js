/*global angular */

(function () {

    "use strict";
    var app = angular.module('Todo', []);

    function MyService() {
        var obj = this;
        obj.todos = [
            {
                name: 'Learn Sketch',
                action: 'Done'
            },
            {
                name: 'Look at Dribbble and feel inferior',
                action: 'Done'
            },
            {
                name: 'Actually learn how to use the Pen tool',
                action: 'Done'
            }
        ];

        obj.getTodos = function () {
            return this.todos;
        };
        obj.addTodo = function (name) {
            var newTask = {};
            newTask.name = name;
            newTask.action = 'Done';
            obj.todos.push(newTask);
        };
        obj.updateTodo = function (indexOf, todo) {
            obj.todos[indexOf] = todo;
        };
        obj.removeTodo = function (indexOf) {
            obj.todos.splice(indexOf, 1);
        };
    }

    app.service('myService', MyService);

    app.controller('TodoCtrl', function ($scope, myService) {
        $scope.action = 'Done';
        $scope.newTodo = '';
        $scope.todos = myService.getTodos();

        $scope.done = function (e, todo) {
            if (e.type && ((e.type === 'keyup' && e.which && e.which === 13) || e.type === 'click')) {
                var indexOf = $scope.todos.indexOf(todo);
                if (indexOf !== -1) {
                    if (todo.action === 'Update') {
                        todo.action = 'Done';
                        myService.updateTodo(indexOf, todo);
                    } else {
                        if (e.type !== 'keyup') {
                            myService.removeTodo(indexOf);
                        }
                    }
                }
                event.stopPropagation();
            } else if (e.type && e.type === 'keyup') {
                todo.action = 'Update';
            }
        };

        $scope.add = function (e) {

            if (e.type && e.type === 'keyup') {
                if (e.which && e.which === 13) {
                    myService.addTodo($scope.newTodo.name);
                    $scope.newTodo.name = '';
                }
            } else if (e.type && e.type === 'click') {
                myService.addTodo($scope.newTodo.name);
                $scope.newTodo = '';
            }
        };

        $scope.loadInput = function (todo, $index) {
            var i;
            for (i = 0; i < $scope.todos.length; i += 1) {
                if (i === $index) {
                    $scope.todos[i].action = 'Update';
                } else {
                    $scope.todos[i].action = 'Done';
                }
            }
            event.stopPropagation();
        };

        $scope.loadOriginal = function () {
            var i;
            for (i = 0; i < $scope.todos.length; i += 1) {
                $scope.todos[i].action = 'Done';
            }
        };
    });
}());