/*global Firebase*/
(function(angular) {
	'use strict';

angular.module('ifeelaApp').service('UserInformationService', function(FBURL,  $firebase) {
		var userRef = new Firebase(FBURL).child('users');
		var fireUser = $firebase(userRef);
		return {
			updateFavoriteFoods: function updateFavoriteFoods(fireUser.foods, cb) {
				    var favoriteFoods = [];
					var val = snapshot.val();
					cb.call(this, {
						//user: val.user,
						//text: val.text,
						name: snapshot.key()
					});
				};
			}
		//	add: function addMessage(message) {
		//		return fireMessage.$push(message);
		//	},

			// pageNext: function pageNext(name, numberOfItems) {
			// 	var deferred = $q.defer(); 
			// 	var messages = [];
			// 	messageRef.startAt(null, name).limitToLast(numberOfItems).once('value', function(snapshot) {
			// 		snapshot.forEach(function(snapItem) {
			// 			var itemVal = snapItem.val();
			// 			itemVal.name = snapItem.key();
			// 			messages.push(itemVal);
			// 		});
			// 		deferred.resolve(messages);
			// 	});
			// 	return deferred.promise;
			// },
		});
	});

}(window.angular));