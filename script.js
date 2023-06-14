document.body.addEventListener("mousemove", mouseMove);

const word = document.querySelector("h1");
const walk = 17;

function mouseMove(e) {
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty("--posX", x - l - w / 2);
  el.style.setProperty("--posY", y - t - h / 2);

  let { offsetX: nameX, offsetY: nameY } = e;
  const { offsetHeight: height, offsetWidth: width } = document.body;

  if (this !== e.target) {
    nameX = nameX + e.target.offsetLeft;
    nameY = nameY + e.target.offsetTop;
  }

  const xWalk = Math.round((nameX / width) * walk - walk / 2);
  const yWalk = Math.round((nameY / height) * walk - walk / 2);

  word.style.textShadow = `${xWalk}px ${yWalk * -1}px 5px rgba(140,86,20, .3)`;
}
