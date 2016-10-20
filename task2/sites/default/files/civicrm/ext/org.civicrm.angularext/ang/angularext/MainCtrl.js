(function(angular, $, _) {

  angular.module('angularext', ['datatables', 'ngResource', 'datatables.columnfilter']).config(function($routeProvider) {
      $routeProvider.when('/main', {
        controller: 'AngularextMainCtrl',
        templateUrl: '~/angularext/MainCtrl.html',
        resolve: {
          getMemberships: function(crmApi) {
            return crmApi('Membership', 'get', {
              "sequential": 1,
              "api.Contact.getsingle": {id : "$value.contact_id"},
              "api.MembershipStatus.getsingle": {"id":"$value.status_id"},
              "api.MembershipType.getsingle": {"id":"$value.membership_type_id"}
            });
          }
        }
      });
    }
  );

  angular.module('angularext').controller('AngularextMainCtrl', function ($resource, $scope, $log, crmApi, crmStatus, crmUiHelp, DTOptionsBuilder, DTColumnDefBuilder, getMemberships) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('angularext');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/angularext/MainCtrl'}); // See: templates/CRM/angularext/MainCtrl.hlp

    var json = getMemberships.values;
    json = JSON.parse(JSON.stringify(json).split('"api.Contact.getsingle":').join('"contact":'));
    json = JSON.parse(JSON.stringify(json).split('"api.MembershipStatus.getsingle":').join('"status":'));
    json = JSON.parse(JSON.stringify(json).split('"api.MembershipType.getsingle":').join('"type":'));
    $scope.Memberships = json;
    $scope.dtOptions = DTOptionsBuilder
    .newOptions()
    .withPaginationType('full_numbers')
    .withColumnFilter({
        aoColumns: [
        {
            type: 'text'
        }, {
            type: 'text'
        }, {
            type: 'text'
        }, {
            type: 'text'
        }, {
            type: 'text'
        }, {
            type: 'text'
        }, {
            type: 'text'
        }
      ]
    });
    $scope.dtColumnDefs = [];


  });

})(angular, CRM.$, CRM._);
