const storeUser = JSON.parse(localStorage.getItem('todos'));

const data = { "req_per_page": document.getElementById("req_per_page").value, "page_no": 1 };

// At a time maximum allowed pages to be shown in pagination div
const pagination_visible_pages = 3;


// hide pages from pagination from beginning if more than pagination_visible_pages
function hide_from_beginning(element) {
    if (element.style.display === "" || element.style.display === "block") {
        element.style.display = "none";
    } else {
        hide_from_beginning(element.nextSibling);
    }
}

// hide pages from pagination ending if more than pagination_visible_pages
function hide_from_end(element) {
    if (element.style.display === "" || element.style.display === "block") {

        element.style.display = "none";
    } else {
        hide_from_beginning(element.previousSibling);
    }
}

// load data and style for active page
function active_page(element, rows, req_per_page) {
    var current_page = document.getElementsByClassName('active');
    var next_link = document.getElementById('next_link');
    var prev_link = document.getElementById('prev_link');
    var next_tab = current_page[0].nextSibling;
    var prev_tab = current_page[0].previousSibling;
    current_page[0].className = current_page[0].className.replace("active", "");
    if (element === "next") {
        if (parseInt(next_tab.text).toString() === 'NaN') {
            next_tab.previousSibling.className += " active";
            next_tab.setAttribute("onclick", "return false");
        } else {
            next_tab.className += " active"
            render_table_rows(rows, parseInt(req_per_page), parseInt(next_tab.text));
            if (prev_link.getAttribute("onclick") === "return false") {
                prev_link.setAttribute("onclick", `active_page('prev',\"${rows}\",${req_per_page})`);
            }
            if (next_tab.style.display === "none") {
                next_tab.style.display = "block";
                hide_from_beginning(prev_link.nextSibling)
            }
        }
    } else if (element === "prev") {
        if (parseInt(prev_tab.text).toString() === 'NaN') {
            prev_tab.nextSibling.className += " active";
            prev_tab.setAttribute("onclick", "return false");
        } else {
            prev_tab.className += " active";
            render_table_rows(rows, parseInt(req_per_page), parseInt(prev_tab.text));
            if (next_link.getAttribute("onclick") === "return false") {
                next_link.setAttribute("onclick", `active_page('next',\"${rows}\",${req_per_page})`);
            }
            if (prev_tab.style.display === "none") {
                prev_tab.style.display = "block";
                hide_from_end(next_link.previousSibling)
            }
        }
    } else {
        element.className += "active";
        render_table_rows(rows, parseInt(req_per_page), parseInt(element.text));
        if (prev_link.getAttribute("onclick") === "return false") {
            prev_link.setAttribute("onclick", `active_page('prev',\"${rows}\",${req_per_page})`);
        }
        if (next_link.getAttribute("onclick") === "return false") {
            next_link.setAttribute("onclick", `active_page('next',\"${rows}\",${req_per_page})`);
        }
    }
}

// Render the table's row in table request-table
function render_table_rows(rows, req_per_page, page_no) {
    const response = JSON.parse(window.atob(rows));
    const resp = response.slice(req_per_page * (page_no - 1), req_per_page * page_no)
    $('#request-table').empty()
    $('#request-table').append('<tr><th>STT</th><th>First Name</th><th>Last Name</th><th>Username</th></tr>');
    resp.forEach(function (element, index) {
        if (Object.keys(element).length > 0) {
            const { firstname, lastname, username } = element;
            const td = `<tr><td>${++index}</td><td>${firstname}</td><td>${lastname}</td><td>${username}</td><td><input type="button" data-confirm="Are you sure to delete this item?" class="delete" value="Delete" onclick="deleteRow(this)"><input data-toggle="modal" data-target="#myModal" type="button" value="Detail" onclick="viewDetails()" ></td></tr> `;
            $('#request-table').append(td)
        }
    });

}
// Pagination logic implementation
function pagination(data, storeUser) {
    const all_data = window.btoa(JSON.stringify(storeUser));
    // $(".pagination").empty();
    // if (data.req_per_page !== 'ALL') {
    //     let pager = `<a href="#" id="prev_link" onclick=active_page('prev',\"${all_data}\",${data.req_per_page})>&laquo;</a>` +
    //         `<a href="#" class="active" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>1</a>`;
    //     const total_page = Math.ceil(parseInt(storeUser.length) / parseInt(data.req_per_page));

    //     if (total_page < pagination_visible_pages) {
    //         render_table_rows(all_data, data.req_per_page, data.page_no);
    //         for (let num = 2; num <= total_page; num++) {
    //             pager += `<a href="#" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
    //         }
    //     } else {
    //         render_table_rows(all_data, data.req_per_page, data.page_no);
    //         for (let num = 2; num <= pagination_visible_pages; num++) {
    //             pager += `<a href="#" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
    //         }
    //         for (let num = pagination_visible_pages + 1; num <= total_page; num++) {
    //             pager += `<a href="#" style="display:none;" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
    //         }
    //     }
    //     pager += `<a href="#" id="next_link" onclick=active_page('next',\"${all_data}\",${data.req_per_page})>&raquo;</a>`;
    //     $(".pagination").append(pager);
    // } else {
    render_table_rows(all_data, storeUser.length, 1);
    // }
}

//calling pagination function
pagination(data, storeUser);


// trigger when requests per page dropdown changes
function filter_requests() {
    const data = { "req_per_page": document.getElementById("req_per_page").value, "page_no": 1 };
    console.log(data);
    pagination(data, storeUser);
}


// search_input
function searchInput() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search_input_all");
    filter = input.value.toUpperCase();
    table = document.getElementById("request-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}
var rIndex, table = document.getElementById("request-table");
function deleteRow() {
    // var i = r.parentNode.parentNode.rowIndex;
    if(confirm("are you delete")) {
    const userLogin = JSON.parse(localStorage.getItem('userlogin')).map(e => e.username);
        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].onclick = function () {
                rIndex = this.rowIndex;
                checkUser =  document.getElementById('username').value = this.cells[3].innerHTML;
                if(userLogin[0] != checkUser){
                    console.log(checkUser);
                    table.deleteRow(rIndex);
                    storeUser.splice(rIndex - 1, 1);
                    localStorage.setItem("todos", JSON.stringify(storeUser) || []);     
            }else{
                console.log("khong xoa duoc");
            }
        }
    }
    }
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
    const buttonLog =  document.getElementById("logout");
    const userLogin = JSON.parse(localStorage.getItem('userlogin')).map(e => e.username);
    localStorage.removeItem('userlogin');
    buttonLog.classList.add("disablebtn");
    window.location.href = "../login/login.html";
 }
 function getItem(){
    document.getElementById('request-table').classList.add('enablebtn');
 }
 function getContent(){
    document.getElementsByClassName('getContent').innerHTML = "Hello";
 }