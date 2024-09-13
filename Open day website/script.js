fetch("http://openday.kumaraguru.in/api/v1/departments/")
  .then(response => response.json())
  .then(res=>{
    const data=res;
    let depts='';
    data.forEach(depart => {
       depts+=`<div onclick="clicked(this);" id="${depart.id}" class="depts">
                    <img src="https://picsum.photos/id/${depart.id}/300/200" >
                    <h3>${depart.name}</h3>
                </div>`;

    })
    document.getElementById('alldepartments').innerHTML=depts;
    pagin();
  })
  .catch(err=> {document.getElementById('alldepartments').innerHTML=` 
                   <div style="text-align: center;color: red;">
                       <h2>Error!!!</h2>
                       <h4>Error Details:${err}</h4>
                   </div>`
  });

  const search = () => {
    const searchbox = document.getElementById("search-dept").value.toUpperCase();
    const depts = document.querySelectorAll(".depts");
    depts.forEach(dept => {
        const deptName = dept.querySelector('h3').textContent.toUpperCase();
        dept.style.display = deptName.includes(searchbox) ? "block" : "none"; 
    });
    pagin(); 
}

function pagin()
{
const cardsPerPage = 100; 
const dataContainer = document.getElementById('alldepartments'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('.page-link'); 


if (!dataContainer || !prevButton || !nextButton || !pageNumbers) {
    console.error('Pagination elements are missing.');
    return; 
  }


const cards = 
    Array.from(dataContainer.getElementsByClassName('depts')); 


const totalPages = Math.ceil(cards.length / cardsPerPage); 
let currentPage = 1;   

function displayPage(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    cards.forEach((card, index) => {
        card.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
    });
}

function updatePagination() {
    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageLinks.forEach((link) => { 
        const page = parseInt(link.getAttribute('data-page')); 
        link.classList.toggle('active', page === currentPage); 
    }); 
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePagination();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePagination();
    }
});

pageLinks.forEach((link) => { 
    link.addEventListener('click', (e) => { 
        e.preventDefault(); 
        const page = parseInt(link.getAttribute('data-page')); 
        if (page !== currentPage) { 
            currentPage = page; 
            displayPage(currentPage); 
            updatePagination(); 
        } 
    }); 
}); 

displayPage(currentPage);
updatePagination();
}
document.getElementById('Map').addEventListener('click', function(){ 
    const MapUrl ='https://www.google.com/maps/place/Kumaraguru+College+of+Technology/@11.0777673,76.9870923,17z/';
    window.location.href = MapUrl;
});

function clicked(item) {
    const id = item.getAttribute("id");
    const url = `http://openday.kumaraguru.in/api/v1/department/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(department => {
            const depname = `<h1>Department Name: ${department.name}</h1>`;
            const departimage = `<img src="https://picsum.photos/id/${id}/300/200">`;
            const descp = `
                <h2>Description: ${department.description}</h2>
                <br>
                <br>
                <h2>Block: ${department.block}</h2>
                <br>
                <br>
                <h2>Link: <a href="${department.link}" target="_blank">${department.link}</a></h2>`;
            localStorage.setItem('depname', depname);
            localStorage.setItem('descp', descp);
            localStorage.setItem('departimage', departimage);
            window.location.href = "department.html";
        });
}
