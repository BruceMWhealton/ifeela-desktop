/*global Firebase*/
(function(angular) {
	'use strict';

	angular.module('ifeelaApp').service('MessageService', function(FBURL, $q, $firebase) {
		var messageRef = new Firebase(FBURL).child('messages');
		var fireMessage = $firebase(messageRef);
		return {
			childAdded: function childAdded(limitNumber, cb) {
				messageRef.startAt().limitToLast(limitNumber).on('child_added', function(snapshot) {
					var val = snapshot.val();
					cb.call(this, {
						user: val.user,
						text: val.text,
						name: snapshot.key()
					});
				});
			},
			add: function addMessage(message) {
				return fireMessage.$push(message);
			},
			off: function turnMessagesOff() {
				messageRef.off();
			},
			pageNext: function pageNext(name, numberOfItems) {
				var deferred = $q.defer(); 
				var messages = [];
				messageRef.startAt(null, name).limitToLast(numberOfItems).once('value', function(snapshot) {
					snapshot.forEach(function(snapItem) {
						var itemVal = snapItem.val();
						itemVal.name = snapItem.key();
						messages.push(itemVal);
					});
					deferred.resolve(messages);
				});
				return deferred.promise;
			},
			pageBack: function pageBack(name, numberOfItems) {
				var deferred = $q.defer(); 
				var messages = [];
				messageRef.endAt(null, name).limitToLast(numberOfItems).once('value', function(snapshot) {
					snapshot.forEach(function(snapItem) {
						var itemVal = snapItem.val();
						itemVal.name = snapItem.key();
						messages.push(itemVal);
					});
					deferred.resolve(messages);
				});
				return deferred.promise;
			}
		};
	});

}(window.angular));