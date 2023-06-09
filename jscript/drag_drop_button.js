// Get the drag-and-drop container element
var dragDropContainer = document.getElementById("drag-drop-container");

// Prevent the browser from opening the file when dropped outside the drop zone
dragDropContainer.addEventListener("dragover", function (e) {
  e.preventDefault();
});

// Handle file drop
dragDropContainer.addEventListener("drop", function (e) {
  e.preventDefault();

  // Get the dropped files
  var files = e.dataTransfer.files;

  // Process the files
  handleFiles(files);
});

// Handle file selection using the file input element
var fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", function (e) {
  var files = e.target.files;
  handleFiles(files);
});

// Handle the selected files
function handleFiles(files) {
  // Clear any existing images
  var imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = "";

  // Loop through the files
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Check if the file is an image
    if (file.type.match("image.*")) {
      // Create a new image element
      var img = document.createElement("img");
      img.classList.add("uploaded-image");

      // Set the image source to the file URL
      img.src = URL.createObjectURL(file);

      // Append the image to the image container
      imageContainer.appendChild(img);

      // Add click event listener to display the image in a modal
      img.addEventListener("click", function () {
        displayImageModal(this.src);
      });
    }
  }
}

// Revoke the object URL after displaying the image
function revokeObjectURL() {
  var images = document.getElementsByClassName("uploaded-image");
  for (var i = 0; i < images.length; i++) {
    URL.revokeObjectURL(images[i].src);
  }
}

// Clean up the object URLs when leaving the page
window.addEventListener("beforeunload", function () {
  revokeObjectURL();
});

// Display the clicked image in a modal
function displayImageModal(src) {
  // Get the modal element
  var modal = document.getElementById("image-modal");

  // Get the modal image element
  var modalImage = document.getElementById("modal-image");

  // Set the source of the modal image
  modalImage.src = src;

  // Show the modal
  modal.style.display = "block";
}

// Close the modal when the user clicks on it
var modal = document.getElementById("image-modal");
modal.addEventListener("click", function () {
  modal.style.display = "none";
});
