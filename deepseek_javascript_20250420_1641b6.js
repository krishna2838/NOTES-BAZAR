// ===== CART FUNCTIONALITY =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Add to cart buttons
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const chapter = this.dataset.chapter;
    const price = parseInt(this.dataset.price);
    
    cart.push({
      name: chapter,
      price: price
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Visual feedback
    this.textContent = 'Added!';
    this.style.backgroundColor = '#2ecc71';
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart (₹' + price + ')';
      this.style.backgroundColor = '';
    }, 1000);
  });
});

// Bundle buttons
document.querySelectorAll('.btn-bundle').forEach(button => {
  button.addEventListener('click', function() {
    const subject = this.dataset.subject;
    let bundleItems = [];
    let totalPrice = 0;
    
    // Physics bundle example
    if (subject === 'physics') {
      bundleItems = [
        { name: 'Physics Complete Bundle', price: 499 }
      ];
      totalPrice = 499;
    }
    
    // Add to cart
    cart = cart.concat(bundleItems);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Redirect to cart
    window.location.href = 'cart.html';
  });
});

// ===== PDF PREVIEW =====
document.querySelectorAll('.btn-preview').forEach(btn => {
  btn.addEventListener('click', function() {
    const pdfUrl = `assets/pdfs/${this.dataset.pdf}`;
    document.getElementById('pdfViewer').src = pdfUrl;
    document.getElementById('pdfModal').style.display = 'block';
  });
});

// Close modal
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('pdfModal').style.display = 'none';
  document.getElementById('pdfViewer').src = '';
});

// Close when clicking outside
window.addEventListener('click', function(event) {
  if (event.target === document.getElementById('pdfModal')) {
    document.getElementById('pdfModal').style.display = 'none';
    document.getElementById('pdfViewer').src = '';
  }
});

// ===== SEARCH FUNCTIONALITY =====
document.getElementById('searchBtn').addEventListener('click', function() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.chapter-card').forEach(card => {
    const chapterName = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = chapterName.includes(query) ? 'block' : 'none';
  });
});

// Initialize
updateCartCount();