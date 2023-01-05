import { Template } from "meteor/templating";
import "./Export.html";

Template.export.helpers({
  isCompleted() {
    return this.progress === 100;
  },
});

Template.export.events({
  "click .deleteBtn"() {
    Meteor.call("export.remove", this._id);
  },
});
