(function(){
    var myBlog =[
        {
            title : "Sofa1",
            text : "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            image : "image/sofa1.avif",
            link : "#",
        },
        {
            title : "Sofa2",
            text : "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            image : "image/sofa1.avif",
            link : "#",
        },
        {
            title : "Sofa3",
            text : "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            image : "image/sofa1.avif",
            link : "#",
        },
        {
            title : "Sofa4",
            text : "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            image : "image/sofa1.avif",
            link : "#",
        },
        {
            title : "Sofa5",
            text : "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            image : "image/sofa1.avif",
            link : "#",
        },
        {
            title : "Sofa6",
            text : "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            image : "image/sofa1.avif",
            link : "#",
        },

    ];

var blog = document.getElementById("myListBlog");
var innerHTML = "";
for(let i = 0 ; i < myBlog.length; i++){
    let data = myBlog[i];
    innerHTML += `
        <li class="list-item">
            <div class="thumb">
              <a href="${data.image}" class="lightbox">
                <img src="${data.image}" alt="" class="info_img">
            </a>
            </div>
            <h3 class="head_color before">${data.title}</h3>
            <p>${data.text}</p>
            <div class="colored_button_div">
              <a href="${data.link}" style="text-decoration: none" class="colored_button">Add to cart</a>
            </div>
          </li>
    `;
}   
blog.innerHTML = innerHTML;
})();

