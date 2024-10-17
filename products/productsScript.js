document.addEventListener('DOMContentLoaded', () => {
    
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(product => {
                addProductToDOM(product);
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));

    
    const modal = document.getElementById('addProductModal');
    const btn = document.getElementById('addProductBtn');
    const span = document.getElementsByClassName('close')[0];

    
btn.onclick = () => {
    modal.style.display = 'block';
};


span.onclick = () => {
    modal.style.display = 'none';
};


window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


    
    document.getElementById('productForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const brand = document.getElementById('brand').value;
        const category = document.getElementById('category').value;
        const thumbnail = document.getElementById('thumbnail').value;
        const email = document.getElementById('email').value;
        const age = parseInt(document.getElementById('age').value, 10);

       
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid =
            title.length >= 3 && title.length <= 50 &&
            description.length >= 3 && description.length <= 50 &&
            brand.length >= 3 && brand.length <= 50 &&
            category.length >= 3 && category.length <= 50 &&
            emailRegex.test(email) &&
            price > 0 && age > 0 && age < 120 &&
            (!thumbnail || thumbnail.startsWith('http'));

        if (!isValid) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        
        const newProduct = {
            title,
            description,
            price,
            brand,
            category,
            thumbnail
        };

       
        addProductToDOM(newProduct);
        alert('Produto adicionado com sucesso!');
        modal.style.display = 'none';
        document.getElementById('productForm').reset();
    });
});


function addProductToDOM(product) {
    const productList = document.getElementById('productList');
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Preço: R$${product.price}</p>
        <p>Marca: ${product.brand}</p>
        <p>Categoria: ${product.category}</p>
        <button class="deleteBtn">Excluir</button>
    `;

   
    productItem.querySelector('.deleteBtn').addEventListener('click', () => {
        productItem.remove();
    });

    productList.appendChild(productItem);
}
