(function () {
  let ball = document.querySelector(".btn-ball");
  let submit = document.querySelector(".submit-btn");
  let list = document.querySelector(".code-list");
  let isActive = false;
  let startY,
    isDown = false;
  let w = 45,
    h = 60;
  let backgroundImage = createBackgroundImage(w, h);
  let code = "";

  init();
  bindEvent();

  function bindEvent() {
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
      submit.addEventListener("touchstart", _mouseDown);
      submit.addEventListener("touchmove", _mouseMove);
      submit.addEventListener("touchend", _mouseUp);
    } else {
      ball.addEventListener("mousedown", _mouseDown);
      ball.addEventListener("mousemove", _mouseMove);
      ball.addEventListener("mouseup", _mouseUp);
      ball.addEventListener("mouseout", _mouseUp);
    }
  }

  submit.addEventListener("click", action);

  function _mouseDown(e) {
    if (isActive) return;
    if (isDown) return;
    let clientY =
      e.offsetY || (e.changedTouches && e.changedTouches[0].clientY);
    startY = clientY;
    isDown = true;
  }

  function _mouseMove(e) {
    if (isActive) return;
    if (!isDown) return;
    let clientY =
      e.offsetY || (e.changedTouches && e.changedTouches[0].clientY);
    let d = clientY - startY;
    console.log(d);
    if (d > 3) {
      isDown = false;
      action();
    }
  }

  function _mouseUp(e) {
    isDown = false;
  }

  ball.addEventListener("animationend", (e) => {
    submit.classList.remove("active");
    play();
  });

  function action() {
    if (isActive) return;
    code = "";
    isActive = true;
    submit.classList.add("active");
  }

  function play() {
    let nums = createNums();
    code = nums.join("");
    [].forEach.call(list.children, (el, index) => {
      setTimeout(() => {
        let y = parseInt(el.style.backgroundPositionY || "0", 10);
        anime({
          targets: el,
          backgroundPositionY: [y, y + h * 30 + (10 - nums[index]) * h],
          loop: false, // 循环播放
          direction: "normal",
          easing: "easeOutCirc", // 时间曲线
          duration: 2000, // 播放时间2s
          autoplay: true, // 是否立即播放
          complete: (anim) => {
            if (index == 3) isActive = false;
          }
        });
      }, index * 200);
    });
  }

  function init() {
    addBackgroundImage();
  }
  function addBackgroundImage() {
    [].forEach.call(list.children, (el) => {
      el.style.backgroundImage = `url(${backgroundImage.src})`;
    });
  }

  function createBackgroundImage(w, h) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h * 10;
    let BackgroundImage = new Array(10).fill(0);
    BackgroundImage.forEach((n, i) => {
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 36px Baloo Bhaijaan";
      ctx.fillText(i, w / 2, h * i + h / 2 + 5, w);
      ctx.restore();
    });
    return convertCanvasToImage(canvas);
  }

  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }

  function random(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
  }

  function createNums(l = 4) {
    let num = random(1, 9999);
    let res = (num + "").split("");
    let len = res.length;
    if (len < l) {
      for (let i = 0; i < l - len; i++) {
        res.unshift("0");
      }
    }
    return res;
  }

})();