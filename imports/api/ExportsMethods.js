import { ExportsCollection } from "../db/ExportsCollection";
import { check } from "meteor/check";
import _ from "lodash";

const urls = [
  "https://www.lempire.com/",
  "https://www.lemlist.com/",
  "https://www.lemverse.com/",
  "https://www.lemstash.com/",
];

Meteor.methods({
  "export.insert"() {
    const inserted = ExportsCollection.insert({
      progress: 0,
    });

    const runExport = () => {
      if (ExportsCollection.findOne({ _id: inserted }).progress !== 100) {
        setTimeout(async () => {
          ExportsCollection.update(inserted, { $inc: { progress: 5 } });
          runExport();
        }, 1000);
      } else {
        ExportsCollection.update(inserted, { $set: { url: _.sample(urls) } });
      }
    };
    runExport();
  },

  "export.remove"(exportId) {
    check(exportId, String);

    ExportsCollection.remove(exportId);
  },
});
