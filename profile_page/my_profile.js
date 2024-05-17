
//to  get user
function get_user() {
	let user_Div = document.querySelector('.user2_container');
    // Retrieve the value from sessionStorage for a specific key
    let user_value = sessionStorage.getItem('user'); 
    user_Div.textContent = user_value;
}

 //to get previous score 
function previous_Score() {
	// Get the div with the class 'prev2_container'
    let previous = document.querySelector('.prev2_container');
    let score_value_previous = sessionStorage.getItem('score'); 
    // Set the retrieved value as the text content of the user2_container div
    previous.textContent = score_value_previous;
	
	
	//for time
	let previous_time = document.querySelector('.time_prev');
    let time_value_previous = sessionStorage.getItem('time'); 
    // Set the retrieved value as the text content of the user2_container div
    previous_time.textContent = time_value_previous;
} 



//to get high score
function high_Score() {
	//goes for each key looking for user 
    for (i =0; i< localStorage.length; i++) {
		let key = localStorage.key(i);
	    let jsonString = localStorage.getItem(key);
	    let jsonObject = JSON.parse(jsonString);
	    let user_valueD = sessionStorage.getItem('user');
	    //when user is obtained
	    if (jsonObject['user'] == user_valueD){
			let score = parseInt(sessionStorage.getItem('score')); // Convert score to a number
            let personalScore = parseInt(jsonObject['personal_score']); // Convert personal_score to a number
			let time_val = sessionStorage.getItem('time'); 
			
            if (score > personalScore) {
				jsonObject['personal_score'] = score;
                let highestScore = document.querySelector('.hscore2_container');
                highestScore.textContent = jsonObject['personal_score'];
                let updatedJsonString = JSON.stringify(jsonObject);
                localStorage.setItem(key, updatedJsonString);
				
				jsonObject['personal_time'] = time_val;
				let previous_time = document.querySelector('.time_best');
                previous_time.textContent = jsonObject['personal_time'];
				let updatedJsonString2 = JSON.stringify(jsonObject);
                localStorage.setItem(key, updatedJsonString2);
				
            }else {
			    let highestScore = document.querySelector('.hscore2_container');
                highestScore.textContent = jsonObject['personal_score'];
				
				let previous_time = document.querySelector('.time_best');
                previous_time.textContent = jsonObject['personal_time'];
				
				
				
		    }
	    }
    }
} 

get_user();
previous_Score();
high_Score();
			
