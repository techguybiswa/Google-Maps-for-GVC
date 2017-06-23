var flag = 0;
  function showDiv()
  {
    if(flag === 0)
    {
      document.getElementById('settings').style.display= "block";
      flag=1;
    }
    else if(flag === 1)
    {
      document.getElementById('settings').style.display= "none";
      flag =0;
    }
  }
  function start ()
  {
    document.getElementById('settings').style.display= "none";
    flag = 0;
    console.log("port: " + port);
    var server,port,username,password,intopic,outtopic;
    function save()
    {
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
    console.log("username: "+ username);
      var form = document.forms["send"];
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        message = new Paho.MQTT.Message(document.getElementById("message").value);
        message.destinationName = outtopic;
        client.send(message);
      //  client.publish("outTopic",message);

      });

      // called when the client connects
      function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("CONNECTED");
        client.subscribe(intopic);
      }

      // called when the client loses its connection
      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:", responseObject.errorMessage);
          setTimeout(function() { client.connect() }, 5000);
        }
      }

      // called when a message arrives
      function onMessageArrived(message) {
        var tdTopic = document.createElement("td");
        tdTopic.textContent = message.destinationName;
        console.log("message: " + message.payloadString);
        console.log("message dest: " + message.destinationName);

        var node = document.createElement("LI");
        var textnode = document.createTextNode(message.payloadString);
        node.appendChild(textnode);
        document.getElementById("messg").appendChild(node);
        //
        // var tdMsg = document.createElement("td");
        // try {
        //   tdMsg.textContent = message.payloadString;
        // } catch (e) {
        //   //tdMsg.textContent = "*** Binary data ***";
        //   var pre = document.createElement("pre");
        //   var base64 = btoa(String.fromCharCode.apply(null, message.payloadBytes));
        //   pre.textContent = base64.replace(/(.{72})/g, "$1\n");
        //   var note = document.createElement("em");
        //   note.textContent = "Binary data (base64 encoded)"
        //   tdMsg.appendChild(note);
        //   tdMsg.appendChild(pre)
        // }
        //
        // var tr = document.createElement("tr");
        // tr.appendChild(tdTopic);
        // tr.appendChild(tdMsg);
        // console.log("tdMsg: " + tdMsg);
        // console.log("tdTopic: " + tdTopic);
        // console.log("tr: " + tr);
        //
        // document.getElementById("msgs").appendChild(tr);
      }

      function onFailure(invocationContext, errorCode, errorMessage) {
        var errDiv = document.getElementById("error");
        errDiv.textContent = "Could not connect to WebSocket server, most likely you're behind a firewall that doesn't allow outgoing connections to port 30755";
        errDiv.style.display = "block";
      }

      var clientId = "ws" + Math.random();
      // Create a client instance
      console.log("port: " + port);
      var client = new Paho.MQTT.Client("server", port, clientId);

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
      console.log("uesrname: " + username);
  
  }
