# Running Nightwatch.js tests against SauceLabs

- Article - [How to use SauceLabs with Nightwatch](https://www.davidmello.com/how-to-use-nightwatch-with-saucelabs/)

## Steps

1) **Install dependencies**

    > npm install saucelabs 

    > npm install nightwatch-saucelabs-endsauce

2) **Add this entry in the nightwatch.conf.js file**

    > "custom_commands_path": ["./node_modules/nightwatch-saucelabs-endsauce/commands"]

3) **Add this basic values under test setting in nightwatch.conf.js file**

    ```js
    test_settings: {
    default: {
      selenium_host: "ondemand.saucelabs.com",
      selenium_port: 443,
      selenium_start_process: false,
      use_ssl: true,
      silent: true,
      username: "${SAUCE_USERNAME}",
      access_key: "${SAUCE_ACCESS_KEY}",
      sauce_region: "us-west-1",      // optional
      desiredCapabilities: {
        browserName: "chrome",
        screenResolution: "1280x1024",
        browserVersion: "latest",
        javascriptEnabled: true,
        acceptSslCerts: true,
        timeZone: "New York"
      }
    }
    ```
    To enable parallel test execution in Nightwatch set the enabled flag equal to true under test_workers and configure the workers to auto or a set number of your choosing

    ```js
    test_workers: {
        enabled: true,
        workers: "auto"
    }
    ```

4. **Sending Nightwatch test result to SauceLabs**

    ```js
    module.exports = {
        ...
        afterEach: function (browser) {
            browser.endSauce();
            browser.end();
        }
        ...
    }
    ```

5. **Envirnment Variables**

* `{SAUCE_USERNAME}` and `{SAUCE_ACCESS_KEY}` can be found in the Account > User Settings section of SauceLabs. 

* Setting environment variables on Mac

  > `sudo nano ~/.bash_profile` <br/>
  Add these lines: <br/>
  `export SAUCE_USERNAME=`your username <br/>
  `export SAUCE_ACCESS_KEY=`your SauceLabs access key <br/>
  Quit and save (Control + x)

*  If you prefer to hardcode them, you can replace the placeholder names (username and access key) in quotes in your nightwatch conf file.

* Also ensure the sauce_region value matches for your account (this example uses us-west-1).
Execute the test by running nightwatch in the root folder.



## Notes

* The custom_commands_path listed above will allow Nightwatch to find the nightwatch-saucelabs-endsauce package that will be called to send the test result information to SauceLabs on test end. This comes in as a dependency in package.json.

* Once the test completes you should be able to see the video of the result when you login to the Automated test results section of the SauceLabs website for your account along with the passing status of the test.