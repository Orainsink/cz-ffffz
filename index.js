var inquirer = require("inquirer");

module.exports = {
  prompter: prompter,
  formatCommit: formatCommit,
};

function prompter(cz, commit) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "issues",
        message: "git issue ID(s) (required):\n",
        validate: function (input) {
          if (!input) {
            return "Must specify issue IDs, otherwise, just use a normal commit message";
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "message",
        message: "GitHub commit message (required):\n",
        validate: function (input) {
          if (!input) {
            return "empty commit message";
          } else {
            return true;
          }
        },
      },
    ])
    .then((answers) => {
      formatCommit(commit, answers);
    });
}

function formatCommit(commit, answers) {
  commit(`RCA-${answers.issues}: ${answers.message}`);
}
