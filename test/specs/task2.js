var chai = require('chai');
var assert = require('assert');

describe('sortable tables', function() {
  console.log("|==========[TASK_2: SORTABLE TABLES]==========|");
  var tableStringArr = []; var row = []; var emailDomainArr = []; var editArr = []; var deleteArr = [];
  var validDomainArr = ['com', 'net', 'org', 'edu', 'gov'];
  var str; var boolToCheck;
  var editURL = "http://the-internet.herokuapp.com/tables#edit";
  var deleteURL = "http://the-internet.herokuapp.com/tables#delete";
  var numOfRows = 5; var numOfCols = 6; var numOfActions = 2;
  it('should open url and set up dictionaries for further tests', function () {
    console.log("==========[__2__TEST 1]==========");
    browser.url('http://the-internet.herokuapp.com/tables');
    var url = browser.getUrl();
    //Loop through table to populate string array for futher tests
    for(var i=0; i<numOfRows; i++){
      tableStringArr[i] = [];
      row = tableStringArr[i];
      for(var j=1; j<numOfCols+1; j++){
        //Header row
        if(i==0){
            str = '#table1 thead tr .header:nth-child('+j+')';
            row.push(str);
            //console.log(browser.getText(row[j-1]));
        }
        //Body rows
        else{
          //First 5 values [LastName, FirstName, Email, Due, Website]
          if(j<numOfCols){
            str = '#table1 tbody tr:nth-child('+i+') td:nth-child('+j+')';
            row.push(str);
            //console.log(browser.getText(row[j-1]));
          }
          //Actions [edit/delete]
          else{
            row[numOfCols-1] = [];
            var lastEntry =  row[numOfCols-1];
            str = '#table1 tbody tr:nth-child('+i+') td:nth-child('+j+') a:nth-child(1)';
            lastEntry.push(str);
            //console.log(browser.getText(row[numOfCols][0]));
            str = '#table1 tbody tr:nth-child('+i+') td:nth-child('+j+') a:nth-child(2)';
            lastEntry.push(str);
            //console.log(browser.getText(row[numOfCols][1]));
          }
        }
      }
    }
    //console.log(tableStringArr);
    assert.equal(url, 'http://the-internet.herokuapp.com/tables',  'Not on correct url');
    console.log("[1] Opened URL and added table data to dict");
  });
  it('should have <td> elements with entries that are more than 0 chars', function(){
    console.log("==========[__2__TEST 2]==========");
    boolToCheck=true;
    for(var i=0; i<numOfRows; i++){
      row = tableStringArr[i];
      for(var j=0; j<numOfCols; j++){
        if(i==0 || (i>0 && j<numOfCols-1)){
          str = browser.getText(row[j]);
          //console.log(i, j, str, str.length);
          //Char length == 0, error found
          if(str.length==0){
            boolToCheck = false;
            console.log(row[j]+" has str.length==0. NOT VALID");
          }
        }
        //Account for edit and delete actions
        else if(i>0 && j==numOfCols-1){
          for(var k=0; k<numOfActions; k++){
            str = browser.getText(row[j][k]);
            //console.log(i, j, k, str, str.length);
            //Char length == 0, error found
            if(str.length==0){
              gtZeroChar = false;
              console.log(row[j][k]+" has str.length==0. NOT VALID");
            }
          }
        }
      }
    }
    chai.assert.isTrue(boolToCheck, 'All entries should have str.length>0');
    console.log("[2] Verified all table data has str.length>0");
  });
  it('should have 6 <td> elements in each <tr> elements', function(){
    console.log("==========[__2__TEST 3]==========");
    boolToCheck = true;
    //Verify each row.length==6
    for(var i=0; i<numOfRows; i++){
      row = tableStringArr[i];
      //console.log(row.length);
      if(row.length != 6){
        boolToCheck = false;
        console.log("Row "+(i+1)+" does not contain 6 elements. It contains "+row.length);
      }
    }
    chai.assert.isTrue(boolToCheck, 'All <tr> need 6 <td>');
    console.log("[3] Verified all <tr> have 6 <td>");
  });
  it('should have 6 <th> elements in the <thead> row', function(){
    console.log("==========[__2__TEST 4]==========");
    boolToCheck = true;
    row = tableStringArr[0];
    //Go through all elements in <thead> and verify they are <th> tagName
    for(var i=0; i<numOfCols; i++){
      var tagName = browser.element(row[i]).getTagName();
      if(tagName != "th"){
        boolToCheck = false;
        console.log("Expected <th> but element"+(i+1)+" is "+tagName);
      }
    }
    chai.assert.isTrue(boolToCheck, 'All elements in <thead> need to be <th>');
    console.log("[4] Verified <thead> row has 6 <th>");
  });
  it('should have 3rd column <td> elements(Email) that follow format [string @ string . string]', function(){
    console.log("==========[__2__TEST 5]==========");
    boolToCheck = true;
    //Skip header row, check all emails in body
    for(var i=1; i<numOfRows; i++){
      str = browser.getText(tableStringArr[i][2]);
      //console.log(i, emailElement);
      //Does it contain (@) ? If so, the array will have 2 elements
      var splitAtAmpersand = str.split("@");
      if(splitAtAmpersand.length<2){
        boolToCheck = false;
        console.log("Missing @ for "+tableStringArr[i][2]);
      }
      //Does it contain (.) ? If so, the array will have 2 elements
      var splitAtPeriod = splitAtAmpersand[1].split(".");
      if(splitAtPeriod.length<2){
        boolToCheck = false;
        console.log("Missing . for "+tableStringArr[i][2]);
      }
      emailDomainArr.push(splitAtPeriod[1]); //Save for future test
    }
    //console.log(emailDomain);
    chai.assert.isTrue(boolToCheck, 'All emails need to follow [string @ string . string] format');
    console.log("[5] Verified email entries follow [string @ string . string] format");
  });
  it('should have 3rd column <td> elements(Email) should contain valid domain', function(){
    console.log("==========[__2__TEST 6]==========");
    boolToCheck = true;
    //Retrieve emailDomainArray from previous test
    for(var i=0; i<emailDomainArr.length; i++){
      //Make sure at least 3 char exist
      if(emailDomainArr[i].length != 3){
        boolToCheck = false;
        console.log("Web domain in "+tableStringArr[i+1][2]+" does not contain 3 chars");
      }
      //Make sure entry is included in dictionary of validDomainArr
      if(!validDomainArr.includes(emailDomainArr[i])){
        boolToCheck = false;
        console.log("Web domain in "+tableStringArr[i+1][2]+" is not valid");
      }
    }
    //console.log(emailDomain);
    chai.assert.isTrue(boolToCheck, 'All emails need to have valid domains');
    console.log("[6] Verified email domains are valid");
  });
  it('should have $ as 1st char for 4th column <td> element(Due)', function(){
    console.log("==========[__2__TEST 7]==========");
    boolToCheck = true;
    for(var i=1; i<numOfRows; i++){
      str = browser.getText(tableStringArr[i][3]);
      if(str[0] != '$'){
        boolToCheck = false;
        console.log("Due amount in "+tableStringArr[i][3]+" does not start with $");
      }
      //console.log(str);
    }
    chai.assert.isTrue(boolToCheck, 'All due amounts need to start with $');
    console.log("[7] Due Amount has $ as first char");
  });
  it('should have 4th <td> element(Due) as a float rounded to 2nd decimal point', function(){
    console.log("==========[__2__TEST 8]==========");
    boolToCheck = true;
    for(var i=1; i<numOfRows; i++){
      str = browser.getText(tableStringArr[i][3]);
      //Check if value can be parsed
      if(Number.isNaN(parseFloat(str.replace('$', '')))){
        boolToCheck = false;
        console.log("Due amount in "+tableStringArr[i][3]+" does not contain a valid float");
      }
      var splitAtPeriod = str.split(".");
      if(splitAtPeriod[1].length != 2)
      {
        boolToCheck = false;
        console.log("Due amount in "+tableStringArr[i][3]+" is not rounded to a 2nd decimal point");
      }
      //console.log(splitAtPeriod);
    }
    chai.assert.isTrue(boolToCheck, 'All due amounts need to be a float rounded to 2 decimal points');
    console.log("[8] Due Amount is valid float rounded to 2 decimal points");
  });
  it('should have 5th <td> element(WebSite) that follow format [http:// www. string .com]', function(){
    //Environment issues began at this point
    console.log("==========[__2__TEST 9]==========");
    var webSite = "http://www.";
    boolToCheck = true;
    for(var i=1; i<numOfRows; i++){
      str = browser.getText(tableStringArr[i][4]);
      //Check website has enough characters to contain http://www. and .com
      if(str.length <= 15){
        boolToCheck = false;
        console.log("Website entry in "+tableStringArr[i][4]+" does not contain enough chars for valid email");
      }
      var splitAtPeriod = str.split(".");
      //Check website contains 2 (.)
      if(splitAtPeriod.length != 3){
        boolToCheck = false;
        console.log("Website entry in "+tableStringArr[i][4]+" does not contain correct number of .");
      }
      //Check website preceeded by http://www
      if(splitAtPeriod[0] != "http://www"){
        boolToCheck = false;
        console.log("Website entry in "+tableStringArr[i][4]+" does not preceed http://www");
      }
      //Check website ended by valid domain
      if(!validDomainArr.includes(splitAtPeriod[2])){
        boolToCheck = false;
        console.log("Website entry in "+tableStringArr[i][4]+" does not contain valid domain");
      }
    }
    chai.assert.isTrue(boolToCheck, 'All websites need to be valid format');
    console.log("[9] Website is valid format");
  });
  it('should have 2 <a> elements in 6th column <td> element(Action)', function(){
    console.log("==========[__2__TEST 10]==========");
    boolToCheck = true;
    var actionArray;
    for(var i=1; i<numOfRows; i++){
      actionArray = tableStringArr[i][5];
      //Check each Action entry has two elements
      if(actionArray.length != numOfActions){
        boolToCheck = false;
        console.log("Action entry on row "+i+" does not contains 2 elements");
      }
      for(var j=0; j<numOfActions; j++){
        //Check Edit <a>
        if(j==0){
          editArr.push(actionArray[j]); //Push element onto editArr for future test
          //Check text=="edit"
          if(browser.getText(actionArray[j]) != "edit"){
            boolToCheck = false;
            console.log("Expected action text of row"+i+" to be edit");
          }
        }
        //Check Delete <a>
        else{
          deleteArr.push(actionArray[j]); //Push element onto deleteArr for future test
          //Check text=="delete"
          if(browser.getText(actionArray[j]) != "delete"){
            boolToCheck = false;
            console.log("Expected action text of row"+i+" to be delete");
          }
        }
        //Check that both elements are <a>
        var tagName = browser.element(actionArray[j]).getTagName();
        if(tagName != "a"){
          boolToCheck = false;
          console.log("Expected <a> but row"+i+" action"+(j+1)+" is "+tagName);
        }
      }
    }
    chai.assert.isTrue(boolToCheck, 'All actions need to have two elements');
    console.log("[10] All Action entries contain 2 elements");
  });
  it('should have 1st <a> element of the 6th <td> element(Action) that leads to #edit', function(){
    console.log("==========[__2__TEST 11]==========");
    boolToCheck = true;
    for(var i=0; i<editArr.length; i++){
      browser.element(editArr[i]).click();
      if(editURL != browser.getUrl()){
        boolToCheck = false;
        console.log("Edit link in row"+(i+1)+" does not lead to correct url");
      }
    }
    chai.assert.isTrue(boolToCheck, 'All edit links need to lead to #edit url');
    console.log("[11] All edit links lead to correct url");
  });
  it('should have 2nd <a> element of the 6th <td> element(Action) that leads to #delete', function(){
    console.log("==========[__2__TEST 12]==========");
    boolToCheck = true;
    for(var i=0; i<deleteArr.length; i++){
      browser.element(deleteArr[i]).click();
      if(deleteURL != browser.getUrl()){
        boolToCheck = false;
        console.log("Delete link in row"+(i+1)+" does not lead to correct url");
      }
    }
    chai.assert.isTrue(boolToCheck, 'All delete links need to lead to #delete url');
    console.log("[12] All delete links lead to correct url");
  });
  it('should have clickable 6 <th> elements that add headerSortDown/Up classname', function(){
    console.log("==========[__2__TEST 13]==========");
    boolToCheck = true;
    row = tableStringArr[0];
    var arrayOfEntries; var headerElem; var sortedClassName; var headerText; var tableText;
    //Go through all elements in <thead> and click twice. Ensure on both clicks, the array is correctly sorted
    for(var i=0; i<numOfCols-1; i++){
      //console.log("======INDEX: ",i,"======");
      //console.log("[INITIAL]");
      //WITHOUT CLICKING, STORE VALUES AND SORT
      headerElem = browser.element(row[i]);
      arrayOfEntries = [];
      for(var j=1; j<numOfRows; j++){
        tableText = browser.element(tableStringArr[j][i]).getText();
        //Account for sorting due value with $
        item = (i==3)? tableText.replace('$', ''): tableText;
        arrayOfEntries.push(item);
      }
      if(i==3){
        //Account for sorting due value with $
        arrayOfEntries.sort(function(a,b){return a-b});
      }
      else{
        arrayOfEntries.sort();
      }
      //console.log(arrayOfEntries);

      //console.log("[FIRST CLICK]");
      //FIRST CLICK, COMPARE IF EXPECTED IS SAME AS ACTUAL, AKA ARRAY IS SORTED CORRECTLY DESCENDING
      headerElem.click();
      for(var k=1; k<numOfRows; k++){
        tableText = browser.element(tableStringArr[k][i]).getText();
        //Account for sorting due value with $
        item = (i==3)? tableText.replace('$', ''): tableText;

        if(arrayOfEntries[k-1]!==item){
          boolToCheck = false;
          console.log(row[i]+" is not sorted correctly on first click");
        }
        //console.log(arrayOfEntries[k-1], item);
      }
      sortedClassName = $('.headerSortDown span').getText();
      headerText = headerElem.getText();
      if(sortedClassName != headerText){
        boolToCheck = false;
        console.log(row[i]+" is not working as a sortable header on first click");
      }

      //console.log("[SECOND CLICK]");
      //SECOND CLICK, COMPARE IF EXPECTED IS SAME AS ACTUAL, AKA ARRAY IS SORTED CORRECTLY ASCENDING
      headerElem.click();
      arrayOfEntries.reverse();
      for(var l=1; l<numOfRows; l++){
        tableText = browser.element(tableStringArr[l][i]).getText();
        //Account for sorting due value with $
        item = (i==3)? tableText.replace('$', ''): tableText;
        if(arrayOfEntries[l-1]!=item){
          boolToCheck = false;
          console.log(row[i]+" is not sorted correctly on second click");
        }
        //console.log(arrayOfEntries[l-1], item);
      }
      sortedClassName = $('.headerSortUp span').getText();
      headerText = headerElem.getText();
      if(sortedClassName != headerText){
        boolToCheck = false;
        console.log(row[i]+" is not working as a sortable header on second click");
      }
    }
    chai.assert.isTrue(boolToCheck, 'All header elements need to be a headerSort class');
    console.log("[13] Verified <thead> row is of sortable class and is sorting correctly <th>");
  });
});
