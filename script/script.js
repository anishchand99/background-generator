//get the color count and store it in the colorCount variable
let colorInput = document.getElementById('color-count');
let colorCount = colorInput.value;
//get the background type
let backgroundElement = document.getElementById('background-type');
let backgroundType = backgroundElement.value;
//colors
let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let color3 = document.querySelector(".color3");

let body = document.getElementById("container");
let random = document.querySelector(".random");

let css_text = document.querySelector("h3");
css_text.textContent = `${backgroundType}(to right, ${color1.value}, ${color2.value}, ${color3.value})`;
//hide all elements?
let hidden = false;

const getColorCount = () => {
	//if background type is not single
	if(backgroundType !== 'single'){
		//get the current color value
		currentColor = colorInput.value;
		//if the color value is incremented
		if(currentColor >= colorCount){
			//add the color elements to the DOM
			let buttons = document.querySelector(".buttons");
			let input = document.createElement("input");
			input.className = "color" + colorCount; // set the CSS class
			input.type = "color";
			input.name = 'color' + colorCount;
			input.value = '#cc95c0';
			input.addEventListener("input", function(){
				setGradient(backgroundType);
			});
			buttons.appendChild(input);
			//add event listeners to the colors
			if(document.querySelector('.color1') !== null){
				color1 = document.querySelector(".color1");
			}
			if(document.querySelector('.color2') !== null){
				color2 = document.querySelector(".color2");
			}	
		} else if(currentColor < colorCount){
			//if the color count is decremented, remove the color elements
			let buttons = document.querySelector(".buttons");
			let childToRemove = document.querySelector(`.color${currentColor}`);
			if(childToRemove !== null){
				buttons.removeChild(childToRemove);
			}
		}
		//update the color count
		colorCount = colorInput.value;
	}
	else{
		//if it is single, only keep one color
		removeAllColors();
	}
}

//get the latest value of the background type selected
const getBackgroundType = () => {
	backgroundType = backgroundElement.value;
	setGradient(backgroundType, color1.value, color2.value, color3.value);
}

//set the background of the page based on the type selected
const setGradient = (backgroundType, color1, color2, color3) => {
	if(backgroundType === 'linear-gradient'){
		if(colorCount <= 2){
			body.style.background = `linear-gradient(to right, ${color1}, ${color3})`;
			css_text.textContent = body.style.background;	
		}else{
			body.style.background = `linear-gradient(to right, ${color1}, ${color2}, ${color3})`;
			css_text.textContent = body.style.background;	
		}
	}
	if(backgroundType === 'radial-gradient'){
		if(colorCount <= 2){
			body.style.background = `radial-gradient(${color1}, ${color3})`;
			css_text.textContent = body.style.background;		
		}else{
			body.style.background = `radial-gradient(${color1}, ${color2}, ${color3})`;
			css_text.textContent = body.style.background;	
		}
	}
	if(backgroundType === 'single'){
		removeAllColors();
		body.style.background = `${color3}`;
		css_text.textContent = body.style.background;
	}
}
//remove all colors except one and update the color selected count to 1.
const removeAllColors = () => {
	colorCount = 1;
	colorInput.value = 1;
	let buttons = document.querySelector(".buttons");
	let childToRemove1 = document.querySelector('.color2');
	let childToRemove2 = document.querySelector('.color1');
	if(childToRemove1 !== null){
		buttons.removeChild(childToRemove1);
	}
	if(childToRemove2 !== null){
		buttons.removeChild(childToRemove2);
	}

}
//generate random background
const changeRandom = () => {
	setGradient(backgroundType, randColor(), randColor(), randColor());
}
//generate random color
const randColor = () => {
	let r = Math.floor(Math.random()  * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	return (`rgb(${r},${g},${b})`)
}
//add event listeners
color1.addEventListener("input", function(){
	setGradient(backgroundType, color1.value, color2.value, color3.value);
});
color2.addEventListener("input", function(){
	setGradient(backgroundType, color1.value, color2.value, color3.value);
});
color3.addEventListener("input", function(){
	setGradient(backgroundType, color1.value, color2.value, color3.value);
});
random.addEventListener("click", changeRandom);

const hideAll = () => {
	let visualText = document.querySelector('.visible');
	let hideElements = document.querySelector('.hide');
	if(hidden){
		hideElements.style.visibility='visible';
		hidden = false;
		visualText.innerHTML= 'Hide';
	}else{
		hideElements.style.visibility='hidden';
		hidden = true;
		visualText.innerHTML= 'Unhide';
	}
}