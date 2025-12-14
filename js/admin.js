function addPost() {
  const post = {
    image: image.value,
    place: place.value,
    date: date.value,
    caption: caption.value
  };
  output.textContent = JSON.stringify(post, null, 2);
}