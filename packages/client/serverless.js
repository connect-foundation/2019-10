const { Component } = require('@serverless/core');

class Deploy extends Component {
  async default(inputs = {}) {
    const { stage } = inputs;
    require('dotenv').config({ path: `${__dirname}/env/${stage}.env` });

    const alias = process.env.ALIAS || stage;

    if (!stage) {
      this.context.log(
        'No environment defined... Choices are staging and prod',
      );
      return;
    }

    this.context.log(`Deploying to ${process.env.BUCKET}. Please wait.`);
    const template = await this.load('@serverless/template', alias);
    const output = await template({ template: 'serverless.yml' });

    return output;
  }
}

module.exports = Deploy;
