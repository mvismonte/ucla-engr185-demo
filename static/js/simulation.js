// Copyright 2013 UClA Engr 185
// Author: Mark Vismonte
// Date: 3/10/2013

// This code is shameful.
function SimulationViewModel(data) {
  var self = this;
  self.refresh_bar_width = ko.observable('100%');
  self.refresh_bar_val = 100;
  self.query_bar_position = 0;
  self.query_bar_going_right = true;
  self.query_bar_left = ko.observable('0%');
  self.query_bar_right = ko.observable('95%');
  self.prescriptions = ko.observableArray(data.prescriptions);
  self.client_prescriptions = ko.observableArray([]);
  self.sending_http = false;
  self.counting_down = true;
  self.started_simulation = ko.observable(false);
  var wait_time = 0;

  self.start_simulation = function() {
    if (self.started_simulation()) {
      return;
    }
    self.started_simulation(true);

    setInterval(function() {
      if (!self.counting_down) {
        return;
      }

      self.refresh_bar_val = ((self.refresh_bar_val + 100) - 5) % 100;

      if (self.refresh_bar_val <= 0) {
        console.log('hi');
        self.refresh_bar_val = 100;
        self.counting_down = false;
        self.sending_http = true;
      }

      self.refresh_bar_width(self.refresh_bar_val + '%');
    }, 300);

    setInterval(function() {
      if (wait_time > 0) {
        wait_time -= 1;
        console.log(wait_time);
        return;
      }

      if (self.sending_http && self.query_bar_position == 0 && self.query_bar_going_right == false) {
        self.counting_down = true;
        self.sending_http = false;
        self.client_prescriptions(self.prescriptions());
        self.query_bar_going_right = true;
        return;
      }

      if (!self.sending_http) {
        return;
      }

      if (self.query_bar_going_right) {
        self.query_bar_position += 5;
        if (self.query_bar_position >= 95) {
          self.query_bar_going_right = false;
          wait_time = 5;
        }
      } else {
        self.query_bar_position -= 5;
        if (self.query_bar_position <= 0) {
          self.query_bar_position = 0;
          wait_time = 5;
        }
      }
      // console.log(self.query_bar_position);
      self.query_bar_left(self.query_bar_position + '%');
      self.query_bar_right((95 - self.query_bar_position) + '%');
    }, 150);
  }
}

ko.applyBindings(new SimulationViewModel(data[0]));