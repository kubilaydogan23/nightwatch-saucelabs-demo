const Services = {};
loadServices();

module.exports = {
  src_folders: ["tests"],
  page_objects_path: ["page-objects"],
  custom_commands_path: [
    "./node_modules/nightwatch-saucelabs-endsauce/commands"
  ],

  test_workers: {
    enabled: true,
    workers: "auto"
  },

  test_settings: {
    default: {
      disable_error_log: false,                       // Optional
      launch_url: "https://www.davidmello.com",       // Optional
      screenshots: {                                  // Optional
        enabled: false,
        path: 'screenshots',
        on_failure: true
      },

      selenium_host: "ondemand.saucelabs.com",
      selenium_port: 443,
      selenium_start_process: false,

      use_ssl: true,
      silent: true,

      username: "${SAUCE_USERNAME}",
      access_key: "${SAUCE_ACCESS_KEY}",
      sauce_region: "us-west-1",

      desiredCapabilities: {
        browserName: "chrome",
        screenResolution: "1280x1024",
        browserVersion: "latest",
        javascriptEnabled: true,
        acceptSslCerts: true,
        timeZone: "New York"
      }
    }
  }
}


function loadServices() {
  try {
    Services.seleniumServer = require("selenium-server");
  } catch (err) { }

  try {
    Services.chromedriver = require("chromedriver");
  } catch (err) { }

}
