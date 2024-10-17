
function openModal() {
    const modal = document.getElementById("userModal");
    modal.style.display = "flex";
}


function closeModal() {
    const modal = document.getElementById("userModal");
    modal.style.display = "none";
}


window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


async function loadUsers() {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    const users = data.users;

    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; 

    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <div><strong>Nome:</strong> ${user.firstName}</div>
            <div><strong>Sobrenome:</strong> ${user.lastName}</div>
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Idade:</strong> ${user.age}</div>
            <div><strong>Foto:</strong> <img src="${user.image}" alt="Foto do usuário" width="100" /></div>
            <button onclick="deleteUser(${user.id}, this)">Deletar</button>
        `;
        userList.appendChild(userItem);
    });
}


async function deleteUser(userId, button) {
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        button.parentElement.remove();
        alert(`Usuário com ID ${userId} deletado com sucesso.`);
    } else {
        alert('Erro ao deletar o usuário.');
    }
}


async function addUser() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value.trim(), 10);
    const photo = document.getElementById('photo').value.trim();

    
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstName || firstName.length < 3 || firstName.length > 50 ||
        !lastName || lastName.length < 3 || lastName.length > 50) {
        alert('Os campos de Nome e Sobrenome devem ter entre 3 e 50 caracteres.');
        return;
    }
    if (!emailPattern.test(email)) {
        alert('Email inválido.');
        return;
    }
    if (isNaN(age) || age <= 0 || age >= 120) {
        alert('A idade deve ser um número positivo menor que 120.');
        return;
    }
    if (photo && !/^https?:\/\/\S+\.\S+$/.test(photo)) {
        alert('A URL da foto é inválida.');
        return;
    }

    
    const newUser = {
        firstName,
        lastName,
        email,
        age,
        image: photo || 'https://via.placeholder.com/100'
    };

    const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    if (response.ok) {
        alert('Usuário adicionado com sucesso.');
        closeModal(); 
        loadUsers(); 
    } else {
        alert('Erro ao adicionar o usuário.');
    }
}


loadUsers();