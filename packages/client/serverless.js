const { Component } = require('@serverless/core');
require('dotenv').config({ path: `${__dirname}/.env` });

class Deploy extends Component {
  async default(inputs = {}) {
    const { stage } = inputs;

    if (stage === 'staging' || stage === 'production') {
      this.context.log(`Deploying to a ${stage} server. Please wait...`);
      const template = await this.load('@serverless/template', stage);
      const output = await template({ template: 'serverless.yml' });
      return output;
    } else {
      this.context.log(
        'No environment defined... Choices are staging and prod',
      );
    }
  }
}

module.exports = Deploy;
