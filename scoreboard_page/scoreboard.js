

function getting_bests() {
    let players = [];
    
    // Extract player data from local storage
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let jsonString = localStorage.getItem(key);
        let player = JSON.parse(jsonString);
        
        players.push(player);
    }

    // Sort players based on their personal_score and personal_time (assuming they are numbers)
    players.sort((a, b) => {
        if (b.personal_score !== a.personal_score) {
            return b.personal_score - a.personal_score;
        } else {
            // If personal_scores are equal, compare personal_times
            let timeA = convertTimeToSeconds(a.personal_time);
            let timeB = convertTimeToSeconds(b.personal_time);
            return timeA - timeB;
        }
    });

    // Get the element to display the sorted player data
    let playerDataElement = document.getElementById('playerData');

    // Display the sorted list of players in the HTML element
    let output = '<h2></h2>';
    output += '<ul>';
    for (let player of players) {
        output += `<li>${player.user}----------Score: ${player.personal_score}----------Time: ${player.personal_time}</li>`;
    }
    output += '</ul>';
    
    // Set the content of the playerDataElement with the sorted data
    playerDataElement.innerHTML = output;
}

// Helper function to convert time in 'mm:ss' format to seconds
function convertTimeToSeconds(timeString) {
    let [minutes, seconds] = timeString.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds);
}

// Call the function to display sorted player data
getting_bests();
