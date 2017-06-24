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
