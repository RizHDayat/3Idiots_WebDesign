function switchContent(target) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');
}

function searchRecipe() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const sections = document.querySelectorAll('.section');
    let found = false;

    sections.forEach(section => {
        if (section.id === 'home') {
            section.classList.add('hidden');
        } else {
            const foodItems = section.querySelectorAll('.food-grid .food-item');
            let sectionFound = false;

            foodItems.forEach(item => {
                const title = item.querySelector('a').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    item.style.display = 'block';
                    sectionFound = true;
                    found = true;
                } else {
                    item.style.display = 'none';
                }
            });

            if (sectionFound) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        }
    });

    if (!found) {
        alert('Tidak ada resep yang cocok dengan pencarian Anda.');
    }
}

document.getElementById("search-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchRecipe();
    }
});

document.getElementById("search-bar").querySelector("button").addEventListener("click", searchRecipe);

