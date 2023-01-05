import { Template } from "meteor/templating";
import { ExportsCollection } from "/imports/db/ExportsCollection";
import "./Exports.html";
import "./Export.js";

Template.exports.onCreated(function exportsOnCreated() {
  Meteor.subscribe("exports");
});

Template.exports.helpers({
  getExports() {
    return ExportsCollection.find({}).fetch();
  },
});

Template.exports.events({
  "click #exportBtn"() {
    Meteor.call("export.insert");
  },
});
