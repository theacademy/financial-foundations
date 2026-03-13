const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'n8y1o7',
  e2e: {
    baseUrl: 'http://mthree-peregrine-s3-2.s3-website-us-east-1.amazonaws.com',
    supportFile: false,
  }
})