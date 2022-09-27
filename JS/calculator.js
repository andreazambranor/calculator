//OBJECT TO KEEP TRACK OF VALUES
const Calculator= {
    Display_Value:'0',
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null,
};

//MODIFIES VALUES EACH TIME A BUTTON IS CLICKED
function Input_Digit(digit) {
    const {Display_Value, Wait_Second_Operand} = Calculator;
    if (Wait_Second_Operand===true) {
        Calculator.Display_Value=digit;
        Calculator.Wait_Second_Operand=false;
    } else {
        Calculator.Display_Value=Display_Value==='0'? digit : Display_Value + digit;
    }
}

//HANDLE DECIMAL POINTS
function Input_Decimal(dot) {
    if (Calculator.Wait_Second_Operand===true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value+=dot;
    }
}

//THIS SECTION HANDLES THE OPERATORS
function Handle_Operator(Next_Operator) {
    const {First_Operand, Display_Value, operator} =Calculator
    const Value_of_Input = parseFloat(Display_Value);
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator=Next_Operator;
        return;
    }
    if (First_Operand==null) {
        Calculator.First_Operand=Value_of_Input;
    } else if (operator) {//CHECKS IF OPERATOR ALREADY EXISTS
        const Value_Now=First_Operand || 0;
        let result = Perform_Calculation[operator] (Value_Now, Value_of_Input);
        result=Number(result).toFixed(9) //ADD FIXED AMOUNT OF DECIMALS
        result=(result*1).toString()//REMOVE ANU TRAILING 0'S
        Calculator.Display_Value=parseFloat(result);
        Calculator.First_Operand=parseFloat(result)
    }
    Calculator.Wait_Second_Operand=true;
    Calculator.operator=Next_Operator;
}

const Perform_Calculation={
    "/": (First_Operand, Second_Operand) => First_Operand/Second_Operand,
    '*': (First_Operand, Second_Operand) =>First_Operand*Second_Operand,
    '+': (First_Operand, Second_Operand) =>First_Operand+Second_Operand,
    '-': (First_Operand, Second_Operand) =>First_Operand-Second_Operand,
    '=': (First_Operand, Second_Operand) =>Second_Operand
};


//UPDATE SCREEN WITH RESULT OF CALCULATION
function Update_Display() {
    function display = document.querySelector(',calculator-screen');
    display.value = Calculator.Display_Value;
}


Update_Display ();
const keys=document.querySelector('.calculator-keys');//KEEP TRACK OF BUTTON CLICKS
keys.addEventListener('click',(event)=> {
    const {target} = event; //TARGET REPRESENTS THE ELEMENT THAT WAS CLICKED
    if(!targer.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }
    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }
    //CLEARNUMBERS FROM SCREEN
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})