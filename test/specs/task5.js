function selectFromDropDown() {
  console.log("|==========[TASK_5]==========|");
  browser.url('http://the-internet.herokuapp.com/dropdown');

  var randNum =  Math.floor(Math.random() * (3 - 1)) + 1;;
  console.log("Randomly chose "+randNum);

  var selectBox = $('#dropdown');
  selectBox.selectByIndex(randNum);
  console.log("Selected Option");
  console.log('=============COMPLETE=============');
}
