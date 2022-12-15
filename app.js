function reverseStr(str){
    return str.split('').reverse().join('');
}

// function to check if the given string is a plaindrome
function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse; 
}

// function to convert the date into string
function convertDateToString(date){
    var dateStr = {day:'', month:'', year:''};
    //if date is less than 10 add a zero in front
    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToString(date);
    
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindrome = getAllDateFormats(date);
    
    var flag = false;

    for(var i=0; i< listOfPalindrome.length; i++)
    {
        if(isPalindrome(listOfPalindrome[i]))
        {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year%400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day+1; //increment the day
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) // checking for february month=2
    {
        if(isLeapYear(year))//checking for leap year
        {
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else
        {
            //not a leap year
            if(day >28){
                day = 1;
                month++;
            }
        }
    }
    
    //check for other months 
    else{
        //checking if the day exceeds the max days in month
        if(day > daysInMonth[month -1]){
            day=1;
            month++;
        }
    }

    if(month >12){
        //if the month exceeds december make it january
        month=1;
        year++;
    }
    return{
        day: day,
        month: month,
        year:year
    };
}


function getNextPalindrome(date){
    // put a date and we'll get a next palindrome date
    var ctr = 0; //keeping a count of how far the next palindrome date is
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindromeDate = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindromeDate){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate]
}


//date object
var date = {
    day: 29,
    month: 2,
    year: 2020
}


function clickHandler(e){
    var bdayStr = dateInputRef.value;
    if(bdayStr !== '')// if string is not empty
    {
        var ListOfDate = bdayStr.split("-");
        var date ={
            day : Number(ListOfDate[2]),
            month : Number(ListOfDate[1]),
            year : Number(ListOfDate[0]),
        }; 
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            resultRef.innerText = "Yay! your birthday is a palindrome!! 🤩"
        }
        else{
            var [ctr, nextDate] = getNextPalindrome(date);

            resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!😥`
        }
    }
}

// variables
var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");

showBtnRef.addEventListener("click", clickHandler);