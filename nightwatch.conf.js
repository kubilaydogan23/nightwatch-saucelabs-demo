module.exports = {
  src_folders: ["test"],
  page_objects_path: "page-objects",
  custom_commands_path: [
    "./node_modules/nightwatch-saucelabs-endsauce/commands"
  ],

  test_workers: {
    "enabled": true,
    "workers": "auto"
  },

  test_settings: {
    "default": {
      "launch_url": "https://www.davidmello.com",
      "skip_testcases_on_fail": false,
      "use_ssl": true,
      "silent": true,
      "username": "${SAUCE_USERNAME}",
      "access_key": "${SAUCE_ACCESS_KEY}",
      "sauce_region": "us-west-1",
      "selenium": {
        "port": 443,
        "host": "ondemand.saucelabs.com",
        "start_process": false
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "screenResolution": "1280x1024",
        "browserVersion": "latest",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "timeZone": "New York"
      }
    }
  }
};