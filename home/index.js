const getStoreUser = JSON.parse(localStorage.getItem('todos'));
const tableData = getStoreUser.map(value => {
    return (

        `<tr>
            <td>${value.firstname}</td>
            <td>${value.lastname}</td>
            <td>${value.username}</td>
        </tr>`
    );

}).join('');
const tableBody = document.querySelector("#tableBody");
tableBody.innerHTML = tableData;