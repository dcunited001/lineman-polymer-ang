# Appistack - Lineman Polymer Ang

 A Containerized AngularJS Single-Page App Template with AngularUI and Polymer

## TODO
- TODO: Travis Build and Build Status Icon
- TODO: Configure Travis and update build status
- TODO: get poltergeist working with AngularJS
- TODO: fix modal forms - they run validation even when cancel is clicked
- TODO: ui-bootstrap HTML Popovers 
  - add a templateUrl and setup promises to resolve template, like bootstrap $modal
  - copy over the template/popover/popover.html from ui-bootstrap then transclude the popover template inside this
- TODO: until users login, routes they don't have access to redirect them to a page with the login modal open
- TODO: update angular-ui href links with ui-router sref's?
- TODO: updated modal-header background color (use bg-primary and figure out something for rounded corners)
- TODO: fix footer ... SMH
- TODO: fix ui-bootstrap alerts in login/signup modals alert-error should be alert-danger, patched for now
- TODO: updated AuthenticationService to persist until logout

## References
Routing
- [Diving Deep into the Angular Router](http://www.ng-newsletter.com/posts/angular-ui-router.html)

Authentication
- [Auth with AngularJS](https://medium.com/@mattlanham/authentication-with-angularjs-4e927af3a15f)
- [Cookies vs Tokens](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
- [Techniques for Auth in AngularJS](https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec)
- [10 Things you should know about tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/)
- [Angular Auth](http://www.sitepoint.com/implementing-authentication-angular-applications/)
- [Github Issue on using $httpProvider interceptor](https://github.com/angular-ui/ui-router/issues/1041) to redirect API 401 responses to a login page 
- [Simple Auth for Angular.js App](http://beletsky.net/2013/11/simple-authentication-in-angular-dot-js-app.html) - Looks like there's some really good ideas here for later.
