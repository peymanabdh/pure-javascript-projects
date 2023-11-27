const videoEl = document.getElementById("video");

const button = document.getElementById("button");

//promt to select media stream

async function selectMedia() {
  try {
    const mediaSream = await navigator.mediaDevices.getDisplayMedia();
    //console.log(mediaSream);
    videoEl.srcObject = mediaSream;
    videoEl.onloadedmetadata = () => {
      videoEl.play();
    };
  } catch (e) {
    //console.log("error");
  }
}
button.addEventListener("click", async () => {
  button.disable = true;
  await videoEl.requestPictureInPicture();
  button.disable = false;
});
selectMedia();
