// Check if we are on the level1.html page
if (window.location.pathname.includes('level1.html')) {
    // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a cloud texture to simulate polluted clouds in the sky
    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load('https://www.google.com/imgres?q=clouds&imgurl=https%3A%2F%2Feduauraapublic.s3.ap-south-1.amazonaws.com%2Fwebassets%2Fimages%2Fblogs%2Fwhy-are-clouds-white.jpg&imgrefurl=https%3A%2F%2Fwww.eduauraa.com%2Fblog%2Fwhy-are-clouds-white&docid=PfFFStuXHSm_BM&tbnid=YoIXLvNUV2vQkM&vet=12ahUKEwitv5Pr55WLAxV58LsIHYnOJxsQM3oECHMQAA..i&w=6000&h=2500&hcb=2&ved=2ahUKEwitv5Pr55WLAxV58LsIHYnOJxsQM3oECHMQAA'); // Replace with a cloud texture URL
    cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
    cloudTexture.repeat.set(5, 5); // Repeat the cloud texture to cover the sky

    // Set the background to the cloud texture
    scene.background = new THREE.Color(0x87CEEB);;

    // Ground plane with park-like grass texture
    const grassTexture = textureLoader.load('https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdldCUyMHNhbmQlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D'); // Example, you can replace it with another park ground texture URL
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(5, 5); // Repeat the texture to cover the ground


    // Function to create a continuous fence around the garden
    function createContinuousFence() {
        const postHeight = 5; // Height of fence posts
        const postRadius = 0.2; // Radius of the posts
        const panelWidth = 2; // Width of each fence panel
        const panelHeight = 1; // Height of each fence panel
        const panelDepth = 0.1; // Thickness of the fence panel

        const fencePostGeometry = new THREE.CylinderGeometry(postRadius, postRadius, postHeight, 8); // Post geometry
        const fencePostMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Post color (brown)

        const fencePanelGeometry = new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth); // Panel geometry
        const fencePanelMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Panel color (brown)

        const fencePositions = [
            // Top side horizontal (X-axis), moving from -50 to 50
            { x: -50, z: 50 }, { x: -48, z: 50 }, { x: -46, z: 50 }, { x: -44, z: 50 }, { x: -42, z: 50 },
            { x: -40, z: 50 }, { x: -38, z: 50 }, { x: -36, z: 50 }, { x: -34, z: 50 }, { x: -32, z: 50 },
            { x: -30, z: 50 }, { x: -28, z: 50 }, { x: -26, z: 50 }, { x: -24, z: 50 }, { x: -22, z: 50 },
            { x: -20, z: 50 }, { x: -18, z: 50 }, { x: -16, z: 50 }, { x: -14, z: 50 }, { x: -12, z: 50 },
            { x: -10, z: 50 }, { x: -8, z: 50 }, { x: -6, z: 50 }, { x: -4, z: 50 }, { x: -2, z: 50 },
            { x: 0, z: 50 }, { x: 2, z: 50 }, { x: 4, z: 50 }, { x: 6, z: 50 }, { x: 8, z: 50 },
            { x: 10, z: 50 }, { x: 12, z: 50 }, { x: 14, z: 50 }, { x: 16, z: 50 }, { x: 18, z: 50 },
            { x: 20, z: 50 }, { x: 22, z: 50 }, { x: 24, z: 50 }, { x: 26, z: 50 }, { x: 28, z: 50 },
            { x: 30, z: 50 }, { x: 32, z: 50 }, { x: 34, z: 50 }, { x: 36, z: 50 }, { x: 38, z: 50 },
            { x: 40, z: 50 }, { x: 42, z: 50 }, { x: 44, z: 50 }, { x: 46, z: 50 }, { x: 48, z: 50 }, { x: 50, z: 50 },
            
            // Right side vertical (Z-axis), moving from 50 to -50
            { x: 50, z: 48 }, { x: 50, z: 46 }, { x: 50, z: 44 }, { x: 50, z: 42 }, { x: 50, z: 40 },
            { x: 50, z: 38 }, { x: 50, z: 36 }, { x: 50, z: 34 }, { x: 50, z: 32 }, { x: 50, z: 30 },
            { x: 50, z: 28 }, { x: 50, z: 26 }, { x: 50, z: 24 }, { x: 50, z: 22 }, { x: 50, z: 20 },
            { x: 50, z: 18 }, { x: 50, z: 16 }, { x: 50, z: 14 }, { x: 50, z: 12 }, { x: 50, z: 10 },
            { x: 50, z: 8 }, { x: 50, z: 6 }, { x: 50, z: 4 }, { x: 50, z: 2 }, { x: 50, z: 0 },
            { x: 50, z: -2 }, { x: 50, z: -4 }, { x: 50, z: -6 }, { x: 50, z: -8 }, { x: 50, z: -10 },
            { x: 50, z: -12 }, { x: 50, z: -14 }, { x: 50, z: -16 }, { x: 50, z: -18 }, { x: 50, z: -20 },
            { x: 50, z: -22 }, { x: 50, z: -24 }, { x: 50, z: -26 }, { x: 50, z: -28 }, { x: 50, z: -30 },
            { x: 50, z: -32 }, { x: 50, z: -34 }, { x: 50, z: -36 }, { x: 50, z: -38 }, { x: 50, z: -40 },
            { x: 50, z: -42 }, { x: 50, z: -44 }, { x: 50, z: -46 }, { x: 50, z: -48 },
            
            // Bottom side horizontal (X-axis), moving from 50 to -50
            { x: 50, z: -50 }, { x: 48, z: -50 }, { x: 46, z: -50 }, { x: 44, z: -50 }, { x: 42, z: -50 },
            { x: 40, z: -50 }, { x: 38, z: -50 }, { x: 36, z: -50 }, { x: 34, z: -50 }, { x: 32, z: -50 },
            { x: 30, z: -50 }, { x: 28, z: -50 }, { x: 26, z: -50 }, { x: 24, z: -50 }, { x: 22, z: -50 },
            { x: 20, z: -50 }, { x: 18, z: -50 }, { x: 16, z: -50 }, { x: 14, z: -50 }, { x: 12, z: -50 },
            { x: 10, z: -50 }, { x: 8, z: -50 }, { x: 6, z: -50 }, { x: 4, z: -50 }, { x: 2, z: -50 },
            { x: 0, z: -50 }, { x: -2, z: -50 }, { x: -4, z: -50 }, { x: -6, z: -50 }, { x: -8, z: -50 },
            { x: -10, z: -50 }, { x: -12, z: -50 }, { x: -14, z: -50 }, { x: -16, z: -50 }, { x: -18, z: -50 },
            { x: -20, z: -50 }, { x: -22, z: -50 }, { x: -24, z: -50 }, { x: -26, z: -50 }, { x: -28, z: -50 },
            { x: -30, z: -50 }, { x: -32, z: -50 }, { x: -34, z: -50 }, { x: -36, z: -50 }, { x: -38, z: -50 },
            { x: -40, z: -50 }, { x: -42, z: -50 }, { x: -44, z: -50 }, { x: -46, z: -50 }, { x: -48, z: -50 },
            { x: -50, z: -50 },
            
            // Left side vertical (Z-axis), moving from -50 to 50
            { x: -50, z: -48 }, { x: -50, z: -46 }, { x: -50, z: -44 }, { x: -50, z: -42 }, { x: -50, z: -40 },
            { x: -50, z: -38 }, { x: -50, z: -36 }, { x: -50, z: -34 }, { x: -50, z: -32 }, { x: -50, z: -30 },
            { x: -50, z: -28 }, { x: -50, z: -26 }, { x: -50, z: -24 }, { x: -50, z: -22 }, { x: -50, z: -20 },
            { x: -50, z: -18 }, { x: -50, z: -16 }, { x: -50, z: -14 }, { x: -50, z: -12 }, { x: -50, z: -10 },
            { x: -50, z: -8 }, { x: -50, z: -6 }, { x: -50, z: -4 }, { x: -50, z: -2 }, { x: -50, z: 0 },
            { x: -50, z: 2 }, { x: -50, z: 4 }, { x: -50, z: 6 }, { x: -50, z: 8 }, { x: -50, z: 10 },
            { x: -50, z: 12 }, { x: -50, z: 14 }, { x: -50, z: 16 }, { x: -50, z: 18 }, { x: -50, z: 20 },
            { x: -50, z: 22 }, { x: -50, z: 24 }, { x: -50, z: 26 }, { x: -50, z: 28 }, { x: -50, z: 30 },
            { x: -50, z: 32 }, { x: -50, z: 34 }, { x: -50, z: 36 }, { x: -50, z: 38 }, { x: -50, z: 40 },
            { x: -50, z: 42 }, { x: -50, z: 44 }, { x: -50, z: 46 }, { x: -50, z: 48 },
        ];

        // Create fence posts at the positions
        fencePositions.forEach(pos => {
            const post = new THREE.Mesh(fencePostGeometry, fencePostMaterial);
            post.position.set(pos.x, postHeight / 2, pos.z); // Position posts vertically
            scene.add(post);
        });

        // Create fence panels between the posts
        for (let i = 0; i < fencePositions.length - 1; i++) {
            const panelMesh = new THREE.Mesh(fencePanelGeometry, fencePanelMaterial);
            const xMid = (fencePositions[i].x + fencePositions[i + 1].x) / 2;
            const zMid = (fencePositions[i].z + fencePositions[i + 1].z) / 2;
            
            panelMesh.position.set(xMid, panelHeight / 2, zMid);

            if (fencePositions[i].x === fencePositions[i + 1].x) {
                // Vertical fence panels (along the Z axis)
                panelMesh.rotation.y = Math.PI / 2; // Rotate vertically
            }

            scene.add(panelMesh);
        }
    }

    // Call the function to create the continuous fence
    createContinuousFence();



    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
        map: grassTexture, 
        emissive: new THREE.Color(0x006400), 
        emissiveIntensity: 0.2 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = - Math.PI / 2; // Rotate to make it flat
    scene.add(ground);

    // // Function to create a tree
    function alreadyExistingTree(x, z) {
      const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 8);
      const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.set(x, 2.5, z);

      const foliageGeometry = new THREE.SphereGeometry(3, 8, 8);
      const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.set(x, 7.5, z);

      scene.add(trunk);
      scene.add(foliage);
    }

    // Add trees to the garden
    alreadyExistingTree(0, 0);
    alreadyExistingTree(10, 15);
    alreadyExistingTree(-20, 25);
    alreadyExistingTree(30, -20);
    alreadyExistingTree(-15, -30);
    alreadyExistingTree(40, 40);
    alreadyExistingTree(50, 50);
    alreadyExistingTree(100, 10);
    alreadyExistingTree(30, 50);
    alreadyExistingTree(-10, 40);
    alreadyExistingTree(-40, 30);
    alreadyExistingTree(-60, 100);

    // Lighting for the scene
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Dim the light to create a more polluted effect
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);

    // Create the player (a simple sphere representing the player)
    const playerGeometry = new THREE.SphereGeometry(1, 32, 32);
    const playerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Red color for the player
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 1, 0); // Position the player above the ground
    scene.add(player);

    // Camera setup: Position the camera and make it follow the player
    camera.position.set(0, 5, 15); // Place the camera slightly above and behind the player
    camera.lookAt(player.position);

    // Movement variables
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let speed = 0.2;

    // Keyboard input handling
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' || event.key === 'w') moveForward = true;
        if (event.key === 'ArrowDown' || event.key === 's') moveBackward = true;
        if (event.key === 'ArrowLeft' || event.key === 'a') moveLeft = true;
        if (event.key === 'ArrowRight' || event.key === 'd') moveRight = true;
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowUp' || event.key === 'w') moveForward = false;
        if (event.key === 'ArrowDown' || event.key === 's') moveBackward = false;
        if (event.key === 'ArrowLeft' || event.key === 'a') moveLeft = false;
        if (event.key === 'ArrowRight' || event.key === 'd') moveRight = false;
    });

    // Update player movement based on keyboard input
    function updatePlayer() {
        if (moveForward) player.position.z -= speed;
        if (moveBackward) player.position.z += speed;
        if (moveLeft) player.position.x -= speed;
        if (moveRight) player.position.x += speed;

        // Camera follows the player
        camera.position.set(player.position.x, player.position.y + 5, player.position.z + 15);
        camera.lookAt(player.position);
    }



    // Initialize the number of trees planted and total trees goal
    let treesPlanted = 0;
    const totalTrees = 10; // Set the goal for the number of trees

    // Function to update the progress bar
    function updateProgress() {
        // Calculate the percentage based on trees planted
        const percentage = (treesPlanted / totalTrees) * 100;

        // Update the progress bar width
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = `${percentage}%`;

        // Change the progress bar color based on the percentage
        if (percentage <= 33) {
            progressBar.style.backgroundColor = 'rgb(239, 68, 68)'; // Red
        } else if (percentage <= 66) {
            progressBar.style.backgroundColor = 'rgb(234, 179, 8)'; // Yellow
        } else {
            progressBar.style.backgroundColor = 'rgb(43, 197, 94)'; // Green
        }
    }

    window.cmplt1 = document.getElementById('congos');
    fact1 = document.getElementById('level1fact');
    quiz1 = document.getElementById('level1quiz');
    corr1 = document.getElementById('correct');
    quiz1won = document.getElementById('quiz1cong');
    quiz1lost = document.querySelectorAll('incorrect');
    quiz1lostmsg = document.getElementById('quiz1boo');

    // // Function to simulate planting a tree (this can be triggered when the user plants a tree)
    function plantTree() {
        if (treesPlanted < totalTrees) {
            treesPlanted++;  // Increment the trees planted
            updateProgress(); // Update the progress bar
        } else {
            cmplt1.style.display = "flex" ;
        }
    }

    function level_1_fact() {
        sessionStorage.setItem("Level1Finished", "true");
        sessionStorage.setItem("OneLevel", "true");
        cmplt1.style.display = "none";
        fact1.style.display = "flex";
    }


    function level_1_quiz(){
        fact1.style.display = "none";
        quiz1.style.display = "flex" ;
    }


    function level_1_quiz_won(){
        sessionStorage.setItem("OneQuiz", true)
        quiz1.style.display = "none";
        quiz1won.style.display = "flex" ;
        updateCoins(coins + 10);
        setTimeout(function() {
            window.location.href = 'levels.html'; // Redirect after 2 seconds
        }, 1500); 
    }

    function level_1_quiz_lost(){
        quiz1.style.display = "none" ;
        quiz1lostmsg.style.display = "flex" ;
        setTimeout(function() {
            window.location.href = 'levels.html'; // Redirect after 2 seconds
        }, 3000); 
    }


    // Create a tree function
    function createTree(position) {
        const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
        const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.copy(position);
        trunk.position.y += 0.5; // Adjust trunk to sit on the ground

        const foliageGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const foliageMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.copy(position);
        foliage.position.y += 1; // Position foliage on top of the trunk

        const tree = new THREE.Group();
        tree.add(trunk);
        tree.add(foliage);
        scene.add(tree);
    }


    // Move sphere with arrow keys
    document.addEventListener('keydown', (event) => {
        const moveDistance = 0.5;
        switch (event.key) {
            case 'ArrowUp':
                player.position.z -= moveDistance;
                break;
            case 'ArrowDown':
                player.position.z += moveDistance;
                break;
            case 'ArrowLeft':
                player.position.x -= moveDistance;
                break;
            case 'ArrowRight':
                player.position.x += moveDistance;
                break;
        }
    });

    // Add button to plant trees
    const button = document.createElement('button');
    button.setAttribute('id', 'plantTreeButton');
    button.innerText = '🌱 Plant Tree';
    button.style.position = 'absolute';
    button.style.border = '3px solid black';
    button.style.borderRadius = "20px";
    button.style.backgroundColor = "rgba(0, 0, 0, 0.553);";
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.padding = '10px 10px';
    button.style.fontSize = '16px';
    button.style.height = "4rem";
    button.style.width = "10rem" ;
    button.style.fontSize = "1.3rem" ;
    button.style.fontWeight = "700";
    button.style.color = "black";
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        createTree(player.position.clone());
        plantTree();
        updateCoins(coins + 1); // Increment coins by 1
    });


    // Position camera and start rendering
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        updatePlayer();
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });   
}