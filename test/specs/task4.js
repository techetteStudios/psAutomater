function toggleCheckboxes() {
  console.log("|==========[TASK_4]==========|");
  browser.url('http://the-internet.herokuapp.com/checkboxes');

  var randNum; var elemString; var elem;
  for (var i = 1; i < 3; i++) {
    if(i==2){
      console.log("==================================");
      i++;
    } //Skip <br> tag

    randNum =  Math.floor(Math.random() * (11 - 1)) + 1;
    console.log("Should Click Checkbox["+i+"] " +randNum+" Times");

    for (var j = 1; j < randNum+1; j++) {
      elemString = "#checkboxes input:nth-child("+i+")";
      elem = browser.element(elemString);
      elem.waitForExist(5000);
      browser.click(elemString);
      console.log("Clicked Checkbox: " + j + " Time(s)");
    }
  }
  console.log('=============COMPLETE=============');
}
