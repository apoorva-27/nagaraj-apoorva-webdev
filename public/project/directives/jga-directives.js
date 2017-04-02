/**
 * Created by hiresave on 3/1/2017.
 */

(function () {
    angular
        .module('Travelogue')
        .directive('wbdvSortable', sortableDir);

    function sortableDir(WidgetService,$routeParams) {



        function linkFunc(scope, element, attributes) {

            var pid = $routeParams.pid;
            var index1,index2;
            element.sortable({
                axis: 'y',
                start:function (event,ui) {
                    index1=ui.item.index();
                },
                stop:function (event,ui) {
                    index2=ui.item.index();

                    WidgetService.sortWidgets(pid,index1,index2)
                        .success(function () {

                        })
                }
            });
        }
        return {
            link: linkFunc
        };
    }
})();