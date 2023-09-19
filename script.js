// Get the form and input elements
const form = document.querySelector("form");
const input = document.querySelector('input[type="file"]');

// Get the checkboxes for the icon sizes
const sizes = document.querySelectorAll('input[type="checkbox"]');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!input.files.length) {
    alert("Please select a file");
    return;
  }

  if (
    !sizes[0].checked &&
    !sizes[1].checked &&
    !sizes[2].checked &&
    !sizes[3].checked &&
    !sizes[4].checked &&
    !sizes[5].checked
  ) {
    alert("Please select at least one icon size");
    return;
  }

  const file = input.files[0];
  const extension = file.name.split(".").pop();
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const image = new Image();

    image.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      sizes.forEach((size) => {
        if (size.checked) {
          const iconCanvas = document.createElement("canvas");
          iconCanvas.width = size.value;
          iconCanvas.height = size.value;

          const iconContext = iconCanvas.getContext("2d");
          iconContext.drawImage(image, 0, 0, size.value, size.value);

          const dataURL = iconCanvas.toDataURL(
            `image/${extension === "png" ? "png" : "jpg"}`
          );

          const link = document.createElement("a");
          link.href = dataURL;
          link.download = `icon${size.value}.png`;
          link.click();
        }
      });

      const dataURL = canvas.toDataURL("image/x-icon");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "icon.ico";
      link.click();
    });

    image.src = reader.result;
  });

  reader.readAsDataURL(file);
});

function isOneChecked(checks) {
  for (var i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      return true;
    }
  }

  return false; 
}