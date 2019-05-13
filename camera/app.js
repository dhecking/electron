navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1280,
      height: 720
    }
  })
  .then(function (stream) {
    document.getElementById('camera').srcObject = stream;
  }).catch(function () {
    alert('could not connect stream');
  });

function playVideo(){
  
}