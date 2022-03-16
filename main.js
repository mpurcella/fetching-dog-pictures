// FETCHING DATA USING ASYNC

async function getDogs() {
	// async function to get a list of dog breeds
	let response = await fetch('https://dog.ceo/api/breeds/list/all'); // we fetch the API data which returns a promise
	let data = await response.json(); // we then use .json() to resolve a second promise, returning the JS object
	createBreedList(data.message); // we pass the API data to our function, more specifically the data.message, which contains the list of breeds
}

getDogs();

function createBreedList(breedList) {
	// function that creates a list of dog breeds using the "breedList" argument
	document.querySelector('.breeds').innerHTML = `
    <select class="breed-select" onchange="loadByBreed(this.value)">
        <option>Select a Dog Breed</option>
        ${Object.keys(breedList)
			.map((item) => {
				return `<option>${item}</option>`;
			})
			.join('')}
    </select>`;
	// we find our div with class 'breeds' and dynamically create a selectable list of dog breeds. We use back ticks to create a template, and then enter in the HTML that we want created. Object.keys returns an array whose strings correspond to the properties in the object. This allows us to map over them. We map over the array of breeds, returning and <option> for each breed name. Our array has commas separating each item, so we use join('') to 'remove' the commas.

	// Pt. 2: We passed loadByBreed to our <select> via the onchange event handler. This says that when the <select> changes, we want to use the value of the <select>, the selected dog breed, as the argument in our loadByBreed function.
}

async function loadByBreed(breed) {
	// async function that loads an array of images for the selected breed using the "breed" argument
	if (breed !== 'Select a Dog Breed') {
		// we create a conditional statement
		let response = await fetch(`https://dog.ceo/api/breed/${breed}/images`); // we fetch the API data which returns a promise
		let data = await response.json(); // we then use .json() to resolve a second promise, returning the JS object
		createDogPic(data.message); // we pass the API data to our function, more specifically the data.message, which contains the array of images
	}
} // this functions is passed to our <select> via the onchange handler.

function createDogPic(dogPic) {
	// function that dynamically renders an image of the selected dog breed using the "dogPic" argument
	let randomNum = Math.floor(Math.random() * dogPic.length); // optional variable that we can use to randomize the image shown when selecting a dog breed
	document.querySelector('.pictures').innerHTML = `
        <img class="picture" src="${dogPic[randomNum]}" />
    `; // We find the div with class 'pictures' and dynamically render a picture of the selected dog. We use back ticks to create a template, and then enter the HTML that we want created. The src uses the array data fetched by the loadByBreed function, and we use our randomNum variable to display a random image found within the array.
}
