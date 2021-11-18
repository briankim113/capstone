var extensions = [];

document.addEventListener("DOMContentLoaded", function(e) {
  let ghosteryElem = document.getElementById("ghostery-tracker-tally");
  if (ghosteryElem != null) {
    //document.getElementById("p1").textContent += " detected";

    var ghostery = {eid : "ghostery", properties : {}};
    ghostery.properties = {
      id: ghosteryElem.id,
      clientHeight : ghosteryElem.clientHeight,
      // clientLeft : ghosteryElem.clientLeft, //always 0
      // clientTop : ghosteryElem.clientTop,
      clientWidth : ghosteryElem.clientWidth,

      offsetHeight : ghosteryElem.offsetHeight,
      offsetLeft : ghosteryElem.offsetLeft,
      offsetTop : ghosteryElem.offsetTop,
      offsetWidth : ghosteryElem.offsetWidth,

      scrollHeight : ghosteryElem.scrollHeight,
      // scrollLeft : ghosteryElem.scrollLeft, //always 0
      // scrollLeftMax : ghosteryElem.scrollLeftMax,
      // scrollTop : ghosteryElem.scrollTop,
      // scrollTopMax : ghosteryElem.scrollTopMax,
      scrollWidth : ghosteryElem.scrollWidth
    };

    console.log(ghostery);
    extensions.push(ghostery);
  } else {
    console.log("Ghostery not detected");
  }

  //Dark Reader meta tag
  let darkReaderMeta = document.querySelector('meta[name="darkreader"]')
  if (darkReaderMeta != null) {
    //document.getElementById("p3").textContent += " detected";

    var darkReader = {eid : "darkreader", properties : {}};
    darkReader.properties = {
      name: darkReaderMeta.name,
      content : darkReaderMeta.content
    };

    console.log(darkReader);
    extensions.push(darkReader);
  } else {
    console.log("Dark Reader not detected");
  }

  // let privacyBadgerArray = document.getElementsByClassName("privacyBadgerReplacementButton");
    // if (privacyBadgerArray.length != 0) {
    //   console.log("PrivacyBadger byClassName", privacyBadgerArray);
    //   document.getElementById("p2").textContent += " detected";
    //   for (let elem of privacyBadgerArray) {
    //     console.log(elem);
    //   }
    // } else {
    //   console.log("PrivacyBadger not detected");
    // }

    //Dark Reader className
    // let darkReaderArray = document.getElementsByClassName("darkreader darkreader--fallback");
    // if (darkReaderArray.length != 0) {
    //   console.log("DarkReader byClassName", darkReaderArray);
    //   for (let elem of darkReaderArray) {
    //     console.log(elem);
    //   }
    // } else {
    //   console.log("DarkReader not detected");
    // }

  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/"; //change url based on ip_address
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var data = JSON.stringify(extensions);
  xhr.send(data);
});