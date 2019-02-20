var input1 = document.getElementById('input1');
var container = document.getElementById('container');

function removeElementsByClassName(className) {
  var msgs = document.getElementsByClassName(className);
  while(msgs.length > 0){
        msgs[0].parentNode.removeChild(msgs[0]);
    }
}

function submit() {  
  //Removing previous messages
  removeElementsByClassName("message");
  
  //Requesting data from wikipedia
  fetch( 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=' + input1.value).then( function ( response ) {
    if ( response.ok ) {
        return response.json();
    }
    throw new Error( 'Network response was not ok: ' + response.statusText );
} ).then( function ( data ) {
    for (var i = 0; i < data.query.search.length; i++) {
        var a = document.createElement('a');
        var title = data.query.search[i].title.split(' '); 
        //div.className = "";
        a.className = "message";
        a.href = "https://en.wikipedia.org/wiki/" + title.join("_");
        a.target = "_blank";
        a.style.color = "black";
        a.style.display = "block";
        a.innerHTML = "<strong><font size='5'>" + data.query.search[i].title + "</font></strong><br/><br/>" + data.query.search[i].snippet + "...";
        container.appendChild(a);
    }
});
    input1.value = ""; 
}