document.addEventListener('DOMContentLoaded', function() {
    loadEventList();
});

function loadEventList() {
    const apiKey = '058a471fe744ce27d5c086106c4f3951';
    fetch('https://v3.football.api-sports.io/fixtures?season=2023&league=39', {
        method: 'GET',
        headers: {
            'x-apisports-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const events = data.response;
        const eventList = document.getElementById('events');
        eventList.innerHTML = ''; 

        events.slice(0, 10).forEach(event => { 
            const listItem = document.createElement('li');
            listItem.style.padding = '10px';
            listItem.style.borderBottom = '1px solid #ccc';
            listItem.innerHTML = `
                <strong>${event.teams.home.name} vs ${event.teams.away.name}</strong><br>
                ${new Date(event.fixture.date).toLocaleString()}<br>
                ${event.league.name}
            `;
            eventList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching events:', error);
    });
}
