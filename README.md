# Running Nightwatch.js tests against SauceLabs

- Article - [How to use SauceLabs with Nightwatch](https://www.davidmello.com/how-to-use-nightwatch-with-saucelabs/)

## Steps

1) **Install dependencies**

    > npm install saucelabs 

    > npm install nightwatch-saucelabs-endsauce

2) **Add or append this entries in nightwatch.conf.js file**

    > "custom_commands_path": ["./node_modules/nightwatch-saucelabs-endsauce/commands"]

    and
    ```json
    test_settings: {
      default: {
        launch_url: "https://www.davidmello.com",
        skip_testcases_on_fail: false,
        use_ssl: true,
        silent: true,
        username: "${SAUCE_USERNAME}",
        access_key: "${SAUCE_ACCESS_KEY}",
        sauce_region: "us-west-1",
        selenium: {
          port: 443,
          host: "ondemand.saucelabs.com",
          start_process: false
        },
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
    ```

    To enable parallel test execution in Nightwatch set the enabled flag equal to true under test_workers and configure the workers to auto or a set number of your choosing

    ```json
    test_workers: {
      enabled: true,
      workers: "auto"
    },
    ```

3. **Sending Nightwatch test result to SauceLabs**

    ```js
    module.exports = {
        ...
        afterEach: function (browser, done) {
            browser.end();
            browser.endSauce(done);
        }
        ...
    }
    ```

4. **Envirnment Variables**

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