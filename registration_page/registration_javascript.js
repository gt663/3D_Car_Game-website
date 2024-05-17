// main function called ......
function getInformation() {
    
	//object containinng functions and all..........
	let game_users = {
		// getting the username and password from user and setting validate=true ........
	    username : document.getElementById("forms").username.value,
	    pass_word : document.getElementById("forms").passwords.value,
	    validate : true,
		
		// functions for the different messages to output for the validationss.......
	    noUsernameIn: function() {
	        var headerElement2 = document.getElementById('header2');
            headerElement2.textContent = 'Please enter a username';
        },          
        
	    noPasswordIn: function() {
	        var headerElement3 = document.getElementById('header3');
            headerElement3.textContent = 'Please enter a password';	
        },

        username_Length_Bad: function() {
	        var headerElement2 = document.getElementById('header2');
            headerElement2.textContent = 'username must be 6 characters';
        },

        password_Lenght_Bad: function() {
	        var headerElement3 = document.getElementById('header3');
            headerElement3.textContent = 'Password must be 8 characters';	
        },
		
        username_Start_alphabet: function() {
	        var headerElement2 = document.getElementById('header2');
            headerElement2.textContent = 'username must start with an alphabet';
        }, 		

        username_impossible: function(){
	        var headerElement2 = document.getElementById('header2');
            headerElement2.textContent = 'This user already exists';
        },
		
		// function for validation of special characters in the username...... 
        noSpecial_Character: function(input) {
            var pattern = /^[a-zA-Z0-9]+$/;
    
            // Test if the input string matches the pattern.........
            validate = pattern.test(input);
	        if (validate == false){
		        game_users.mssg_Special_character();
	        }
	        return validate;
        },
		
		//used in above function for the mssg...........
	    mssg_Special_character: function(){
	        var headerElement2 = document.getElementById('header2');
            headerElement2.textContent = 'use only letters and numbers';
        },

		// for validation of special characters in the password.......  
        noSpecial_Character_ForPassword: function(input){
            // Regular expression to match only letters and numbers.........
            var pattern = /^[a-zA-Z0-9]+$/;
   
            validate = pattern.test(input);
	        if (validate == false){
		        game_users.mssg_Special_character_password();
	        }
	        return validate;
        },
		
		//used in above function for the mssg........
	    mssg_Special_character_password: function(){
	        var headerElement3 = document.getElementById('header3');
            headerElement3.textContent = 'use only letters and numbers';
        },
		
		account_Not_Found: function() {
			var headerElement2 = document.getElementById('header2');
            headerElement2.textContent = 'account not found';
            var headerElement3 = document.getElementById('header3');
            headerElement3.textContent = 'try changing username or password';					
        }
		
		
	};


    /////// program starts below and calls item from above object .........
	
	//validation part for the correct input of the username ..........
	if (game_users.username =="") {
		game_users.noUsernameIn();
		game_users.validate = false;	 
    }else if (game_users.username.length <= 5 || game_users.username.length >6){
		game_users.username_Length_Bad();
		game_users.validate = false;
	}else if (!/^[a-zA-Z]/.test(game_users.username)){
		game_users.username_Start_alphabet();
		game_users.validate = false;
	}else {
		game_users.validate = game_users.noSpecial_Character(game_users.username);
		if (game_users.validate == true){
			 var headerElement2 = document.getElementById('header2');
             headerElement2.textContent = '';
		}
	}
	
	//validation part for the correct input of the password.......
	if (game_users.pass_word =="") {
		game_users.noPasswordIn();
		game_users.validate = false;       		
	}else if (game_users.pass_word.length <= 7 || game_users.pass_word.length >8){
		game_users.password_Lenght_Bad();
		game_users.validate = false;
	}else{
		if (game_users.validate == true){
			game_users.validate = game_users.noSpecial_Character_ForPassword(game_users.pass_word);
		    if (game_users.validate == true){
			     var headerElement3 = document.getElementById('header3');
                 headerElement3.textContent = '';
		    }
		}
	}
	
	//below code is defined for either sigup or login attemps..........................................
    //sigup here....
	if (document.title === 'Signup Form'){
		
		//when validate is over to check username existence compared to other username in local storage..
	    if (game_users.validate == true){
			
			// fetching other user data such as age and country........
			let my_country = document.getElementById('Select_country');
            let country = my_country.value;
            console.log(country);
		    let my_age = document.getElementById('Select_age');
            let age = my_age.value;
            console.log(age);
			
			 // putting user whole credentials in jason format....
		    let credentials = {user: game_users.username, pass: game_users.pass_word, Country: country, Age: age, personal_score: '0', personal_time: '0'};
		    let credentials_str = JSON.stringify(credentials);
			
		    // Retrieving keys and values for comparison with credentials.first...... 
		    let bool = true; 
            for (var i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i);
                let value = localStorage.getItem(key);
			    let value_As_Object = JSON.parse(value);
			
			    if (value_As_Object && value_As_Object.user === credentials.user) {
				    bool = false;
				    game_users.username_impossible()
			    }
            }
            if (bool == true){	
		        localStorage.setItem("player" + (localStorage.length +1), credentials_str);
				sessionStorage.setItem('user', game_users.username);
			    window.location.href = '../main_page/main_page.html';
		    }		
	    }
		
	//login here...................	
	} else{
		//when validate is over to check username existence compared to other username in local storage..
	    if (game_users.validate == true){
		    // putting our credentials in jason format....
		    let credentials = {user: game_users.username, pass: game_users.pass_word};
		
		    // Retrieving keys and values for comparison with credentials.first...... 
		    let bool = false; 
            for (var i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i);
                let value = localStorage.getItem(key);
			    let value_As_Object = JSON.parse(value);
			
			    if ((value_As_Object && value_As_Object.user === credentials.user) && (value_As_Object && value_As_Object.pass === credentials.pass)) {
				    bool = true;
			    }
            }
            if (bool == true){	
			    window.location.href = '../main_page/main_page.html';
				sessionStorage.setItem('user', game_users.username);
		    }
            if (bool == false){
				game_users.account_Not_Found();
				
			}			
	    }
	}	
}
 
