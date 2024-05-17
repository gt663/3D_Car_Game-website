class Initialisation_3d {
	
	// constructor objects
	constructor(){
		this.scene = null;
		this.camera = null;
 		this.renderer = null;
       	this.car = null;
		this.road = null;
		this.road_Border = null;
		this.moveForward = false;
		this.moveleft = false;
		this.moveright = false;
		this.movedown = false;
		this.clutch = false;
		this.gear1 = false;
		this.gear2 = false;
		this.gear3 = false;
		// for obstacles
		this.lava_obstacle = []; 
		this.cube = null;
		this.sphere = null;
		this.lava_moving_obstacle = [];
		
		//for coins and score
		this.coins_amount = [];
		this.circle = null;
		this.score = 0;
		
		//for timer div
		this.counterElement = document.createElement('div');
        this.counterElement.style.color = 'white';
		this.counterElement.style.position = 'absolute';
        this.counterElement.style.left = '730px';
        this.counterElement.style.top = '120px'; 
        this.counterElement.style.fontSize = '50px';
        document.body.appendChild(this.counterElement);
		this.timing = "";
		
		
		//for scoreing div
		this.scoreElement = document.createElement('div');
        this.scoreElement.style.color = 'white';
		this.scoreElement.style.position = 'absolute';
        this.scoreElement.style.left = '700px';
        this.scoreElement.style.top = '60px'; 
        this.scoreElement.style.fontSize = '50px';
        document.body.appendChild(this.scoreElement);
		
		//for the timer seconds, minutes... 
		this.second = 0;
       	this.minute = 0;
	}
	
	
	//timer function 
	timer = () => {
		this.second++;
		if (this.second === 60) {
			this.minute++;
            this.second = 0;
		}	
		// Update the counter
        this.counterElement.textContent = this.minute + ':' + this.second;
    }
    
	//displays score live
	score_display() {
		this.scoreElement.textContent = 'score ' + this.score;
	}
	
	
	
	// Method specific to display a cube obstacle
    displayrectangle() {
		 // Generate random x and z values within specified ranges
        const x = Math.random() * 20 - 10; // Random value between -10 and 10
        const z = Math.random() * -3900 - 100; // Random value between -100 and -990
		
		// Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(5, 6, 6);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
        
        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, 0, z);
		
		//push into the array obstacle to be used afterwards
		this.lava_obstacle.push(this.cube);
			
    }    
    
	//displays coins
	displayCoins(){
		 // Generate random x and z values within specified ranges
        const x = Math.random() * 20 - 10; // Random value between -10 and 10
        const z = Math.random() * (-15000 - (-100)) - 100; // Random value between -100 and -15000
		
		// Create a circle geometry
        const radius = 0.80; 
        const segments = 64; // Number of segments to form the circle 
        const circleGeometry = new THREE.CircleGeometry(radius, segments);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 'yellow'}); 
        // Create a mesh from the geometry and material
        this.coins = new THREE.Mesh(circleGeometry, circleMaterial);
        // Optionally, position the circle
        this.coins.position.set(x, 0.50, z); // Set the position in 3D space
		this.coins.rotation.y = 0; // Initial rotation on Y-axis
        // Add the circle to the scene
        this.scene.add(this.coins); // 'scene' is your THREE.Scene instance
		this.coins_amount.push(this.coins)
	}
	
	// Method specific to display a moving obstacle
    display_moving_rectangle() {
		 // Generate random x and z values within specified ranges
        const x = Math.random() * 26 - 13;
        const z = Math.random() * (-6000 - (-4000)) - 4000;

		// Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(5, 6, 6);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'orange' });
        
        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, 0, z);
		this.lava_moving_obstacle.push(this.cube);
			
    }   

	// displays a void on the road in the game 
	 display_black_space() {
		 // Generate random x and z values within specified ranges
        const x = Math.random() * 26 - 13;
        const z = Math.random() * (-11000 - (-4000)) - 4000;
		// Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(4, 0, 4);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
        
        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, 0, z);
		
		this.lava_obstacle.push(this.cube);
			
    }    
	
	//displays emrauld-like structure that serves as obstacles 
	display_emrauld() {
		 // Generate random x and z values within specified ranges
        const x = Math.random() * 26 - 13;
		const z = Math.random() * (15000 - 11000) - 15000;
		//shere geometry 
		const sphereGeometry = new THREE.SphereGeometry(1, 3, 3);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(this.sphere);
		this.sphere.position.set(x, 0, z);
		this.lava_obstacle.push(this.sphere);
	}
	
	//displays the finish line to end the game 
	 display_finish_line() {
		// Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(10, 1, 13);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });
        
        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(0, 0.5, -15000);
		
		this.lava_obstacle.push(this.cube);
			
    }    
	
	
	// basic feautures of the game which will be same for all level and everything...................................
	basic_features(){
		// Creates a scene same as canvas expects that its in 3D
        this.scene = new THREE.Scene();

        // Create a camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);

        // Create a renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas'), antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
  
        // Create a car geometry and material
        const geometry_car = new THREE.BoxGeometry(1, 0.5, 2);
        const material_car = new THREE.MeshBasicMaterial({ color: 'blue' });
        this.car = new THREE.Mesh(geometry_car, material_car);
        this.scene.add(this.car);
		// Position the car
        this.car.position.y = -0.25;
		this.car.position.z = -14000;
		
		
  
        // creates a road geometry 
        const geometry_road = new THREE.BoxGeometry(30, 0.1, 30000);
        const material_road = new THREE.MeshBasicMaterial({ color: '#808080' });
        this.road = new THREE.Mesh(geometry_road, material_road);
        this.scene.add(this.road);
        this.road.position.y = -0.25;
        this.road.position.z = -50;
		
		//.............................below are for loop to display obstacles and coins a number of times....
		for (let i = 0; i < 60; i++) {
			this.displayrectangle(); 
		}
		
		for (let i = 0; i < 300; i++) {
			this.displayCoins();
		}
		
		for (let i = 0; i < 60; i++) {
			this.display_moving_rectangle(); 
		}
		
		for (let i = 0; i < 200; i++) {
			this.display_black_space(); 
		}
		
		for (let i = 0; i < 300; i++) {
			this.display_emrauld(); 
		}
		
		this.display_finish_line();
		
		// Add event listeners for arrow keys
        document.addEventListener('keydown', this.onKey_pressed);
        document.addEventListener('keyup', this.onKey_unpressed);
		
		
		this.timer(); 
        // Render the scene
        this.animation();
	}
	
	// animation function which calls itself recursively to show the car movement animation...............
    animation = () => {
        requestAnimationFrame(this.animation);
		
        // resetes car position if car goes outside road		
        const carbox = new THREE.Box3().setFromObject(this.car);
        const roadbox = new THREE.Box3().setFromObject(this.road);

        if (!carbox.intersectsBox(roadbox)) {
			this.car.position.set(0, -0.25, 50);
			this.car.rotation.set(0, 0, 0);
			sessionStorage.setItem('score', this.score);
			this.timing = this.minute + ':' + this.second;
			sessionStorage.setItem('time', this.timing);
			this.score = 0;
			for (let i = 0; i < this.coins_amount.length; i++) {
				this.circle = this.coins_amount[i];
				this.circle.position.y = 0.5;
			}			
        }
		
		
		//score coin gain detections.................
        for (let i = 0; i < this.coins_amount.length; i++) {
			this.circle = this.coins_amount[i];
            const carBox = new THREE.Box3().setFromObject(this.car);
            const coinBox = new THREE.Box3().setFromObject(this.circle);
			if (carBox.intersectsBox(coinBox)) {
				// Reset car's position to the original position (0, 0.25, 0)
                this.circle.position.y = -6;
				this.score += 1; 
                break; // Exit the loop after resetting the car's position
            }
        }
		
		this.score_display();
		
		
		//collision detections for fix lava rectangles obstacles.................
        for (let i = 0; i < this.lava_obstacle.length; i++) {
			const rectangle = this.lava_obstacle[i];
            const carBox = new THREE.Box3().setFromObject(this.car);
            const obstacleBox = new THREE.Box3().setFromObject(rectangle);
			if (carBox.intersectsBox(obstacleBox)) {
				// Reset car's position to the original position (0, 0.25, 0)
                this.car.position.set(0, -0.25, 50);
				for (let i = 0; i < this.coins_amount.length; i++) {
					this.circle = this.coins_amount[i];
				    this.circle.position.y = 0.5;
			    }
				sessionStorage.setItem('score', this.score);
				this.timing = this.minute + ':' + this.second;
				sessionStorage.setItem('time', this.timing);
                this.score = 0;				
                break; // Exit the loop after resetting the car's position
            }
        }
		
		//collision detections for moving lava rectangles.................
        for (let i = 0; i < this.lava_moving_obstacle.length; i++) {
			const rectangle = this.lava_moving_obstacle[i];
            const carBox = new THREE.Box3().setFromObject(this.car);
            const obstacleBox = new THREE.Box3().setFromObject(rectangle);
			if (carBox.intersectsBox(obstacleBox)) {
				// Reset car's position to the original position (0, 0.25, 0)
                this.car.position.set(0, -0.25, 50);
				for (let i = 0; i < this.coins_amount.length; i++) {
					this.circle = this.coins_amount[i];
				    this.circle.position.y = 0.5;
			    }
				sessionStorage.setItem('score', this.score);
				this.timing = this.minute + ':' + this.second;
				sessionStorage.setItem('time', this.timing);
                this.score = 0;				
                break; // Exit the loop after resetting the car's position
            }
        }
		
		 // Update rotation of the coins
        for (let i = 0; i < this.coins_amount.length; i++) {
			const coin = this.coins_amount[i];
            coin.rotation.y += 0.50; // Adjust rotation speed as needed
        }
		
		 // Update movement of the rectangular lava that are moving
        for (let i = 0; i < this.lava_moving_obstacle.length; i++) {
			const obst = this.lava_moving_obstacle[i];
            // Initialize or ensure velocity exists for each object
            if (!obst.velocityY) {
				const velo = Math.random() * (0.6 - 0.1) + 0.1;
				// Set initial velocity for each object
                obst.velocityY = velo; // You can change the speed if needed
            }

            // Move the object along the Y-axis
            obst.position.y += obst.velocityY;

            // Check if the object reaches the upper or lower limits
            if (obst.position.y >= 40 || obst.position.y <= 0) {
               // Reverse the direction when the object reaches the limits
               obst.velocityY *= -1;
            }
        }
		
		
		// Update car movement/rendering here
        if (this.moveForward) {
			// Move the car forward
            this.car.position.z -= 0.3; // Adjust the speed as needed
			this.car.rotation.set(0, 0, 0);
			if (this.clutch) {
				if (this.gear1){
					this.car.position.z -= 0.8; // depending if the c key is pressed is the gears
				}
				if (this.gear2){
					this.car.position.z -= 1.0;
				}
				if (this.gear3){
					this.car.position.z -= 1.4;
				}
			}
        }
		//move backwards
		if (this.movedown) {
			this.car.position.z += +0.3;
			this.car.rotation.set(0, 0, 0);
		}
        if (this.moveleft) {
            // Move the car forward
            this.car.position.x += -0.2; // Adjust the speed as needed
			this.car.rotation.y = 0.5; 
			this.car.position.z -= 0.1;
			
        }
        if (this.moveright) {
            // Move the car forward
            this.car.position.x += 0.2; // Adjust the speed as needed
			this.car.rotation.y = -0.5;
			this.car.position.z -= 0.1;
	    }
		
        // Update car movement/rendering here
        this.camera.position.z = this.car.position.z + 10; 

        this.renderer.render(this.scene, this.camera);	
		
    }
	
	// event when a keybord key is pressed.........................
	onKey_pressed = (event) => {
		switch (event.key) {
			case 'ArrowUp':
			  // Start moving the car forward when ArrowUp is pressed
              this.moveForward = true;
              break;
			case 'ArrowDown':
			  this.movedown = true;
			  break;
            case 'ArrowLeft':
	          this.moveleft = true;
              // Turn the car left 
              break;
            case 'ArrowRight':
	        this.moveright = true;
            // Turn the car right (
            break;
			case 'c':
			this.clutch = true;
			break;
			case '1':
			this.gear1 = true;
			break;
			case '2':
			this.gear2 = true;
			break;
			case '3':
			this.gear3 = true;
			break;
		}
	}
	
	// event where a keybord key is released.....................
	onKey_unpressed = (event) => {
		if (event.key === 'ArrowUp') {
			// Stop moving the car when ArrowUp is released
            this.moveForward = false;	
        }else if (event.key === 'ArrowDown'){
            this.movedown = false;			
		}else if (event.key === 'ArrowLeft'){
	        this.moveleft = false;
        }else if (event.key === 'ArrowRight'){
	        this.moveright = false;
        }else if (event.key === 'c'){
			this.clutch = false;
		}else if (event.key === '1'){
			this.gear1 = false;
		}else if (event.key === '2'){
			this.gear2 = false;
		}else if (event.key === '3'){
			this.gear3 = false;
		}
	}
}


// the class below inherits the one from above and adds in the graphics and design for front end appeal

class Decoration extends Initialisation_3d {
    constructor() {
        // Call the super() method to invoke the parent class constructor
        super();
    }
	
    //.............................. Define the shapes for the tower......................................
    horizontal_1 = (x, y, z) => {
        // Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(90, 6, 6);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });

        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, y, z);
    };

    horizontal_2 = (x, y, z) => {
        // Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(70, 6, 6);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });

        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, y, z);
    };

    vertical_left = (x, y, z) => {
        // Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(5, 90, 5);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });

        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, y, z);
    };

    vertical_right = (x, y, z) => {
        // Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(5, 90, 5);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });

        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, y, z);
    };


    // this function calls the above ones making it simpler to use 
    chinese_tower(position) {
        // Call tower methods
        this.horizontal_1(1, 50, position);
        this.horizontal_2(1, 40, position);
        this.vertical_left(20, 0, position);
        this.vertical_right(-20, 0, position);
    }

    
	//this functions displays the buldings around the road 
     display_buildings() {
		 // Generate random x and z values within specified ranges
        let x;
        if (Math.random() < 0.5) {
			x = Math.random() * (1000 - 50) + 50; // Random value between 50 and 1000
        } else {
			x = Math.random() * (1000 - 50) - 1000; // Random value between -1000 and -50
        }

        const z = Math.random() * (20000 - 10) - 20000; // Random value between -20000 and -10
		// Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(40, 600, 6);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'cyan' });
        
        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, 0, z);
			
    }    
	
    //displays building blocks	
	display_buildings_blocks() {
		 // Generate random x and z values within specified ranges
        let x;
        if (Math.random() < 0.5) {
			x = Math.random() * (1000 - 50) + 50; // Random value between 50 and 1000
        } else {
			x = Math.random() * (1000 - 50) - 1000; // Random value between -1000 and -50
        }

      const z = Math.random() * (20000 - 10) - 20000; // Random value between -20000 and -10

	   const y = Math.random() * 400; // Random value between 0 and 400
		// Create cube geometry and material
        const cubeGeometry = new THREE.BoxGeometry(40, 40, 6);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'purple' });
        
        // Create a cube mesh and add it to the scene
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);
        // Set cube's position
        this.cube.position.set(x, y, z);
    }    
	
    	

    // Override the basic_features method if needed
    basic_features() {
        // Call the parent class method using super to retain the functionalities from the Initialisation_3d class
        super.basic_features();
        
		this.chinese_tower(-20);
		let new_location = 0;
		for (let i = 0; i < 75; i++) {
			let initial_loc = -200;
			new_location = initial_loc + new_location;
			this.chinese_tower(new_location);
		} 
		for (let i = 0; i < 2000; i++) {
			this.display_buildings(); 
		}
		
		for (let i = 0; i < 2000; i++) {
			this.display_buildings_blocks(); 
		}
		
    }
}


function gamer() {
    let game = new Decoration();
    game.basic_features(); // This will execute the basic_features method from the Decoration class
    setInterval(game.timer, 1000);
}

gamer();




	
	
	

  
		
		
	
	
	

    
  




