// QUERY SELECTORS //
let numbers = document.querySelectorAll(".nums");
let operators = document.querySelectorAll(".ops");
let backBtn = document.querySelector("#back");
let allClear = document.querySelector("#ac");
let equals = document.querySelector("#equals");
let plusMin = document.querySelector("#plusmin");
const display = document.querySelector("#display");
const equation = document.querySelector("#equation-display");

// GLOBAL VARIABLES //
let val = "";
let hist = "";
let equa = "";

// UPDATES EQUA AND VAL //
const addToEquation = () => {
	equa += val;
	updateEquation();
};

const updateEquation = () => {
	equation.textContent = equa;
};

const addToVal = digit => {
	val += digit;
	updateVal();
};

const updateVal = () => {
	display.textContent = val;
};

// EVALUATION //
const evalEquation = () => {
	let equation = equa;
	return eval(equation);
};

// FORMULAS FOR NUMBERS //
const numberPress = num => {
	if (val.length <= 18) {
		if (hist !== "") {
			hist = "";
			updateEquation();
		}
		if (num.match(/[0-9]/)) {
			addToVal(num);
		} else {
			if (!val.includes(".")) {
				addToVal(num);
			}
		}
	}
};

numbers.forEach(button => {
	button.addEventListener("click", button => {
		let digit = button.srcElement.textContent;
		numberPress(digit);
	});
});

// FORMULA FOR OPERATORS //
const operatorPress = operator => {
	if (
		!equa.charAt(equa.length - 1).match(/[\/\*\-\+]/) ||
		val !== "" ||
		hist !== ""
	) {
		if (hist !== "") {
			val = hist;
			hist = "";
		}
		val += operator;
		addToEquation();
		val = "";
		updateVal();
	} else {
		equa = equa.slice(0, equa.length - 1);
		val += operator;
		addToEquation();
		val = "";
		updateVal();
	}
};

operators.forEach(button => {
	button.addEventListener("click", button => {
		let operator = button.srcElement.textContent;
		operatorPress(operator);
	});
});

// FORMULA FOR BACKSPACE //
const backSpace = () => {
	val = val.substr(0, val.length - 1);
	updateVal();
};
backBtn.addEventListener("click", button => {
	backSpace();
});

// FORMULA FOR AC //
const clearPress = () => {
	val = "";
	equa = "";
	hist = "";
	updateEquation();
	updateVal();
};

allClear.addEventListener("click", button => {
	clearPress();
});

// FORMULA FOR EQUALS //
const equalsPress = () => {
	if (val !== "") {
		equa += val;
		val = evalEquation();
		updateVal();
		equa += "=";
		updateEquation();
		hist = val.toString();
		equa = "";
		val = "";
	}
};

equals.addEventListener("click", button => {
	equalsPress();
});

// FORMULA FOR +/- //
const plusminPress = () => {
	if (val.charAt(0) === "-") {
		val = val.slice(1, val.length);
	} else {
		val = `-${val}`;
	}
	updateVal();
}

plusMin.addEventListener("click", button => {
	plusminPress();
});

// KEYPRESS LISTENERS //
window.addEventListener("keydown", e => {
	switch (e.key) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case ".":
			numberPress(e.key);
			break;
		case "/":
		case "*":
		case "-":
		case "+":
			operatorPress(e.key);
			break;
		case "Backspace":
			backSpace();
			break;
		case "Delete":
			clearPress();
			break;
		case "Enter":
			equalsPress();
			break;
	}
});
