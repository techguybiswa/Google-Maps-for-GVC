
var server,port,username,password,intopic,outtopic;
function save()
{
  // saving all input fields in local storage under various variable name
  server = document.getElementById('serverName').value;
  port =  document.getElementById('portName').value;
  username =  document.getElementById('userName').value;
  password =  document.getElementById('password').value;
  intopic =  document.getElementById('intopic').value;
  outtopic =  document.getElementById('outtopic').value;
  localStorage.setItem("server", server);
  localStorage.setItem("port", port);
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  localStorage.setItem("intopic", intopic);
  localStorage.setItem("outtopic", outtopic);
  window.alert("All data saved successfully!");
}
function reload()
{
  // reloading all data to input fields
  window.alert("All data reloaded");
  document.getElementById('serverName').value = localStorage.getItem("server");
  document.getElementById('portName').value = localStorage.getItem("port");
  document.getElementById('userName').value = localStorage.getItem("username");
  document.getElementById('password').value = localStorage.getItem("password");
  document.getElementById('intopic').value = localStorage.getItem("intopic");
  document.getElementById('outtopic').value = localStorage.getItem("outtopic");
  server = document.getElementById('serverName').value;
  port =  document.getElementById('portName').value;
  username =  document.getElementById('userName').value;
  password =  document.getElementById('password').value;
  intopic =  document.getElementById('intopic').value;
  outtopic =  document.getElementById('outtopic').value;


}
function start()
{
  // main function resposnible for implementing the MQTT protocol
  server = document.getElementById('serverName').value;
  port =  document.getElementById('portName').value;
  username =  document.getElementById('userName').value;
  password =  document.getElementById('password').value;
  intopic =  document.getElementById('intopic').value;
  outtopic =  document.getElementById('outtopic').value;
  document.getElementById('send_rcv').style.display = "block";
  document.getElementById('settings').style.display = "none";

  var form = document.forms["send"];
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    message = new Paho.MQTT.Message(document.getElementById("message").value);
    message.destinationName = intopic;
    client.send(message);
    client.publish(outtopic,message);

  });

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    window.alert("CONNECTED");
    client.subscribe(intopic);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      setTimeout(function() { client.connect() }, 5000);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    var tdTopic = document.createElement("td");
    tdTopic.textContent = message.destinationName;
    var node = document.createElement("LI");
    var textnode = document.createTextNode(message.payloadString);
    node.appendChild(textnode);
    document.getElementById("messg").appendChild(node);
    window.alert("One new message");
  }

  function onFailure(invocationContext, errorCode, errorMessage) {
    var errDiv = document.getElementById("error");
    errDiv.textContent = "Could not connect to WebSocket server, most likely you're behind a firewall that doesn't allow outgoing connections to port 30755";
    errDiv.style.display = "block";
  }
  var clientId = "ws" + Math.random();
  // Create a client instance
  port = parseInt(port);
  var client = new Paho.MQTT.Client(server, port , clientId);
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // connect the client
  client.connect({
    useSSL: true,
    userName: username,
    password: password,
    onSuccess: onConnect,
    onFailure: onFailure
  });
}
