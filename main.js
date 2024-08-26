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
            image : "image/sofa2.avif",
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
    `;
}   
blog.innerHTML = innerHTML;
})();

