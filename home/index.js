const storeUser = JSON.parse(localStorage.getItem('todos'));
// console.log(storeUser);
var current_page = 1;
var per_page = 5;
var total_page = 0;
var per_user = [];
getUSer();
function getUSer() {

    per_user = storeUser.slice(
        (current_page - 1) * per_page,
        (current_page - 1) * per_page + per_page
    )
    renderPageNumber();
    renderUser(per_user);
}
function handleClick(num){
    current_page = num;
    per_user = storeUser.slice(
        (current_page - 1) * per_page,
        (current_page - 1) * per_page + per_page
    )
    renderUser(per_user);
}
function renderPageNumber() {
    total_page = Math.ceil(storeUser.length / per_page);
    // console.log(total_page);
    for (var i = 1; i <= total_page; i++) {
        document.getElementById("pagination").innerHTML += `<li onclick="handleClick(${i})">${i}</li>`
    }
}

//render data
function renderUser(listItem) {

    var element = `<tr>
    <th>ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Username</th>
    </tr>`
    listItem.map((value, index) => {
        index = (current_page - 1) * total_page + index + 1;
        element += `<tr>
        <td>${index}</td>
        <td>${value.firstname}</td>
        <td>${value.lastname}</td>
        <td>${value.username}</td>
        <td><input type="button" data-confirm="Are you sure to delete this item?" class="delete" value="Delete" onclick="deleteRow(this)"><input data-toggle="modal" data-target="#myModal" type="button" value="Detail" onclick="viewDetails()" ></td>
        </tr>`
    });
    document.getElementById("request-table").innerHTML = element;
}

// renderPageNumber();

// renderPageNumber();
// search_input
const searchBar = document.getElementById("search_input_all");
let listSearch = [];
searchBar.addEventListener('keyup', (e)=>{
    const searchString  = e.target.value;
    const filterSearch =  storeUser.filter((userItem) => {
       return userItem.username.includes(searchString);
    });
    // console.log(filterSearch);
    
    renderUser(filterSearch);
});

var rIndex, table = document.getElementById("request-table");
function deleteRow() {
    // console.log(e.target.value);
    // var i = r.parentNode.parentNode.rowIndex;
    // if (confirm("are you delete")) {
        var index;
        const userLogin = JSON.parse(localStorage.getItem('userlogin')).map(e => e.username);
        // console.log(index = (current_page - 1) * total_page + index + 1);
        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].onclick = function () {
                rIndex = this.rowIndex;
                // console.log(rIndex);
                checkUser = document.getElementById('username').value = this.cells[3].innerHTML;
                checkNumber = document.getElementsByClassName('delete').value = this.cells[0].innerHTML;
                console.log(userLogin[0],checkUser);
                if (userLogin[0] != checkUser) {
                    table.deleteRow(rIndex);
                    console.log(checkUser);
                    storeUser.splice(checkNumber, 1);
                    localStorage.setItem("todos", JSON.stringify(storeUser) || []);
                    // renderUser(per_user);
           
                } else {
                    console.log("khong xoa duoc");
                }
            }
        }
    // }
    
}
// }
function viewDetails() {
    // var i = r.parentNode.parentNode.rowIndex;s
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            console.log(this.rowIndex);
            document.getElementById('firstname').value = this.cells[1].innerHTML;
            document.getElementById('lastname').value = this.cells[2].innerHTML;
            document.getElementById('username').value = this.cells[3].innerHTML;
            // document.getElementById('password').value = this.cells[3].innerHTML;

        }
    }
}
function update() {

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    table.rows[rIndex].cells[1].innerHTML = firstname;
    table.rows[rIndex].cells[2].innerHTML = lastname;
    table.rows[rIndex].cells[3].innerHTML = username;
    storeUser[rIndex - 1].username = username;
    storeUser[rIndex - 1].firstname = firstname;
    storeUser[rIndex - 1].lastname = lastname;
    localStorage.setItem('userUpdate', JSON.stringify(storeUser));

}
function logOut() {
    const buttonLog = document.getElementById("logout");
    const userLogin = JSON.parse(localStorage.getItem('userlogin')).map(e => e.username);
    localStorage.removeItem('userlogin');
    buttonLog.classList.add("disablebtn");
    window.location.href = "../login/login.html";
}
function getItem() {
    document.getElementById('request-table').classList.add('enablebtn');
}
function getContent() {
    document.getElementsByClassName('getContent').innerHTML = "Hello";
}