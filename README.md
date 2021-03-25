# Meraki Web App Automation
A simple Cypress test automation framework for a Meraki webapp.

Install:
```
npm install
```

To run the tests:
```node
npm run cypress:run
```
To open the interactive Cypress module:
```node
npm run cypress:open
```

## Goal
Create a series of black box tests for the webapp located at:

https://meraki-web-test-v2.herokuapp.com/

## Test Strategy

### Scope

The components that will be tested are with respect to User Interface & User Interaction. The tests will ensure that the frontend is functional. No backend tests will be written. Database and hardware testing are also out of scope.

### Type

Frontend integration + black-box testing.

### Framework

I will be using the [Cypress.io](cypress.io) framework to conduct the tests. Cypress has a lot of built in [functionality](https://docs.cypress.io/api/table-of-contents) to get to writing test cases quickly, consistently, and effectively.

### App Capabilities

It shows a credentials page with an API key input field for access. When the key is invalid, you cannot login.

There is a home page that displays a list of Meraki Wireless Lan devices with the following information:

- Image of Wireless Lan
- Name
- IP Address

Upon selecting a device, there is a device details page, including:
- All of the above information
- Serial Number
- Clients (Live Update)
- Usage (Live Update)

The tests that will be written will cover these functionalities and verify that the app is working as expected.

## Configuration

`cypress.json`
```json
{
  "baseUrl": "https://meraki-web-test-v2.herokuapp.com/",
  "browser": "chrome",
  "env": {
    "API_KEY": "5da1735a6a6b1360986bb2c8c10ae2817e476244",
    "VIEWPORT": "macbook-15"
  },
  "defaultCommandTimeout": 10000,
  "retries": 1
}

```

After a cypress run, videos are found in folder `cypress/videos`.

We can easily change the VIEWPORT to simulate tests on a mobile device or tablet. For a full list of available viewports, see the [Cypress docs](https://docs.cypress.io/api/commands/viewport#Arguments)

## Considerations

If this app was serving 100s of thousands of customers, I would be sure to test performance under stress conditions. Testing of the backend was not in the scope of this testing scenario, but it would be necessary to test API response time when there are several connections at once. On the frontend UI side, it would be important to test and verify reasonable loading times of UI components when the UI server is making and sending thousands of requests at a time. 

## Documents

Meraki Wireless Lan - https://documentation.meraki.com/
