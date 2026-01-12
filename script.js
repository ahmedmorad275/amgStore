// show and close modal .........=
const navbarSignUp = document.getElementById("navbarSignUp");
const navbarLogin = document.getElementById("navbarLogin");
const loginFromSignUpModal = document.getElementById("loginFromSignUpModal");
const signUpFromLoginModal = document.getElementById("signUpFromLoginModal");
const modal = document.querySelector(".modal");
const loginModal = document.querySelector(".loginModal");
const signUpModal = document.querySelector(".signUpModal");
const navbar = document.querySelector(".navbar");
const togglePasswordVisibility = document.querySelectorAll(".fa-eye");
function showModal(ele) {
  navbar.style.position = "static";
  modal.style.display = "flex";
  ele.style.display = "block";
}
function closeModal() {
  navbar.style.position = "sticky";
  modal.style.display = "none";
  loginModal.style.display = "none";
  signUpModal.style.display = "none";
}
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal();
  }
});
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

navbarSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  showModal(signUpModal);
});
navbarLogin.addEventListener("click", (e) => {
  e.preventDefault();
  showModal(loginModal);
});
signUpFromLoginModal.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
  showModal(signUpModal);
});
loginFromSignUpModal.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
  showModal(loginModal);
});
togglePasswordVisibility.forEach((ele) => {
  ele.addEventListener("click", () => {
    if (ele.classList.contains("fa-eye")) {
      ele.classList.add("fa-eye-slash");
      document.getElementById("passwordLogin").setAttribute("type", "text");
      document.getElementById("passwordSignUp").setAttribute("type", "text");
      ele.classList.remove("fa-eye");
    } else {
      ele.classList.add("fa-eye");
      document.getElementById("passwordLogin").setAttribute("type", "password");
      document
        .getElementById("passwordSignUp")
        .setAttribute("type", "password");
      ele.classList.remove("fa-eye-slash");
    }
  });
});
// show and close modal .........=

// slide offer Images .........=
const previousSlideBtn = document.querySelector(".previous");
const nextSlideBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
const offer = document.querySelector(".offer");
const offerContainer = document.querySelector(".offerContainer");
const totalSlides = dots.length;
let currentSlide = 0;
let autoPlayInterval;

function updateActiveDot() {
  dots.forEach((dot) => {
    dot.classList.remove("activeDot");
    dot.setAttribute("aria-current", "false");
  });
  dots[currentSlide].classList.add("activeDot");
  dots[currentSlide].setAttribute("aria-current", "true");
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

nextSlideBtn.addEventListener("click", () => {
  showNextSlide();
  resetAutoPlay();
});
previousSlideBtn.addEventListener("click", () => {
  showPreviousSlide();
  resetAutoPlay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
    resetAutoPlay();
  });
});

offerContainer.addEventListener("mouseenter", stopAutoPlay);
offerContainer.addEventListener("mouseleave", startAutoPlay);
offerContainer.addEventListener("focus", stopAutoPlay, true);
offerContainer.addEventListener("blur", startAutoPlay, true);

startAutoPlay();
// slide offer Images .........=

// Cart Functions .........=
const cartBtn = document.getElementById("cartBtn");
const cartBtnMobile = document.querySelector(".cartBoxMobile");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartModalBox = document.querySelector(".cartModal");
let showCartBox = false;
function showCartToggle() {
  if (showCartBox) {
    cartModalBox.style.display = "block";
  } else {
    cartModalBox.style.display = "none";
  }
}
showCartToggle();
cartBtn.addEventListener("click", () => {
  showCartBox = true;
  showCartToggle();
});
cartBtnMobile.addEventListener("click", () => {
  showCartBox = true;
  showCartToggle();
});
cartCloseBtn.addEventListener("click", () => {
  showCartBox = false;
  showCartToggle();
});
// Cart Functions .........=

// Getting smartPhones .........=
const phoneCards = document.querySelector(".phoneCards");
function renderSmartPhones(data = []) {
  data.forEach((phone) => {
    phoneCards.insertAdjacentHTML(
      "beforeend",
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
            <button id='addToCart'>Add to cart</button>
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
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/smartphones"
    );
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const data = await response.json();
    const smartPhones = data.products.splice(0, 6);
    renderSmartPhones(smartPhones);
  } catch (error) {
    console.error(error);
  }
}

getSmartPhones();
// Getting smartPhones .........=

// const data = [
//   {
//     id: 121,
//     title: "iPhone 5s",
//     description:
//       "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
//     category: "smartphones",
//     price: 199.99,
//     discountPercentage: 12.91,
//     rating: 2.83,
//     stock: 25,
//     tags: ["smartphones", "apple"],
//     brand: "Apple",
//     sku: "SMA-APP-IPH-121",
//     weight: 2,
//     dimensions: {
//       width: 5.29,
//       height: 18.38,
//       depth: 17.72,
//     },
//     warrantyInformation: "Lifetime warranty",
//     shippingInformation: "Ships in 1 month",
//     availabilityStatus: "In Stock",
//     reviews: [
//       {
//         rating: 5,
//         comment: "Highly recommended!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Jace Smith",
//         reviewerEmail: "jace.smith@x.dummyjson.com",
//       },
//       {
//         rating: 1,
//         comment: "Not as described!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Logan Torres",
//         reviewerEmail: "logan.torres@x.dummyjson.com",
//       },
//       {
//         rating: 5,
//         comment: "Very satisfied!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Harper Kelly",
//         reviewerEmail: "harper.kelly@x.dummyjson.com",
//       },
//     ],
//     returnPolicy: "60 days return policy",
//     minimumOrderQuantity: 3,
//     meta: {
//       createdAt: "2025-04-30T09:41:02.054Z",
//       updatedAt: "2025-04-30T09:41:02.054Z",
//       barcode: "8814683940853",
//       qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
//     },
//     images: [
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp",
//     ],
//     thumbnail:
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",
//   },
//   {
//     id: 122,
//     title: "iPhone 6",
//     description:
//       "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
//     category: "smartphones",
//     price: 299.99,
//     discountPercentage: 6.69,
//     rating: 3.41,
//     stock: 60,
//     tags: ["smartphones", "apple"],
//     brand: "Apple",
//     sku: "SMA-APP-IPH-122",
//     weight: 7,
//     dimensions: {
//       width: 11,
//       height: 9.1,
//       depth: 9.67,
//     },
//     warrantyInformation: "1 month warranty",
//     shippingInformation: "Ships overnight",
//     availabilityStatus: "In Stock",
//     reviews: [
//       {
//         rating: 3,
//         comment: "Disappointing product!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Stella Morris",
//         reviewerEmail: "stella.morris@x.dummyjson.com",
//       },
//       {
//         rating: 4,
//         comment: "Excellent quality!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Nolan Gonzalez",
//         reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
//       },
//       {
//         rating: 5,
//         comment: "Great value for money!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Benjamin Foster",
//         reviewerEmail: "benjamin.foster@x.dummyjson.com",
//       },
//     ],
//     returnPolicy: "7 days return policy",
//     minimumOrderQuantity: 5,
//     meta: {
//       createdAt: "2025-04-30T09:41:02.054Z",
//       updatedAt: "2025-04-30T09:41:02.054Z",
//       barcode: "9922357685013",
//       qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
//     },
//     images: [
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/3.webp",
//     ],
//     thumbnail:
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp",
//   },
//   {
//     id: 123,
//     title: "iPhone 13 Pro",
//     description:
//       "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
//     category: "smartphones",
//     price: 1099.99,
//     discountPercentage: 9.37,
//     rating: 4.12,
//     stock: 56,
//     tags: ["smartphones", "apple"],
//     brand: "Apple",
//     sku: "SMA-APP-IPH-123",
//     weight: 8,
//     dimensions: {
//       width: 12.63,
//       height: 5.28,
//       depth: 14.29,
//     },
//     warrantyInformation: "3 year warranty",
//     shippingInformation: "Ships in 2 weeks",
//     availabilityStatus: "In Stock",
//     reviews: [
//       {
//         rating: 5,
//         comment: "Would buy again!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Christian Perez",
//         reviewerEmail: "christian.perez@x.dummyjson.com",
//       },
//       {
//         rating: 3,
//         comment: "Not worth the price!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Liam Gonzalez",
//         reviewerEmail: "liam.gonzalez@x.dummyjson.com",
//       },
//       {
//         rating: 5,
//         comment: "Very satisfied!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Tristan Scott",
//         reviewerEmail: "tristan.scott@x.dummyjson.com",
//       },
//     ],
//     returnPolicy: "7 days return policy",
//     minimumOrderQuantity: 1,
//     meta: {
//       createdAt: "2025-04-30T09:41:02.054Z",
//       updatedAt: "2025-04-30T09:41:02.054Z",
//       barcode: "4998438802308",
//       qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
//     },
//     images: [
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp",
//     ],
//     thumbnail:
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
//   },
//   {
//     id: 124,
//     title: "iPhone X",
//     description:
//       "The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.",
//     category: "smartphones",
//     price: 899.99,
//     discountPercentage: 19.59,
//     rating: 2.51,
//     stock: 37,
//     tags: ["smartphones", "apple"],
//     brand: "Apple",
//     sku: "SMA-APP-IPH-124",
//     weight: 1,
//     dimensions: {
//       width: 21.88,
//       height: 24.19,
//       depth: 14.19,
//     },
//     warrantyInformation: "3 months warranty",
//     shippingInformation: "Ships in 3-5 business days",
//     availabilityStatus: "In Stock",
//     reviews: [
//       {
//         rating: 4,
//         comment: "Highly recommended!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Tyler Davis",
//         reviewerEmail: "tyler.davis@x.dummyjson.com",
//       },
//       {
//         rating: 5,
//         comment: "Great product!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Aria Parker",
//         reviewerEmail: "aria.parker@x.dummyjson.com",
//       },
//       {
//         rating: 2,
//         comment: "Not as described!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Lily Torres",
//         reviewerEmail: "lily.torres@x.dummyjson.com",
//       },
//     ],
//     returnPolicy: "7 days return policy",
//     minimumOrderQuantity: 2,
//     meta: {
//       createdAt: "2025-04-30T09:41:02.054Z",
//       updatedAt: "2025-04-30T09:41:02.054Z",
//       barcode: "3034949322264",
//       qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
//     },
//     images: [
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/3.webp",
//     ],
//     thumbnail:
//       "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp",
//   },
//   {
//     id: 125,
//     title: "Oppo A57",
//     description:
//       "The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.",
//     category: "smartphones",
//     price: 249.99,
//     discountPercentage: 2.43,
//     rating: 3.94,
//     stock: 19,
//     tags: ["smartphones", "oppo"],
//     brand: "Oppo",
//     sku: "SMA-OPP-OPP-125",
//     weight: 5,
//     dimensions: {
//       width: 7.2,
//       height: 10.74,
//       depth: 23.68,
//     },
//     warrantyInformation: "Lifetime warranty",
//     shippingInformation: "Ships in 3-5 business days",
//     availabilityStatus: "In Stock",
//     reviews: [
//       {
//         rating: 4,
//         comment: "Excellent quality!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Scarlett Wright",
//         reviewerEmail: "scarlett.wright@x.dummyjson.com",
//       },
//       {
//         rating: 5,
//         comment: "Excellent quality!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Jacob Cooper",
//         reviewerEmail: "jacob.cooper@x.dummyjson.com",
//       },
//       {
//         rating: 2,
//         comment: "Poor quality!",
//         date: "2025-04-30T09:41:02.054Z",
//         reviewerName: "Zoe Nicholson",
//         reviewerEmail: "zoe.nicholson@x.dummyjson.com",
//       },
//     ],
//     returnPolicy: "90 days return policy",
//     minimumOrderQuantity: 3,
//     meta: {
//       createdAt: "2025-04-30T09:41:02.054Z",
//       updatedAt: "2025-04-30T09:41:02.054Z",
//       barcode: "0651223722522",
//       qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
//     },
//     images: [
//       "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/1.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/2.webp",
//       "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/3.webp",
//     ],
//     thumbnail:
//       "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/thumbnail.webp",
//   },
// ];
