const socket = io();
const btn = document.getElementById("send");
const input = document.getElementById("message");
const ul = document.getElementById("list");
const grpBtn = document.getElementById("createGrp");
const joinGrpBtn = document.getElementById("joinGrp");
const stg = document.getElementById("stg");
const leaveBtn = document.getElementById("leave");

btn.addEventListener("click", () => {
  const value = input.value; // hi , hello
  const div = document.createElement("div");
  div.setAttribute("class", "sender");
  const li = document.createElement("li");
  li.innerText = value;
  const para = document.createElement("p");
  para.innerText = "sender";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);

  console.log("sending message", input.value);
  socket.emit("message", input.value);
  input.value = "";
});

socket.on("broadcast", (message) => {
  console.log("broadcast message", message);
  const div = document.createElement("div");
  div.setAttribute("class", "receiver");
  const li = document.createElement("li");
  li.innerText = message;
  const para = document.createElement("p");
  para.innerText = "receiver";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);
});

grpBtn.addEventListener("click", () => {
  console.log("group created req");
  socket.emit(
    "create_grp",
    Math.floor(Math.random(0, 1) * 1000),
    (response) => {
      console.log(response);
    }
  );
});

joinGrpBtn.addEventListener("click", () => {
  console.log("group joined req");
  socket.emit("join_grp");
});

stg.addEventListener("click", () => {
  const value = input.value;
  if (value) {
    socket.emit("grp message", value);
  }
});

leaveBtn.addEventListener("click", () => {
  socket.emit("leave_room");
});

socket.on("server_grp_msg", (data) => {
  console.log("grp message", data);
});

socket.on("message", (message) => {
  console.log("recieving message", message);
});
