


function save()
{
  var server = document.getElementById('serverName').value;
  var port =  document.getElementById('portName').value;
  var username =  document.getElementById('userName').value;
  var password =  document.getElementById('password').value;
  var intopic =  document.getElementById('intopic').value;
  var outtopic =  document.getElementById('outtopic').value;
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


}
