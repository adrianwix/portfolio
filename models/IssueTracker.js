const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  issues: [
    {
      issue_title: {
        type: String,
        required: true
      },
      issue_text: {
        type: String,
        required: true
      },
      created_by: {
        type: String,
        required: true
      },
      assigned_to: {
        type: String,
        required: false
      },
      status_text: {
        type: String,
        required: false
      },
      open: {
        type: Boolean,
        required: true,
        default: true
      },
      created_on: {
        type: Date,
        default: Date.now
      },
      updated_on: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
