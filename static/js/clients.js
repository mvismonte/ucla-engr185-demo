// Copyright 2013 UClA Engr 185
// Author: Mark Vismonte
// Date: 3/10/2013

function Client(data) {
  var self = this;
  self.name = data.name;
  self.personal_info = data.personal_info;
  self.prescriptions = data.prescriptions;
  self.medication_log = data.medication_log;
}

function ClientsViewModel(data) {
  var self = this;
  self.clients = $.map(data, function(c) {
    return new Client(c);
  });
  console.log(self.clients);
  self.currentClient = ko.observable(self.clients[0]);
  console.log(self.currentClient())

  self.newClient = function(client) {
    self.currentClient(client);
  }
}

ko.applyBindings(new ClientsViewModel(data), $('#client-page')[0]);