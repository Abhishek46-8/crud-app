var url = "https://609df57f33eed80017957647.mockapi.io/users/";

async function getUserData() {
  try {
    let resp = await fetch(url);
    let result = await resp.json();
    processTableData(result);
  } catch (error) {
    console.log(error);
  }
}

getUserData();

async function createUserData() {
  try {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let id = document.getElementById("user-id").value;
    if (id == "") {
      let resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ name, email, address }),
        headers: {
          "Content-type": "application/json",
        },
      });
      alert("User Created");
      document.querySelector("form").reset();
    } else {
      await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify({ name, email, address }),
        headers: {
          "Content-type": "application/json",
        },
      });
      alert("User Updated");
      document.querySelector("form").reset();
      document.getElementById("user-id").setAttribute('value',"")

    }
    document.querySelector("#tbody").innerHTML = "";
    getUserData();
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    await fetch(url + id, {
      method: "DELETE",
    });
    alert("User Deleted");
    document.querySelector("#tbody").innerHTML = "";
    getUserData();
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
  let resp = await fetch(url + id, {
    method: "GET",
  });
  let data = await resp.json();
  document.getElementById("user-id").value = data.id;

  document.getElementById("name").value = data.name;
  document.getElementById("email").value = data.email;
  document.getElementById("address").value = data.address;
}

function processTableData(data) {
  let tBody = document.querySelector("#tbody");

  data.forEach((element) => {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerHTML = element.id;
    let td2 = document.createElement("td");
    td2.innerHTML = element.name;
    let td3 = document.createElement("td");
    td3.innerHTML = element.email;
    let td4 = document.createElement("td");
    td4.innerHTML = element.address;

    let td5 = document.createElement("td");
    td5.innerHTML = `
    <a type="button" class="btn btn-link text-warning" onclick="getUserById(${element.id})">Edit</button>
    <a type="button" class="btn  btn-link text-danger" onclick="deleteUser(${element.id})">Delete</button>
    `;

    tr.append(td1, td2, td3, td4, td5);
    tBody.append(tr);
  });
}