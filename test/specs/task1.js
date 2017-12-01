var chai = require('chai');
var assert = require('assert');

describe('form authentication page', function() {
  console.log("|==========[TASK_1: FORM AUTHENTICATION]==========|");
  it('should be able to open web page', function () {
    console.log("==========[__1__TEST 1]==========");
    browser.url('http://the-internet.herokuapp.com/login');
    var url = browser.getUrl();
    assert.equal(url, 'http://the-internet.herokuapp.com/login',  'Not on correct url');
    console.log("[1] Opened correct web page");
  });
  it('should submit login form', function () {
    console.log("==========[__1__TEST 2]==========");
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
    console.log("==========[__1__TEST 3]==========");
    var loginButton = $('.radius');
    loginButton.click();
    var logoutButton = $('.button')
    logoutButton.waitForExist(5000);
    var url = browser.getUrl();
    assert.equal(url, 'http://the-internet.herokuapp.com/secure',  'Login Page URL was not correct');
    console.log("[3] Successfully Logged In");
  });
  it('should click logout', function() {
    console.log("==========[__1__TEST 4]==========");
    var logoutButton = $('.button')
    var response = logoutButton.click();
    assert.equal(response.state, 'success', 'Logout Button Was Not Successfully Clicked');
    console.log("[4] Clicked Logout");
  });
  it('should successfully logout', function(){
    console.log("==========[__1__TEST 5]==========");
    var username = $('#username');
    username.waitForExist(5000);
    var url = browser.getUrl();
    console.log(url);
    assert.equal(url, 'http://the-internet.herokuapp.com/login', 'Logout Page URL was not correct');
    console.log("[5] Successfully Logged Out");
  });
});
