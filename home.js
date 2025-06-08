console.log("home.js loaded");
  // DATA PRODUK LENGKAP DENGAN KATEGORI
  const products = {
    'ikan-belanak': {
      id: 'ikan-belanak',
      name: 'Ikan Belanak',
      price: 40000,
      image: 'img/ikan-belanak.png',
      category: 'ikan',
      description: 'Ikan belanak segar langsung dari laut, ditangkap pagi ini dengan metode ramah lingkungan.',
      seller: 'Budi Fisherman',
      rating: 5,
      stock: 15, // dalam kg (diubah dari string ke number untuk perhitungan)
      benefits: ['Kaya omega-3', 'Protein tinggi', 'Segar langsung dari laut'],
      reviews: [
        { user: 'Andi', rating: 5, comment: 'Sangat segar!' },
        { user: 'Siti', rating: 4, comment: 'Pengiriman cepat' }
      ]
    },
    'ikan-puri': {
      id: 'ikan-puri',
      name: 'Ikan Puri',
      price: 25000,
      image: 'img/ikan-puri.png',
      category: 'ikan',
      description: 'Ikan puri segar dengan daging yang lembut dan gurih.',
      seller: 'Budi Fisherman',
      rating: 4,
      stock: 9,
      benefits: ['Rendah lemak', 'Kaya protein', 'Cocok untuk berbagai masakan']
    },
    'udang': {
      id: 'udang',
      name: 'Udang',
      price: 28000,
      image: 'img/udang.png',
      category: 'udang',
      description: 'Udang segar ukuran besar dengan cita rasa manis alami.',
      seller: 'Susi Seafood',
      rating: 5,
      stock: 7,
      benefits: ['Segar langsung dari tambak', 'Ukuran besar', 'Bersih']
    },
    'kepiting': {
      id: 'kepiting',
      name: 'Kepiting',
      price: 40000,
      image: 'img/kepiting.png',
      category: 'kepiting',
      description: 'Kepiting segar dengan daging yang padat dan lezat.',
      seller: 'Joko Nelayan',
      rating: 4,
      stock: 15,
      benefits: ['Daging padat', 'Segar', 'Kaya nutrisi']
    },
    'ikan-tongkol': {
      id: 'ikan-tongkol',
      name: 'Ikan Tongkol',
      price: 37000,
      image: 'img/ikan-tongkol.png',
      category: 'ikan',
      description: 'Ikan tongkol segar dengan tekstur daging yang kenyal.',
      seller: 'Budi Fisherman',
      rating: 4,
      stock: 12,
      benefits: ['Kaya protein', 'Tekstur kenyal', 'Cocok untuk berbagai masakan']
    },
    'sotong': {
      id: 'sotong',
      name: 'Sotong',
      price: 64000,
      image: 'img/sotong.png',
      category: 'cumi-sotong',
      description: 'Sotong segar dengan cita rasa khas yang lezat.',
      seller: 'Joko Nelayan',
      rating: 5,
      stock: 8,
      benefits: ['Segar', 'Tekstur lembut', 'Kaya protein']
    },
    'ikan-kakap': {
      id: 'ikan-kakap',
      name: 'Ikan Kakap',
      price: 72000,
      image: 'img/ikan-kakap.png',
      category: 'ikan',
      description: 'Ikan kakap merah segar dengan daging tebal dan lembut.',
      seller: 'Susi Seafood',
      rating: 5,
      stock: 11,
      benefits: ['Daging tebal', 'Kualitas premium', 'Segar']
    }
  };

  // INISIALISASI DATA
  function initApp() {
    // Inisialisasi produk jika belum ada
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(products));
    }
    
    // Inisialisasi keranjang jika belum ada
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Inisialisasi riwayat belanja jika belum ada
    if (!localStorage.getItem('orderHistory')) {
      localStorage.setItem('orderHistory', JSON.stringify([]));
    }
    
    updateCartCounter();
    renderProductCategories();
  }

  // RENDER KATEGORI PRODUK UNTUK FILTER
  function renderProductCategories() {
    const categoriesContainer = document.getElementById('productCategories');
    if (!categoriesContainer) return;
    
    const categories = [...new Set(Object.values(products).map(p => p.category))];
    
    categories.forEach(category => {
      const div = document.createElement('div');
      div.className = 'category-item';
      div.innerHTML = `
        <input type="checkbox" id="cat-${category}" name="filter" value="${category}" 
               onchange="filterProducts()">
        <label for="cat-${category}">${capitalizeFirstLetter(category)}</label>
      `;
      categoriesContainer.appendChild(div);
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // TOGGLE MODAL
  function toggleModal(id, action = 'toggle') {
    const modal = document.getElementById(id);
    if (action === 'open') {
      modal.classList.add('active');
    } else if (action === 'close') {
      modal.classList.remove('active');
    } else {
      modal.classList.toggle('active');
    }
    
    if (id === 'searchModal') {
      document.getElementById('searchInput').focus();
    }
  }

  // LIHAT DETAIL PRODUK
  function viewDetail(productId) {
    const product = products[productId];
    if (product) {
      localStorage.setItem('currentProduct', JSON.stringify(product));
      window.location.href = `detail.html?id=${productId}`;
    } else {
      showAlert('error', 'Produk tidak ditemukan');
    }
  }

  // BELI SEKARANG
function buyNow(productId) {
  const product = products[productId];
  if (!product) return;
  
  const checkoutData = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    seller: product.seller,
    description: product.description,
    stock: product.stock
  };
  
  localStorage.setItem('productToCheckout', JSON.stringify(checkoutData));
  window.location.href = 'checkout.html';
}
    
    // Siapkan data untuk checkout
    const checkoutData = {
        items: [{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            seller: product.seller,
            quantity: 1,
            stock: product.stock
        }],
        total: product.price,
        date: new Date().toISOString()
    };
    
    // Simpan ke localStorage
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Redirect ke halaman checkout
    window.location.href = 'checkout.html';

  // UPDATE COUNTER KERANJANG
  function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counter = document.querySelector('.cart-counter');
    
    if (!counter) return;
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  // FITUR PENCARIAN
  function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    
    if (input.length < 2) return;
    
    const filteredProducts = Object.values(products).filter(product => 
      product.name.toLowerCase().includes(input) ||
      product.description.toLowerCase().includes(input) ||
      product.seller.toLowerCase().includes(input)
    );
    
    if (filteredProducts.length === 0) {
      resultsContainer.innerHTML = '<div class="no-results">Tidak ditemukan produk yang sesuai</div>';
      return;
    }
    
    filteredProducts.forEach(product => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      resultItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <p>Rp ${formatPrice(product.price)}</p>
        </div>
      `;
      resultItem.onclick = function() {
        viewDetail(product.id);
        toggleModal('searchModal', 'close');
      };
      resultsContainer.appendChild(resultItem);
    });
  }

  // FILTER PRODUK BERDASARKAN KATEGORI
  function filterProducts() {
    const checkboxes = document.querySelectorAll('input[name="filter"]:checked');
    const selectedCategories = Array.from(checkboxes).map(cb => cb.value);
    
    // Jika tidak ada kategori yang dipilih, tampilkan semua produk
    if (selectedCategories.length === 0) {
      document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = 'block';
      });
      return;
    }
    
    document.querySelectorAll('.product-card').forEach(card => {
      const productCategory = card.dataset.category;
      if (selectedCategories.includes(productCategory)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // SORTIR PRODUK
  function sortProducts(sortBy) {
    const productContainer = document.getElementById('productContainer');
    if (!productContainer) return;
    
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    productCards.sort((a, b) => {
      const priceA = parseInt(a.dataset.price);
      const priceB = parseInt(b.dataset.price);
      const ratingA = parseInt(a.dataset.rating);
      const ratingB = parseInt(b.dataset.rating);
      
      switch(sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return ratingB - ratingA;
        case 'name':
          return a.dataset.name.localeCompare(b.dataset.name);
        default:
          return 0;
      }
    });
    
    productCards.forEach(card => productContainer.appendChild(card));
  }

  // FORMAT HARGA
  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
  }

  // TAMPILKAN ALERT
  function showAlert(type, message) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
      alertBox.classList.add('fade-out');
      setTimeout(() => alertBox.remove(), 500);
    }, 3000);
  }

  // EVENT LISTENERS
  document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    // Pencarian saat menekan Enter
    document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') searchProducts();
    });
    
    // Klik di luar modal untuk menutup
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) toggleModal(this.id, 'close');
      });
    });
  });

  // EKSPOR FUNGSI UNTUK DIGUNAKAN DI FILE LAIN
  function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Cek apakah produk sudah di keranjang
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity+=1;
    } else {
      cart.push({name, price, image, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    showAlert('success', '${name} ditambahkan ke keranjang');

    setTimeout(() => {
      window.location.href = 'keranjang.html';
    }, 1000);
  }

  if (typeof window !== 'undefined') {
    window.eCommerceApp = {
      products,
      buyNow,
      addToCart,
      viewDetail,
      updateCartCounter,
      formatPrice,
      showAlert
    };

    window.addToCart = addToCart;
    window.buyNow = buyNow;
    window.viewDetail = viewDetail;
    window.updateCartCounter = updateCartCounter;
  }
