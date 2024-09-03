function showImage(imgElement){
    var imageUrl = imgElement.src;
    var postsDiv = document.getElementById("posts");
    postsDiv.style.backgroundImage = `url("${imageUrl}")`;
    postsDiv.style.backgroundSize ="cover";
    postsDiv.style.backgroundPosition = "center";
}

function addPost() {
    var postTitle = document.getElementById("post-title");
    var postDescrip = document.getElementById("post-description");
    var posts = document.getElementById("posts");

    if (postTitle.value.trim() && postDescrip.value.trim()) {
        posts.innerHTML += `
        
 <div class="card mb-3  " style="background: none; border-radius: 10px;">
    <div class="card-header fontStyle">
        @Posts
    </div>
            <div class="card-body">
                <h5 class="card-title fontStyle" id="updatedPost">${postTitle.value}</h5>
                <p class="card-text fontStyle" id="updatedDescription">${postDescrip.value}</p>
            </div>
            <div class="d-flex p-3 gap-3">
                <button type="button" class="btn btn-success" onclick="editPost()">Edit</button>
                <button type="button" class="btn btn-danger" onclick="confirmRemove(event)">Delete</button>
            </div>
        </div>`;
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your post has been created",
            showConfirmButton: false,
            timer: 1500
          });
        
        postTitle.value = "";
        postDescrip.value = "";
    } else {
        Swal.fire({
            title: "Empty input?",
            text: "Write something...",
            icon: "question"
        });
    }
}
function confirmRemove(event) {
    Swal.fire({
        title: "Do you want to delete this post?",
        showDenyButton: true,
        confirmButtonText: "Yes, delete it!",
        denyButtonText: " No, cancel!"
    }).then((result) => {
        if (result.isConfirmed) {
            event.target.parentNode.parentNode.remove();
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
        } else if (result.isDenied) {
            Swal.fire("Your imaginary post is saved:)", "", "info");
        }
    });
}
async function editPost() {
    const { value: formValues } = await Swal.fire({
        title: "Update your post",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="update text..." >
          <input id="swal-input2" class="swal2-input" placeholder="update text..." >
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      var updatedPost = document.getElementById("updatedPost")
      var updatedDescription = document.getElementById("updatedDescription")
      updatedPost.innerHTML = formValues[0]
      updatedDescription.innerHTML = formValues[1]
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your post has been updated:)",
        showConfirmButton: false,
        timer: 1500
      });
}

