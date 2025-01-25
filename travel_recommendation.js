// Fetch data from travel_recommendation_api.json
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        window.travelData = data; 

        // Get references to HTML elements
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const clearButton = document.getElementById('clear-button');
        const contentDiv = document.getElementById('content');

        // Search button event listener
        searchButton.addEventListener('click', () => {
            const keyword = searchInput.value.toLowerCase();
            const results = [];

            // Filter data based on keyword
            for (const category in travelData) {
                if (travelData.hasOwnProperty(category)) {
                    travelData[category].forEach(item => {
                        if (
                            item.name.toLowerCase().includes(keyword) ||
                            item.description.toLowerCase().includes(keyword) 
                        ) {
                            results.push(item);
                        }
                    });
                }
            }

            // Display results
            contentDiv.innerHTML = ''; 
            if (results.length > 0) {
                results.forEach(result => {
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result-item');
                    resultDiv.innerHTML = `
                        <h2>${result.name}</h2>
                        <img src="${result.imageUrl}" alt="${result.name}">
                        <p>${result.description}</p>
                    `;
                    contentDiv.appendChild(resultDiv);
                });
            } else {
                contentDiv.innerHTML = '<p>No results found.</p>';
            }
        });

        // Clear button event listener
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            contentDiv.innerHTML = ''; 
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });