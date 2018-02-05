angular.module('myApp.directives', []);

as.directive('loading', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
})

as.directive('validFile', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ngModel) {
            ngModel.$render = function () {
                ngModel.$setViewValue(el.val());
            };

            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$render();
                });
            });
        }
    };
});

/**
 Created : 03 Oct 2016
 Purpose: Email uniqueness checking on REgistration form     
 */

as.directive("ngUnique", function (Users) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function (e) {
                if (!ngModel || !element.val())
                    return;
                var keyProperty = scope.$eval(attrs.ngUnique);
                var currentValue = element.val();
                Users.checkUniqueValue(keyProperty.key, keyProperty.property, currentValue)
                        .then(function (unique) {
                            //Ensure value that being checked hasn't changed
                            //since the Ajax call was made
                            if (currentValue == element.val()) {

                                ngModel.$setValidity('unique', unique);
                                scope.$broadcast('show-errors-check-validity');
                            }
                        });
            });
        }
    }
});


as.directive('disallowSpaces', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element) {
            $element.bind('keydown', function (e) {
                if (e.which === 32) {
                    return false;
                }
            });
        }
    }
});


as.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
               $('.icon-ok').tooltip({title: "<div class='dir-tooltip-content'><h2 class='title-text'>Verifierad psykoterapeut</h2> <p class='para'>MinTerapi.se har verifierat denna psykoterapeuts kvalifikationer, legitimering och patientf&ouml;rs&auml;kring.</p></div>", html: true, placement: "top"});
            
           /* }, function(){              
                // on mouseleave
                $(element).tooltip('hide');*/
            });
        }
    };
});

as.directive('tooltip1', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
               $('.icon-ok').tooltip({title: "<div class='dir-tooltip-content'><h2 class='title-text'>Verifierad psykoterapeut</h2> <p class='para'>MinTerapi.se har verifierat denna psykoterapeuts kvalifikationer, yrkeslegitimation och f&ouml;rs&auml;kring.</p></div>", html: true, placement: "top"});
            });
        }
    };
});

as.directive('micro', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
              $('.microphone').tooltip({title: "<div class='dir-tooltip-content'><p class='para'>Denna psykoterapeut erbjuder telefonsessioner.</p></div>", html: true, placement: "top"});
            });
        }
    };
});


as.directive('msg', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
              $('.message').tooltip({title: "<div class='dir-tooltip-content'><p class='para'>Denna psykoterapeut erbjuder meddelandesessioner.</p></div>", html: true, placement: "top"});
            });
        }
    };
});

as.directive('tooltiponline', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.hover(function(){
                // on mouseenter
                element.tooltip({title: "<div class='dir-tooltip-content'><p class='para'>Tillg&auml;nglig</p></div>", html: true, placement: "top"});
            });
        }
    };
});

as.directive('tooltipoffline', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.hover(function(){
                // on mouseenter
                element.tooltip({title: "<div class='dir-tooltip-content'><p class='para'>Ej tillg&auml;nglig</p></div>", html: true, placement: "top"});
            });
        }
    };
});

as.directive('showMore', [function() {   
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            text: '=',
            limit:'='
        },

        template: '<span ng-bind-html="text | subString :0 :end | unsafe"></span> ',

        link: function(scope, iElement, iAttrs) {
            scope.end = scope.limit;
        }
    }
}]);

as.directive('trustedHtml', ['$sce', function($sce) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$formatters.push(function(value) {
          function htmlDecode(input){
            var elem = document.createElement('div');
            elem.innerHTML = input;
            return elem.childNodes.length === 0 ? '' : elem.childNodes[0].nodeValue;
          }
          return htmlDecode(value);
        });
      }
    }
}])

as.directive('date', function (dateFilter) {
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'HH:mm';
           
            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
})

as.directive('ckeditor', [function (data) {
    return {
        require: '?ngModel',
        link: function (scope, element, attr, ngModel) {
            scope.details = scope.$eval(attr.data);   

            var editorOptions;
            editorOptions = {
                height: 135,
                toolbar: [
                        { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste','-', 'Undo', 'Redo' ] },
                        { name: 'links', items: [ 'Link', 'Unlink'] },
                        { name: 'insert', items: [ 'Image'] },
                        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline'] },
                        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'] },
                        { name: 'styles', items: [ 'Styles', 'Format' ] }
                ],
                wordcount: {

                    showParagraphs: false,
                    // Whether or not you want to show the Word Count
                    showWordCount: true,

                    // Whether or not you want to show the Char Count
                    showCharCount: false,

                    // Maximum allowed Word Count
                    maxWordCount: scope.details,

                    // Maximum allowed Char Count
                  
                    countSpacesAsChars: true
                },
                resize_enabled: false
            };

            // enable ckeditor
            var ckeditor = $(element).ckeditor(editorOptions);
            
           

            //// update ngModel on change
            ckeditor.editor.on('change', function () {
                ngModel.$setViewValue(this.getData());                
            });
        }
    };
}]);

as.directive("numlimit", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.numlimit);
            angular.element(elem).on("keypress", function(e) {                
                var key   = e.keyCode ? e.keyCode : e.which;
                if (this.value.length >= limit && key >= 48 && key <= 57){
                    e.preventDefault();
                }
            });
        }
    }
}]);







