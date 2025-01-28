let data = [];

// Fetch data from the server
fetch(process.env.API_URL)
  .then(response => response.json())
  .then(fetchedData => {
    data = fetchedData;
    
    if (data.length > 0) {
      // Display the first record when the page loads
      displayRecord(data[0]);
    }
  })
  .catch(error => console.error('Error fetching data:', error));

function displayRecord(record) {
  // Update the card title
  document.getElementById('cardTitle').textContent = record.name;

  // Parse the JSON facts and update the card
  const facts = JSON.parse(record.facts);
  const factsList = document.getElementById('cardFacts');
  factsList.innerHTML = ''; // Clear previous facts
  facts.forEach(fact => {
    const li = document.createElement('li');
    li.textContent = fact;
    factsList.appendChild(li);
  });
}

function changeContent() {
  if (data.length === 0) return;

  // Randomly select a character
  const randomIndex = Math.floor(Math.random() * data.length);
  const selected = data[randomIndex];
  displayRecord(selected);
}