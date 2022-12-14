const socket = io("http://localhost:3000");
let roomId = ''

function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get("name");
    const avatar = urlParams.get("avatar");
    const email = urlParams.get("email");

    document.querySelector(".user_logged").innerHTML += `
        <img
            class="avatar_user_logged"
            src="${avatar}"
            />
        <strong id="user_logged">${name}</strong>
    `;

    socket.emit("start", { name, avatar, email });

    socket.on("new_users", (user) => {
        const userAlreadyExistsInDiv = document.getElementById(
            `user_${user._id}`
        );

        if (!userAlreadyExistsInDiv) {
            addUser(user);
        }
    });

    socket.emit("get_users", (users) => {
        for (const user of users) {
            if (user.email !== email) {
                addUser(user);
            }
        }
    });
}

function addUser(user) {
    const usersList = document.getElementById("users_list");
    usersList.innerHTML += `
        <li
            class="user_name_list"
            id="user_${user._id}"
            idUser="${user._id}"
        >
            <img
                class="nav_avatar"
                src="${user.avatar}"
            />
            ${user.name}
        </li>
    `;
}

document.getElementById('users_list').addEventListener('click', (e) => {
    if (e.target && e.target.matches('li.user_name_list')) {
        const idUser = e.target.getAttribute('idUser')

        socket.emit("start_chat", { idUser }, (data) => {
            roomId = data.idChatRoom;
        });
    }
})

onLoad();
