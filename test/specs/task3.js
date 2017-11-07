function scrollInfinite(numberOfScrolls) {
  console.log("|==========[TASK_3]==========|");
  browser.url('http://the-internet.herokuapp.com/infinite_scroll');
  var elemString; var elem; var text;
  for(var i=1; i<numberOfScrolls+1; i++){
    console.log("LOOP INDEX:"+i);
    elemString = ".jscroll-inner .jscroll-added:nth-child("+i+")";
    elem = browser.element(elemString);
    elem.waitForExist(10000);
    browser.scroll(elemString);
    console.log(i+' SCROLL COMPLETE');
  }
};
