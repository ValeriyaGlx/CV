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

const table = document.getElementById('projects-table');
const paginationDiv = document.getElementById('pagination');
const rowsPerPage = 4;

function displayPage(page) {
  const startIdx = (page - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    if (i >= startIdx && i < endIdx) {
      rows[i].style.display = 'table-row';
    } else {
      rows[i].style.display = 'none';
    }
  }

  table.scrollIntoView({ behavior: 'smooth' });

  const buttons = paginationDiv.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    if (i + 1 === page) {
      buttons[i].classList.add('active-button');
    } else {
      buttons[i].classList.remove('active-button');
    }
  }
}

const totalRows = table.rows.length - 1; // Exclude the header row
const totalPages = Math.ceil(totalRows / rowsPerPage);


for (let i = 1; i <= totalPages; i++) {
  const link = document.createElement('button');
  link.textContent = i;
  link.addEventListener('click', () => {
    displayPage(i);
  });
  paginationDiv.appendChild(link);
}

// Display the first page by default
displayPage(1);
