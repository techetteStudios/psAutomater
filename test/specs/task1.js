var chai = require('chai');
var assert = require('assert');

describe('form authentication page', function() {
  console.log("|==========[TASK_1]==========|");
  it('should be able to open web page', function () {
    console.log("==========[TEST 1]==========");
    browser.url('http://the-internet.herokuapp.com/login');
    var url = browser.getUrl();
    assert.equal(url, 'http://the-internet.herokuapp.com/login',  'Not on correct url');
    console.log("[1] Opened correct web page");
  });
  it('should submit login form', function () {
    console.log("==========[TEST 2]==========");
    var username = $('#username');
    var password = $('#password');

    browser.setValue('#username', 'tomsmith');
    console.log("[2.A] Entered username "+username.getValue());
    browser.setValue('#password', 'SuperSecretPassword!');
    console.log("[2.B] Entered password "+password.getValue());

    var response = browser.submitForm('#login');
    assert.equal(response.state, 'success',  'Login Button Was Not Successfully Clicked');
    console.log("[2.C] Clicked Login");
  });
  it('should successfully login', function () {
    console.log("==========[TEST 3]==========");
    var loginButton = $('.radius')
    loginButton.click();
    var url = browser.getUrl();
    assert.equal(url, 'http://the-internet.herokuapp.com/secure',  'Login Page URL was not correct');
    console.log("[3] Successfully Logged In");
  });
  it('should click logout', function() {
    console.log("==========[TEST 4]==========");
    var logoutButton = $('.button')
    var response = logoutButton.click();
    assert.equal(response.state, 'success', 'Logout Button Was Not Successfully Clicked');
    console.log("[4] Clicked Logout");
  });
  it('should successfully logout', function(){
    console.log("==========[TEST 5]==========");
    var url = browser.getUrl();
    assert.equal(url, 'http://the-internet.herokuapp.com/login', 'Logout Page URL was not correct');
    console.log("[5] Successfully Logged Out");
  });
});
