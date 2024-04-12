const wrapper = document.getElementById("tiles");

let boxsize = 50, toggled = false, columns, rows;
const handleOnClick = index =>{
    //count = (count+1)%2;
    if(!toggled){
        toggled = true;
        document.body.classList.toggle("toggled");
        document.body.style.overflow = "visible";
        const tileanim = anime({
            targets: ".tile",
            opacity: toggled? 0:1,
            //backgroundColor: colors[count],
            delay: anime.stagger(30,{
                grid: [columns,rows],
                from: index
            })
        })
        tileanim.finished.then(() => document.getElementById("tiles").remove());
    }
}

const createTile = index =>{
    const tile  = document.createElement("div");
    tile.style.opacity = toggled ? 0 : 1;
    tile.classList.add("tile");
    tile.onclick = e => handleOnClick(index);
    return tile;
}

const createTiles =  quantity => {
    console.log(quantity);
    Array.from(Array(quantity)).map((tile,index)=>{
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    columns = Math.floor(document.body.clientWidth/boxsize),
    rows = Math.floor(document.body.clientHeight/boxsize);
    wrapper.innerHTML = "";
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    console.log(columns, rows);
    createTiles(columns*rows);
}

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

createGrid();
window.onresize = () => createGrid();

document.addEventListener('DOMContentLoaded', function() {
    var toggles = document.querySelectorAll('.dropdown-toggle');
    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            event.preventDefault(); // Prevent default anchor link behavior

            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                this.classList.remove('open');
            } else {
                content.style.display = 'block';
                this.classList.add('open');
            }
        });
    });
});