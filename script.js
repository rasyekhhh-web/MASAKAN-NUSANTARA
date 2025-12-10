// ==============================
// DATA MASAKAN NUSANTARA LENGKAP
// ==============================
const foods = [
    {name:"Rendang", region:"Sumatera Barat", desc:"Masakan daging kaya rempah khas Minangkabau.", img:"images/rendang.png"},
    {name:"Pempek", region:"Sumatera Selatan", desc:"Makanan berbahan ikan tenggiri khas Palembang.", img:"images/pempek.jpg"},
    {name:"Gudeg", region:"Yogyakarta", desc:"Nangka muda dimasak manis dengan santan.", img:"images/gudeg.jpg"},
    {name:"Rawon", region:"Jawa Timur", desc:"Sup daging berkuah hitam dengan kluwek.", img:"https://cdn.pixabay.com/photo/2022/07/29/09/19/rawon-7352723_1280.jpg"},
    {name:"Coto Makassar", region:"Sulawesi Selatan", desc:"Sup daging sapi khas Makassar.", img:"https://cdn.pixabay.com/photo/2020/01/15/09/39/coto-4767559_1280.jpg"},
    {name:"Sate Ayam Madura", region:"Jawa Timur", desc:"Sate ayam bumbu kacang khas Madura.", img:"https://cdn.pixabay.com/photo/2018/03/11/09/06/satay-3212136_1280.jpg"},
    {name:"Soto Betawi", region:"DKI Jakarta", desc:"Soto berkuah santan khas Betawi.", img:"https://cdn.pixabay.com/photo/2020/11/20/08/37/soto-5759087_1280.jpg"},
    {name:"Ayam Betutu", region:"Bali", desc:"Ayam berbumbu pedas khas Bali.", img:"https://cdn.pixabay.com/photo/2021/02/10/17/44/betutu-6003186_1280.jpg"},
    {name:"Papeda", region:"Papua", desc:"Bubur sagu dengan kuah kuning ikan.", img:"https://cdn.pixabay.com/photo/2021/04/16/15/59/papeda-6184905_1280.jpg"}
];

// ==============================
// AMBIL ELEMEN HTML
// ==============================
const listContainer = document.querySelector(".masakan-list");

// Search Box
const searchBox = document.createElement("input");
searchBox.placeholder = "Cari makanan...";
searchBox.className = "search-box";
searchBox.style.cssText =
    "padding:10px;width:100%;border-radius:6px;margin-bottom:20px;border:1px solid #ccc;";

// Dropdown Daerah
const dropdown = document.createElement("select");
dropdown.className = "region-dropdown";
dropdown.style.cssText =
    "padding:10px;border-radius:6px;margin-bottom:20px;border:1px solid #ccc;";

// ==============================
// RENDER LIST
// ==============================
function renderList(data) {
    listContainer.innerHTML = "";
    data.forEach((food, index) => {
        const item = document.createElement("div");
        item.className = "masakan-item animate-card";

        item.innerHTML = `
            <img src="${food.img}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p><b>${food.region}</b></p>
            <div class="detail" id="detail-${index}">
                <p>${food.desc}</p>
            </div>
        `;

        item.addEventListener("click", () => {
            const detail = document.getElementById(`detail-${index}`);
            detail.style.display =
                detail.style.display === "block" ? "none" : "block";
        });

        listContainer.appendChild(item);
    });
}

// ==============================
// INIT DROPDOWN
// ==============================
function initDropdown() {
    const regions = [...new Set(foods.map(f => f.region))];
    dropdown.innerHTML = `<option value="all">Semua Daerah</option>`;
    regions.forEach(r => dropdown.innerHTML += `<option value="${r}">${r}</option>`);
}

// ==============================
// FILTER DAERAH
// ==============================
dropdown.addEventListener("change", () => {
    if (dropdown.value === "all") return renderList(foods);
    renderList(foods.filter(f => f.region === dropdown.value));
});

// ==============================
// SEARCH
// ==============================
searchBox.addEventListener("input", () => {
    const keyword = searchBox.value.toLowerCase();
    const filtered = foods.filter(f => f.name.toLowerCase().includes(keyword));
    renderList(filtered);
});

// ==============================
// TAMBAH KE HALAMAN
// ==============================
const container = document.querySelector(".container");
container.prepend(dropdown);
container.prepend(searchBox);

// Jalankan
initDropdown();
renderList(foods);
