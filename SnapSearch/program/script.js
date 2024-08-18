"use strict";

document.getElementById('search').addEventListener('input', function() {
    let query = this.value.trim();

    if (query.length > 0) {
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                let results = data.query.search.slice(0, 10); // only the first 8 results
                let resultsContainer = document.getElementById('results');
                resultsContainer.innerHTML = '';

                results.forEach(result => {
                    let title = result.title;
                    let snippet = result.snippet;
                    let link = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

                    let resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `
                        <a href="${link}" target="_blank">${title}</a>
                        <div class="result-snippet">${snippet}...</div>
                    `;

                    resultsContainer.appendChild(resultItem);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        document.getElementById('results').innerHTML = ''; //
    }
});
