(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var myBlog = {
            sofa: [
                { title: "Sofa1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
                { title: "Sofa2", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa2.avif", link: "#" },
                { title: "Sofa3", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
                { title: "Sofa4", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
                { title: "Sofa5", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
                { title: "Sofa6", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" }
            ],
            bed: [
                { title: "Bed1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/bed/bed1.avif", link: "#" },
                { title: "Bed2", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/bed/bed1.avif", link: "#" },
                { title: "Bed3", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/bed/bed1.avif", link: "#" },
                { title: "Bed4", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/bed/bed1.avif", link: "#" },
                { title: "Bed5", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/bed/bed1.avif", link: "#" },
                { title: "Bed6", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/bed/bed1.avif", link: "#" }
            ],

        };

        var itemsPerPage = 6; // Number of items to display on the index page
        var currentCategory = 'sofa'; // Default category

        function renderPage() {
            var items = myBlog[currentCategory] || [];
            var pageItems = items.slice(0, itemsPerPage); // Display only the first 6 items

            var showProduct = document.getElementById("show-product");
            var innerHTML = "";
            pageItems.forEach(function(data) {
                innerHTML += `
                    <div class="col-4 mb-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${data.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${data.title}</h5>
                                <p class="card-text">${data.text}</p>
                                <div class="colored_button_div">
                                    <a href="${data.link}" style="text-decoration: none" class="colored_button">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            showProduct.innerHTML = innerHTML;
        }

        // Handle category clicks
        var categoryLinks = document.querySelectorAll(".nav-aside a");
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