(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var myProduct = {
            sofa: [
                { title: "Sofa1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa1.avif", link: "#" },
                { title: "Sofa2", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa2.avif", link: "#" },
                { title: "Sofa3", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa3.avif", link: "#" },
                { title: "Sofa4", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa4.avif", link: "#" },
                { title: "Sofa5", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa5.avif", link: "#" },
                { title: "Sofa6", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa6.avif", link: "#" },
                { title: "Sofa7", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa7.avif", link: "#" },
                { title: "Sofa8", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa8.avif", link: "#" },
                { title: "Sofa9", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa9.avif", link: "#" },
                { title: "Sofa10", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa10.avif", link: "#" },
                { title: "Sofa11", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa11.avif", link: "#" },
                { title: "Sofa12", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa12.avif", link: "#" },
                { title: "Sofa13", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa13.avif", link: "#" },
                { title: "Sofa14", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa14.avif", link: "#" },
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

        var itemsPerPage = 6;
        var currentCategory = localStorage.getItem('currentCategory') || 'sofa';
        var currentPage = 1;
        var totalPages = 0;

        if (window.location.pathname.includes('seeall.html')) {
            itemsPerPage = 12;
        }
        // Handling category click  
        document.querySelectorAll(".nav-aside a").forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
                currentCategory = link.getAttribute("data-category");
                localStorage.setItem('currentCategory', currentCategory);
                RenderPage();
            });
        });

        function RenderPage() {
            let items = myProduct[currentCategory];
            let showProduct = document.getElementById("show-product");
            let innerHTML = "";

            // Calculate total pages
            totalPages = Math.ceil(items.length / itemsPerPage);
            let startIndex = (currentPage - 1) * itemsPerPage;
            let endIndex = Math.min(startIndex + itemsPerPage, items.length);

            for (let i = startIndex; i < endIndex; i++) {
                let product = items[i];
                innerHTML += `
                    <div class="col-4 mb-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.text}</p>
                                <div class="colored_button_div">
                                    <a href="${product.link}" class="colored_button">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            showProduct.innerHTML = innerHTML;
            updatePaginationButtons();
        }

        function updatePaginationButtons() {
            const paginationDiv = document.getElementById('pagination');
            if (paginationDiv) {
                paginationDiv.innerHTML = `
                    ${currentPage > 1 ? '<button id="prev-pagination-button">Previous Page</button>' : ''}
                    ${currentPage < totalPages ? '<button id="next-pagination-button">Next Page</button>' : ''}
                `;
                checkPaginationButtonClick();
            }
        }

        function checkPaginationButtonClick() {
            document.getElementById('next-pagination-button')?.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    RenderPage();
                }
            });

            document.getElementById('prev-pagination-button')?.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    RenderPage();
                }
            });
        }

        // Initial render
        RenderPage();

    });
    
})();