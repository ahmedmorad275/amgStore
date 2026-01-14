// show and close modal .........=
const navbarSignUp = document.getElementById('navbarSignUp');
const navbarLogin = document.getElementById('navbarLogin');
const loginFromSignUpModal = document.getElementById('loginFromSignUpModal');
const signUpFromLoginModal = document.getElementById('signUpFromLoginModal');
const modal = document.querySelector('.modal');
const loginModal = document.querySelector('.loginModal');
const signUpModal = document.querySelector('.signUpModal');
const navbar = document.querySelector('.navbar');
const togglePasswordVisibility = document.querySelectorAll('.fa-eye');
function showModal(ele) {
  navbar.style.position = 'static';
  modal.style.display = 'flex';
  ele.style.display = 'block';
}
function closeModal() {
  navbar.style.position = 'sticky';
  modal.style.display = 'none';
  loginModal.style.display = 'none';
  signUpModal.style.display = 'none';
}
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal();
  }
});
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

navbarSignUp.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(signUpModal);
});
navbarLogin.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(loginModal);
});
signUpFromLoginModal.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal();
  showModal(signUpModal);
});
loginFromSignUpModal.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal();
  showModal(loginModal);
});
togglePasswordVisibility.forEach((ele) => {
  ele.addEventListener('click', () => {
    if (ele.classList.contains('fa-eye')) {
      ele.classList.add('fa-eye-slash');
      document.getElementById('passwordLogin').setAttribute('type', 'text');
      document.getElementById('passwordSignUp').setAttribute('type', 'text');
      ele.classList.remove('fa-eye');
    } else {
      ele.classList.add('fa-eye');
      document.getElementById('passwordLogin').setAttribute('type', 'password');
      document
        .getElementById('passwordSignUp')
        .setAttribute('type', 'password');
      ele.classList.remove('fa-eye-slash');
    }
  });
});
// show and close modal .........=

// slide offer Images .........=
const previousSlideBtn = document.querySelector('.previous');
const nextSlideBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
const offer = document.querySelector('.offer');
const offerContainer = document.querySelector('.offerContainer');
const totalSlides = dots.length;
let currentSlide = 0;
let autoPlayInterval;

function updateActiveDot() {
  dots.forEach((dot) => {
    dot.classList.remove('activeDot');
    dot.setAttribute('aria-current', 'false');
  });
  dots[currentSlide].classList.add('activeDot');
  dots[currentSlide].setAttribute('aria-current', 'true');
}

function updateSlidePosition() {
  offer.style.transform = `translateX(${currentSlide * -100}%)`;
  updateActiveDot();
}

function showNextSlide() {
  currentSlide++;
  if (currentSlide === totalSlides) {
    currentSlide = 0;
  }
  updateSlidePosition();
}

function showPreviousSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  updateSlidePosition();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlidePosition();
}

function startAutoPlay() {
  autoPlayInterval = setInterval(showNextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

nextSlideBtn.addEventListener('click', () => {
  showNextSlide();
  resetAutoPlay();
});
previousSlideBtn.addEventListener('click', () => {
  showPreviousSlide();
  resetAutoPlay();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    resetAutoPlay();
  });
});

offerContainer.addEventListener('mouseenter', stopAutoPlay);
offerContainer.addEventListener('mouseleave', startAutoPlay);
offerContainer.addEventListener('focus', stopAutoPlay, true);
offerContainer.addEventListener('blur', startAutoPlay, true);

startAutoPlay();
// Mobile Swiper
let current = 0;
let moved = 0;
let diff;
offer.addEventListener('touchstart', (e) => {
  current = e.touches[0].clientX;
});
offer.addEventListener('touchmove', (e) => {
  moved = e.touches[0].clientX;
  diff = moved - current;
});
offer.addEventListener('touchend', () => {
  if (diff < -50) {
    showNextSlide();
    resetAutoPlay();
  } else if (diff > 50) {
    showPreviousSlide();
    resetAutoPlay();
  }
});
// slide offer Images .........=

// Cart Functions .........=
const cartBtn = document.getElementById('cartBtn');
const cartBtnMobile = document.querySelector('.cartBoxMobile');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartModalBox = document.querySelector('.cartModal');
let showCartBox = false;
function showCartToggle() {
  if (showCartBox) {
    cartModalBox.style.display = 'block';
  } else {
    cartModalBox.style.display = 'none';
  }
}
showCartToggle();
cartBtn.addEventListener('click', () => {
  showCartBox = true;
  showCartToggle();
});
cartBtnMobile.addEventListener('click', () => {
  showCartBox = true;
  showCartToggle();
});
cartCloseBtn.addEventListener('click', () => {
  showCartBox = false;
  showCartToggle();
});

const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Cart Functions .........=

// Getting smartPhones .........=
const phoneCards = document.querySelector('.phoneCards');
function showLoader(ele) {
  ele.insertAdjacentHTML(
    'beforeend',
    `
    <div class="loaderContainer">
              <div class="loader"></div>
            </div>
    `
  );
}

function hideLoader(ele) {
  const loader = ele.querySelector('.loaderContainer');
  if (loader) {
    loader.remove();
  }
}

function renderSmartPhones(data = []) {
  data.forEach((phone) => {
    phoneCards.insertAdjacentHTML(
      'beforeend',
      `
      <article class="phoneCard">
        <div class="phoneImage">
          <img src=${phone.images[2]} alt='${phone.title}'/>
        </div>
        <div class="phoneDetails">
          <h4>${phone.title}</h4>
          <div class='phonePrice'>
            <p>${Math.round(phone.price * 48)} EGP</p>
            <span id="discount">${
              Math.round(phone.price * 48) -
              Math.round(
                (Math.round(phone.price * 48) *
                  Math.round(phone.discountPercentage)) /
                  100
              )
            } EGP</span>
          </div>
          <div class='addToCart'>
            <button class='addToCartBtn' data-id=${phone.id}>Add to cart</button>
          </div>
        </div>
        <div class="discountBox">
          <p>${Math.round(phone.discountPercentage)}%</p>
          <p>OFF</p>
        </div>
      </article>`
    );
  });
}
async function getSmartPhones() {
  showLoader(phoneCards);
  try {
    const response = await fetch(
      'https://dummyjson.com/products/category/smartphones'
    );
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const data = await response.json();
    const smartPhones = data.products.splice(0, 6);
    localStorage.setItem('smartPhones', JSON.stringify(smartPhones));
    renderSmartPhones(smartPhones);
    const addToCartBtns = document.querySelectorAll('.addToCartBtn');
    addToCartBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.target.classList.add('disabled')
        const item = smartPhones.find((ele) => ele.id == e.target.dataset.id);
        addToCart(item);
      });
    });
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader(phoneCards);
  }
}

getSmartPhones();
// Getting smartPhones .........=

// To Top Button .........=
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY >= 100) {
    toTopBtn.style.opacity = 1;
    toTopBtn.style.transform = `translateY(0px)`;
  } else {
    toTopBtn.style.opacity = 0;
    toTopBtn.style.transform = `translateY(100px)`;
  }
});
toTopBtn.addEventListener('click', () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
// To Top Button .........=

// Toast Function .........=
const toast = document.querySelector('.toast');
const toastText = document.querySelector('.toastText');
function showToast(ele) {
  toastText.textContent = `${ele.name} added to cart successfully`;
  toast.style.transform = 'translateX(0px)';
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.transform = 'translateX(500px)';
    toast.style.opacity = 0;
  }, 3000);
}

// Toast Function .........=

// Daily Essentials .........=
const dailyEssBrandsContainer = document.querySelector(
  '.dailyEssBrandsContainer'
);
function renderDailyEssentials(data = []) {
  data.forEach((product) => {
    dailyEssBrandsContainer.insertAdjacentHTML(
      'beforeend',
      `
      <article class="dailyEssBrandContainer">
              <div class="imageBox">
                <img src=${product.images[0]} alt="${product.title}" />
              </div>
              <div class="dailyEssTextBox">
                <p class="dailyEssTitle">${product.title}</p>
                <p class="dailyEssDiscount">Up to ${Math.round(
                  product.discountPercentage
                )} OFF</p>
              </div>
            </article>
      `
    );
  });
}
async function getDailyEssentials() {
  showLoader(dailyEssBrandsContainer);
  try {
    const response = await fetch(
      'https://dummyjson.com/products/category/groceries'
    );
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const data = await response.json();
    const dailyEss = data.products.splice(0, 8);
    renderDailyEssentials(dailyEss);
  } catch (err) {
    console.error(err);
  } finally {
    hideLoader(dailyEssBrandsContainer);
  }
}
getDailyEssentials();
// Daily Essentials .........=

function addToCart(item) {
  const existingItem = cart.find((ele) => ele.id == item.id);
  if (existingItem) return;
  const newCartItem = {
    id: item.id,
    name: item.title,
    image: item.images[2],
    qty: 1,
    price:
      Math.round(item.price * 48) -
      Math.round(
        (Math.round(item.price * 48) * Math.round(item.discountPercentage)) /
          100
      ),
  };
  cart.push(newCartItem);
  console.log(cart);
  localStorage.setItem('cartItems', JSON.stringify(cart));
  showToast(newCartItem);
  updateCart();
}

const cartItemsBox = document.querySelector('.cartItemsBox');
function updateCart() {
  if (!cart) return;
  const cartItemQty = document.querySelector('.cartItemQty');
  const cartItemQtyMob = document.getElementById('cartItemQty');
  cartItemQty.textContent = `${cart.length}`;
  cartItemQtyMob.textContent = `${cart.length}`;
  cartItemsBox.innerHTML = '';
  cart.forEach((item) => {
    cartItemsBox.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="cartItem">
      <div class="item">
      <div class="cartItemImage">
      <img
      src=${item.image}
      alt='${item.name}' />
      </div>
      <div class="cartItemDetails">
      <p class="itemName">${item.name}</p>
      <p class="itemTotalPrice">Total: ${item.price} EGP</p>
      </div>
      </div>
      <div class="itemQuantity">
      <button class="decreaseQty">-</button>
      <p class="quantity">${item.qty}</p>
      <button class="increaseQty">+</button>
                    </div>
                    </div>
      `
    );
  });
}

updateCart();
