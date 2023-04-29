const username = getCookie('username'); 
if(username){
  $('.logo').text(username);
}
$(".wrapper").hide();
let flag = false;
function show_page_form(){
  if(flag){
    $(".wrapper").hide(1000);
  }else
  {
    $(".wrapper").show(1000);
  }
  flag = !flag;
}
$("#knopocka_login").click(function () {
    let login = $("#login_l").val();
    let password = $("#pasword_p").val();
    $("#login_l").val("");
    $("#pasword_p").val("");
    $(".wrapper").hide();
    $.ajax({
      url: "http://localhost:3000/login",
      method: "POST",
      data: { login: login, password: password },
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  });
  $("#knopochka_register").click(function () {
    let login = $("#login_reg").val();
    let password = $("#password_reg").val();
    $("#login_reg").val("");
    $("#password_reg").val("");
    $(".wrapper").hide(1000);
    $.ajax({
      url: "http://localhost:3000/register",
      method: "POST",
      data: { login: login, password: password },
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  });

  const socket = io();
  socket.on("authorization", (data) => {
    if(data == true){
    alert('Успешно!');
    const username = getCookie('username'); 
    if(username){
        $('.logo').text(username);
    }
    }else{
        alert(data);
    }
  });
  function getCookie(name) {
const cookies = document.cookie.split(';');
for (let i = 0; i < cookies.length; i++) {
const cookie = cookies[i].trim();
if (cookie.startsWith(`${name}=`)) {
  return cookie.substring(name.length + 1);
}
}
return null;
}