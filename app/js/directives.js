app.directive("showsMessageWhenHovered", function() {
    return {
        link: function(scope, element, attributes) {
            var originalMessage = scope.message;
            element.bind("mouseenter", function() {
                scope.message = attributes.message;
                scope.$apply();
            });
            element.bind("mouseleave", function() {
                scope.message = originalMessage;
                scope.$apply();
            });
        }
    };
});

app.directive('signupLoginWidget', function() {
    return {
        templateUrl: 'directives/signup-login-widget.html'
    };
});

app.directive('userProfileWidget', function() {
    return {
        templateUrl: 'directives/user-profile-widget.html'
    };
});

app.directive('navbarWidget', function() {
    return {
        controller: 'NavbarCtrl',
        templateUrl: 'directives/navbar-widget.html'
    };
});