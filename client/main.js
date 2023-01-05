import { Template } from "meteor/templating";
import { ExportsCollection } from "/imports/db/ExportsCollection";
import "./main.html";

Template.exports.onCreated(function exportsOnCreated() {
  Meteor.subscribe("exports");
});

Template.exports.helpers({
  getExports() {
    return ExportsCollection.find({}).fetch();
  },
});

Template.export.helpers({
  isCompleted() {
    return this.progress === 100;
  },
});

Template.exports.events({
  "click #exportBtn"() {
    Meteor.call("export.insert");
  },
});

Template.export.events({
  "click .deleteBtn"() {
    Meteor.call("export.remove", this._id);
  },
});
