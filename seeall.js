(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var myBlog = [
            { title: "Sofa1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa2", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa2.avif", link: "#" },
            { title: "Sofa3", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa4", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa5", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa6", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa7", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa8", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa9", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa10", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa11", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa12", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" },
            { title: "Sofa13", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/sofa1.avif", link: "#" }
        ];

        var itemsPerPage = 12;
        var currentPage = 1;

        function renderPage(page) {
            var startIndex = (page - 1) * itemsPerPage;
            var endIndex = Math.min(startIndex + itemsPerPage, myBlog.length);
            var pageItems = myBlog.slice(startIndex, endIndex);

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

        function renderPagination() {
            var totalPages = Math.ceil(myBlog.length / itemsPerPage);
            var pagination = document.getElementById("pagination");
            var paginationHTML = `<nav aria-label="Product pagination">
                <ul class="pagination">`;

            for (var i = 1; i <= totalPages; i++) {
                paginationHTML += `
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                    </li>
                `;
            }
            paginationHTML += `
                </ul>
            </nav>`;
            pagination.innerHTML = paginationHTML;
        }

        function changePage(page) {
            currentPage = page;
            renderPage(currentPage);
            renderPagination();
        }

        // Initial render
        renderPage(currentPage);
        renderPagination();
    });
})();