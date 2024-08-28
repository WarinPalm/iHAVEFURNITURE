(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var myProduct = {
            sofa: [
                { title: "Sofa1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa1.avif", link: "#" }
            ],
            bed: [
                { title: "Bed1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Bed/bed1.avif", link: "#" }
            ],
            chair: [
                { title: "Chair1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Chair/chair1.avif", link: "#" }
            ],
            table: [
                { title: "Table1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Table/table1.avif", link: "#" }
            ],
            lamp: [
                { title: "Lamp1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Lamp/lamp1.avif", link: "#" }
            ],
            kitchen: [
                { title: "kitchen1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/kitchen/kitchen1.avif", link: "#" }
            ],

        };
        var itemsPerPage = 6; // Number of items to display on the index page
        var currentCategory = 'sofa'; // Default category
        var currentPage = 1;

        if (window.location.pathname.includes('seeall.html')) {
            itemsPerPage = 12;
        }

        function renderPage() {
            let items = myProduct[currentCategory];
            let showProduct = document.getElementById("show-product");
            let innerHTML = "";

            for (let i = 0; i < itemsPerPage; i++) {
                // ใช้ % (modulus) เพื่อวนลูปกลับไปที่สินค้าชิ้นแรกเมื่อสิ้นสุดรายการสินค้า
                let product = items[i % items.length];

                innerHTML += `
                    <div class="col-4 mb-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${product.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.text}</p>
                                <div class="colored_button_div">
                                    <a href="${product.link}" style="text-decoration: none" class="colored_button">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            showProduct.innerHTML = innerHTML;
        }

        // กด category 
        let categoryLinks = document.querySelectorAll(".nav-aside a");
        categoryLinks.forEach(function(link) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                currentCategory = this.getAttribute("data-category");
                renderPage();
            });
        });



        // Initial render
        renderPage();
    });
})();