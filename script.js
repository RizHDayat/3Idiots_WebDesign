document.addEventListener("DOMContentLoaded", () => {
    const recipes = {
        'tofu': 'Tofu Stir-Fry',
        'canape': 'Canape',
        'rendang': 'Rendang Daging Sapi',
        'coklat-cake': 'Chocolate Cake',
        'mojito': 'Mojito',
        'keripik': 'Keripik Singkong'
    };

    function switchContent(target) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.add('hidden'));
        document.getElementById(target).classList.remove('hidden');
        document.querySelector(`#${target}`).scrollIntoView({
            behavior: 'smooth'
        });
    }

    function displaySuggestions(query) {
        const suggestionsContainer = document.getElementById("suggestions");
        suggestionsContainer.innerHTML = "";
        let matchedSuggestions = 0;

        for (const key in recipes) {
            if (recipes[key].toLowerCase().includes(query)) {
                const suggestionDiv = document.createElement("div");
                suggestionDiv.textContent = recipes[key];
                suggestionDiv.onclick = () => {
                    document.getElementById("search-input").value = recipes[key];
                    suggestionsContainer.classList.add('hidden');
                    switchContent(key);
                };
                suggestionsContainer.appendChild(suggestionDiv);
                matchedSuggestions++;
            }
        }

        suggestionsContainer.classList.toggle('hidden', matchedSuggestions === 0);
    }

    function searchRecipe() {
        const query = document.getElementById("search-input").value.toLowerCase();
        displaySuggestions(query);

        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.add('hidden'));

        let matched = false;
        for (const key in recipes) {
            if (recipes[key].toLowerCase().includes(query)) {
                document.getElementById(key).classList.remove('hidden');
                matched = true;
                document.querySelector(`#${key}`).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        if (!matched) {
            alert("Tidak ditemukan resep yang cocok dengan kata kunci: " + query);
        }
    }

    const inputElement = document.getElementById("search-input");

    if (inputElement) {
        inputElement.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                searchRecipe();
            }
        });

        inputElement.addEventListener("input", function() {
            const query = this.value.toLowerCase();
            displaySuggestions(query);
        });

        document.getElementById("search-bar").querySelector("button").addEventListener("click", searchRecipe);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            switchContent(targetId.substring(1));
        });
    });
});
