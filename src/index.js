import "./styles.css";

const init = () => {
  document.getElementById("app").innerHTML = `
  <div class = "container-fluid">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Posts</th>
        </tr>
      </thead>
      <tbody id="users">
      </tbody>
    </table>
  <div>`;
  getUsers();
};

const getUsers = () => {
  const table = $("#users");
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      for (let user of data) {
        let id = user.id;
        let name = user.name;
        let username = user.username;
        let email = user.email;
        let entry = $(`
        <tr>
          <td>${id}</td>
          <td>${name}</td>
          <td>${username}</td>
          <td>${email}</td>
          <td><button type="button" class="btn btn-primary btn-sm" userid=${id} username=${username}>View Posts</button></td>
        </tr>`);
        table.append(entry);
      }
      $("button").click((event) => {
        let target = $(event.target);
        let userid = target.attr("userid");
        let username = target.attr("username");
        getPosts(userid, username);
      });
    });
};

const getPosts = (userid, username) => {
  console.log(username);
  document.getElementById("app").innerHTML = `
  <h2>
    ${username}'s Posts
    <button type="button" class="btn btn-success" id="home">Go Back</button>
  </h2>
  <div id="postcontainer" class="container-fluid"></div>
  `;
  $("#home").click(() => {
    init();
  });
  const postcontainer = $("#postcontainer");
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      for (let post of data) {
        if (post.userId === Number(userid)) {
          let title = post.title;
          let content = post.body;
          let entry = $(`
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${content}</p>
            </div>
          </div>
          `);
          postcontainer.append(entry);
        }
      }
    });
};

init();
