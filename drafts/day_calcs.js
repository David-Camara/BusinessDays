'use strict'
//* New Year - Saturday, January 1, 2022 (Contact centres closed Monday, January 3, 2022)
//* Family Day third monday in february
//* Good Friday - Friday, April 15, 2022
//* Easter Monday - Monday, April 18, 2022 - not a holiday in ontario
//* Victoria Day - Monday, May 23, 2022
//* Canada Day - Friday, July 1, 2022
//* Civic Holiday - Monday, August 1, 2022
//* Labour Day - Monday, September 5, 2022
//* Thanksgiving Day - Monday, October 10, 2022
//* christmas eve half day
//* Christmas Day - Sunday, December 25, 2022 (Contact centres closed Monday, December 26, 2022)
//* Boxing Day - Monday, December 26, 2022 (Contact centres closed Tuesday, December 27, 2022)


//* *, ** - functions can be joined
//* get month if the date is not the month we are checking then automatic false except easter check 2 months */
//* do a check on actual date since it doesnt kill the code in each function nto continuing check unless valid




const isDate = (myDate) => {
    try {
        const dtHold = new Date(myDate);
        if (isNaN(dtHold.getDay())) {
            return false;
        } else {
            return true;
        }
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}


const isWeekend = (myDate) => {
    if (isDate(myDate)) {
        const myDayOfWk = new Date(myDate).getDay();
        return (myDayOfWk === 0 || myDayOfWk === 6);
    } else return false;
}
//if weekend day automatically return true as other formulas will account for fridays of holidays that appear on weekend

const addDay = (myDate, iDay) => {
    if (isDate(myDate) &&  !isNaN(iDay)) {
        let dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        dtMyDate = new Date(dtMyDate.setDate(dtMyDate.getDate()+iDay));    
        dtMyDate.setHours(0,0,0,0);
        return dtMyDate
    } else return myDate;
}

const isNewYears = (myDate) => {
    if (isDate(myDate)) {
        let dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        const bWeekend = isWeekend(myDate);       
        if (!bWeekend && (dtMyDate.getMonth()+1 === 1 || dtMyDate.getMonth()+1 === 12)) {    
            //possible friday holiday with saturday new years
            let dtFriCheck = new Date('12/31/' + dtMyDate.getFullYear());
            dtFriCheck.setHours(0,0,0,0);
            //possible monday holiday with sunday new years
            let dtMonCheck = new Date('01/02/' + dtMyDate.getFullYear());
            dtMonCheck.setHours(0,0,0,0);
            let dtTruCheck = new Date('01/01/' + dtMyDate.getFullYear());
            dtTruCheck.setHours(0,0,0,0);

            if (dtMyDate.getDay() === 5  && dtMyDate.getTime() === dtFriCheck.getTime()) {
                //if it falls on a saturday holiday ios on friday
                return true;
            } else if (dtMyDate.getDay() === 1  && dtMyDate.getTime() === dtMonCheck.getTime()) {
                //if it falls on a sunday holiday is on monday
                return true;
            } else if (dtMyDate.getDay() > 0 && dtMyDate.getDay() < 6 && dtMyDate.getTime() === dtTruCheck.getTime()){
                //if it falls on any other day
                return true;
            } else {
                return false;
            }
        } else return false;
    } else return false;
}


const isMondaySpecificHoliday = (myDate) => {
    //Family day : 3rd monday in february 
    //Civic Holiday : first monday of August 
    //Labour Day : first Monday in September.     
    //Thanksgiving : on the second Monday of October 
    //loop through days in month count every time monday is hit when 2nd or 3rd is hit exit loop returning date
    if (isDate(myDate)) {    
        let dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        const bWeekend = isWeekend(myDate);  
        if (!bWeekend && (dtMyDate.getMonth()+1 === 2 || dtMyDate.getMonth()+1 === 8 || dtMyDate.getMonth()+1 === 9 ||dtMyDate.getMonth()+1 === 10)) {              
            let x = 0;
            let xEnd;
            let prevMonLastDay;
            //console.log('dtMyDate.getMonth()+1:',dtMyDate.getMonth()+1);
            switch(dtMyDate.getMonth()+1) {
                case 2: 
                    xEnd = 3; //if February loop ends at third monday
                    prevMonLastDay = 31;
                    break;            
                case 8:
                case 9:
                    xEnd = 1; //if August or September loop ends at first Monday
                    prevMonLastDay = 31;
                    break;
                case 10:                
                    xEnd = 2; //if October loop ends at second Monday
                    prevMonLastDay = 30;
                    break;
            }
            //get month values start at 0 so it would be the previous months last day
            let dtIterable = new Date(dtMyDate.getMonth() + '/'+ prevMonLastDay +'/' + dtMyDate.getFullYear());   
            // console.log('xEnd:', xEnd);
            // console.log('x:', x);
            do {
                dtIterable = addDay(dtIterable, 1);    
                if (dtIterable.getDay() === 1) {
                    x++;
                }    
                // console.log('dtIterable:',dtIterable);
                // console.log('x:',x);
            } while (x < xEnd);
            // console.log(dtIterable);
            return (dtMyDate.getTime() === dtIterable.getTime());    
        } else return false;
    } else return false;
}


const getEasterDate=(myDate) => {    
    if (isDate(myDate)) {
        let dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        let Y = dtMyDate.getFullYear();
        let A, B, C, P, Q,
            M, N, D, E;

        // All calculations done
        // on the basis of
        // Gauss Easter Algorithm
        A = Y % 19;
        B = Y % 4;
        C = Y % 7;
        P = Math.floor(Y / 100);
        Q = Math.floor(
            (13 + 8 * P) / 25);
        M = (15 - Q + P - P / 4) % 30;
        N = (4 + P - P / 4) % 7;
        D = (19 * A + M) % 30;
        E = (2 * B + 4 * C + 6 * D + N) % 7;
        let days = (22 + D + E);
        let dtEasterSun;
        // A corner case,
        // when D is 29
        if ((D === 29 || D===28) && (E === 6)) {
            //return (Y + "-04" + "-19"); for 29
            //return (Y + "-04" + "-18"); for 28
            dtEasterSun =  new Date("04/" + D-10 + "/"+ Y );
        }
        else {
            // If days > 31, move to April
            // April = 4th Month
            if (days > 31) {
                //return (Y + "-04-" + (days - 31));
                dtEasterSun =  new Date("04/" + (days - 31) + "/" + Y);
            }
            // Otherwise, stay on March
            // March = 3rd Month
            else {
                //return (Y + "-03-" + days);
                dtEasterSun =  ("03/" + days + "/" + Y);
            }
        }
        //not exact seems to either return Monday or Sunday of Easter depending on year
        if (dtEasterSun.getDay() === 1 ) {
            dtEasterSun = addDay(dtEasterSun, -1); 
        }
        return dtEasterSun;
    }
}


const isGoodFriday = (myDate) => {
    if (isDate(myDate)) {
        const dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        const bWeekend = isWeekend(myDate);  
        if (!bWeekend && (dtMyDate.getMonth()+1 === 3 || dtMyDate.getMonth()+1 === 4)) { 
            const dtEasterSun = getEasterDate(myDate)
            const dtGoodFri = addDay(dtEasterSun, -2);
            return (dtGoodFri.getDay() === 5 && dtGoodFri.getTime() === dtMyDate.getTime()) 
        } else return false;
    } else return false;
}


const isVictoriaDay = (myDate) => {
    //the last monday preceding May 25th including May 25th
    if (isDate(myDate)) {
        const dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        const bWeekend = isWeekend(myDate);  
        if (!bWeekend && dtMyDate.getMonth()+1 === 5) { 
            let dtIterable = new Date('05/26/' + dtMyDate.getFullYear());   
            let x = false;
            do {
                dtIterable = addDay(dtIterable, -1);
                if(dtIterable.getDay() == 1){
                    x=true;
                }      
            } while (x!=true);
            return (dtMyDate.getTime() === dtIterable.getTime());            
        } else return false;
    } else return false;
}


const isCanadaDay = (myDate) => {
    if (isDate(myDate)) {
        const dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        const bWeekend = isWeekend(myDate); 
        if (!bWeekend && dtMyDate.getMonth()+1 === 7) {
            //possible friday holiday with saturday canada day
            let dtFriCheck = new Date('06/30/' + dtMyDate.getFullYear());
            dtFriCheck.setHours(0,0,0,0);
            //possible monday holiday with sunday canada day
            let dtMonCheck = new Date('07/02/' + dtMyDate.getFullYear());
            dtMonCheck.setHours(0,0,0,0);
            let dtTruCheck = new Date('07/01/' + dtMyDate.getFullYear());
            dtTruCheck.setHours(0,0,0,0);

            if (dtMyDate.getDay() === 5  && dtMyDate.getTime() === dtFriCheck.getTime()) {
                //if it falls on a saturday holiday is on friday
                return true;
            } else if (dtMyDate.getDay() === 1  && dtMyDate.getTime() === dtMonCheck.getTime()) {
                //if it falls on a sunday holiday is on monday
                return true;
            } else if (dtMyDate.getDay() > 0 && dtMyDate.getDay() < 6 && dtMyDate.getTime() === dtTruCheck.getTime()){
                //if it falls on any other day
                return true;
            } else {
                return false;
            }
        } else return false;
    } else return false;
}


const isChristmasDays = (myDate) => {
    //if Dec 25th is on Saturday or sunday it is moved forward to Monday  and boxing days holiday is on a tuesday 
    //while friday is a half day
    if (isDate(myDate)) {
        const dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        const bWeekend = isWeekend(myDate); 
        if (!bWeekend && dtMyDate.getMonth()+1 === 12) {
            //possible saturday christmas moves to Monday
            let dtMonCheckXMAS1 = new Date('12/27/' + dtMyDate.getFullYear());
            dtMonCheckXMAS1.setHours(0,0,0,0);
            //possible sunday christmas moves to Monday
            let dtMonCheckXMAS2 = new Date('12/26/' + dtMyDate.getFullYear());
            dtMonCheckXMAS2.setHours(0,0,0,0);
            let dtTruCheckXMAS = new Date('12/25/' + dtMyDate.getFullYear());
            dtTruCheckXMAS.setHours(0,0,0,0);

            //possible saturday christmas eve  moves to Friday
            let dtFriCheckEVE1 = new Date('12/23/' + dtMyDate.getFullYear());
            dtFriCheckEVE1.setHours(0,0,0,0);     
            //possible sunday christmas eve  moves to Friday
            let dtFriCheckEVE2 = new Date('12/22/' + dtMyDate.getFullYear());
            dtFriCheckEVE2.setHours(0,0,0,0);          
            let dtTruCheckEVE = new Date('12/24/' + dtMyDate.getFullYear());
            dtTruCheckEVE.setHours(0,0,0,0);

            //possible saturday or sunday boxing day moves to Monday or Tuesday
            let dtMonTuesCheckBOX = new Date('12/28/' + dtMyDate.getFullYear());
            dtMonTuesCheckBOX.setHours(0,0,0,0);       
            //possible Monday boxing day moves to Tuesday
            let dtTuesCheckBOX = new Date('12/27/' + dtMyDate.getFullYear());
            dtTuesCheckBOX.setHours(0,0,0,0);               
            let dtTruCheckBOX = new Date('12/26/' + dtMyDate.getFullYear());
            dtTruCheckBOX.setHours(0,0,0,0);        


            if (dtMyDate.getDay() === 1  && (dtMyDate.getTime() === dtMonCheckXMAS1.getTime() || dtMyDate.getTime() === dtMonCheckXMAS2.getTime())) {
                //if XMAS falls on a saturday or sunday  holiday is on Monday
                return true;      
            } else if (dtMyDate.getDay() > 0 && dtMyDate.getDay() < 6 && dtMyDate.getTime() === dtTruCheckXMAS.getTime()){
                //if XMAS falls on any other day            
                return true;
            } else if (dtMyDate.getDay() === 5  && (dtMyDate.getTime() === dtFriCheckEVE1.getTime() || dtMyDate.getTime() === dtFriCheckEVE2.getTime())) {
                //if EVE falls on Saturday or Sunday holiday is on Friday        
                return true;     
            } else if (dtMyDate.getDay() > 0 && dtMyDate.getDay() < 6 && dtMyDate.getTime() === dtTruCheckEVE.getTime()){
                //if EVE falls on any other day            
                return true;                   
            } else if ((dtMyDate.getDay() === 1 || dtMyDate.getDay() === 2) && dtMyDate.getTime() === dtMonTuesCheckBOX.getTime()) {
                //if BOX falls on Saturday or Sunday holiday is on Monday or Tuesday        
                return true;       
            } else if (dtMyDate.getDay() === 2 && dtMyDate.getTime() === dtTuesCheckBOX.getTime()) {
                //if BOX falls on Monday holiday is on Tuesday        
                return true;     
            } else if (dtMyDate.getDay() > 1 && dtMyDate.getDay() < 6 && dtMyDate.getTime() === dtTruCheckEVE.getTime()){
                //if BOX falls on any other day            
                return true;                    
            } else {
                return false;
            }
        } else return false;
    } else return false;
}

const isXMasEve = (myDate) => {
    if (isDate(myDate)) {
        const dtMyDate = new Date(myDate);
        dtMyDate.setHours(0,0,0,0);
        const bWeekend = isWeekend(myDate); 
        if (!bWeekend && dtMyDate.getMonth()+1 === 12) {    
            //possible saturday christmas eve  moves to Friday
            let dtFriCheckEVE1 = new Date('12/23/' + dtMyDate.getFullYear());
            dtFriCheckEVE1.setHours(0,0,0,0);     
            //possible sunday christmas eve  moves to Friday
            let dtFriCheckEVE2 = new Date('12/22/' + dtMyDate.getFullYear());
            dtFriCheckEVE2.setHours(0,0,0,0);          
            let dtTruCheckEVE = new Date('12/24/' + dtMyDate.getFullYear());
            dtTruCheckEVE.setHours(0,0,0,0);        
            
            if (dtMyDate.getDay() === 5  && (dtMyDate.getTime() === dtFriCheckEVE1.getTime() || dtMyDate.getTime() === dtFriCheckEVE2.getTime())) {
                //if EVE falls on Saturday or Sunday holiday is on Friday        
                return true;     
            } else if (dtMyDate.getDay() > 0 && dtMyDate.getDay() < 6 && dtMyDate.getTime() === dtTruCheckEVE.getTime()){
                //if EVE falls on any other day            
                return true;      
            } else return false;                                  
        } else return false;
    } else return false;
}

const isHoliday = (myDate) => {
    if (isDate(myDate)) {
        return isNewYears(myDate) || isMondaySpecificHoliday(myDate) || isGoodFriday(myDate) || isVictoriaDay(myDate) || isCanadaDay(myDate) || isChristmasDays(myDate);
    } else return false;
}

module.exports = {isDate, isWeekend, addDay, isNewYears, isMondaySpecificHoliday, isGoodFriday, isVictoriaDay, isCanadaDay, isChristmasDays, isXMasEve, isHoliday};



