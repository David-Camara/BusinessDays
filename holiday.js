'use strict'

class Holiday extends Date {
    sMyDate = '01/01/1970';
    dtMyDate = new Date(this.sMyDate);
    bDate = false;
    bWeekend = false;
    bHoliday = false;
    bXMASEve = false  
    constructor (myDate = new Date()) {
        super(myDate);
        this.sMyDate = myDate;
        this.dtMyDate = new Date(myDate);
        super.setHours(0,0,0,0);  
        this.bDate = this.isDate();
        this.bWeekend = this.isWeekend();
        this.bHoliday = this.isHoliday();
        this.bXMASEve = this.isXMasEve();
    }
    //getters and setters
    //*** Couldn't do due to RangeError: Maximum call stack size exceeded */
    // get sMyDate() {return sMyDate;}
    // get dtMyDate() {return dtMyDate;}
    // get bDate() {return this.bDate = this.isDate();}
    // get bWeekend() {return this.bWeekend = this.isWeekend();}
    // get bHoliday() {return this.bHoliday = this.isHoliday();}
    // get bXMASEve() {return this.bXMASEve = this.isXMasEve();}
    // set sMyDate(myDate) {     
    //     this.sMyDate = myDate;
    // }
    // set dtMyDate(myDate = new Date()) {        
    //     this.sMyDate = myDate + "";
    //     this.dtMyDate = super(sMyDate);
    //     super.setHours(0,0,0,0);  
    //     this.bDate = this.isDate();
    //     this.bWeekend = this.isWeekend();
    //     this.bHoliday = this.isHoliday();
    //     this.bXMASEve = this.isXMasEve();
    // }    
    
    isDate(){
        try {
            if (isNaN(super.getDay())) {
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
    
    
    isWeekend() {
        if (this.bDate) {
            return (super.getDay() === 0 || super.getDay() === 6);
        } else return false;
    }
    //if weekend day automatically return true as other formulas will account for fridays of holidays that appear on weekend
    //needs to be public
    addDay (iDay = 0) {
        if (this.bDate &&  !isNaN(iDay)) {            
            this.dtMyDate = new Date(super.setDate(super.getDate()+iDay));    //updates the super and property
            this.sMyDate = String(this.dtMyDate.getMonth()+1 + '/' + this.dtMyDate.getDate() + '/' + this.getFullYear());            
            super.setHours(0,0,0,0);  
            this.dtMyDate.setHours(0,0,0,0);
            this.bDate = this.isDate();
            this.bWeekend = this.isWeekend();
            this.bHoliday = this.isHoliday();
            this.bXMASEve = this.isXMasEve();            
            return this.dtMyDate
        } else return this.dtMyDate;
    }

        //if weekend day automatically return true as other formulas will account for fridays of holidays that appear on weekend
    //needs to be public
    addDayToDate (iDay = 0, dtIterable = new Date()) {
        dtIterable = new Date(dtIterable);
        if (this.bDate &&  !isNaN(iDay)) {            
            dtIterable = new Date(dtIterable.setDate(dtIterable.getDate()+iDay));    
            return dtIterable
        } else return dtIterable;
    }
    
    isNewYears() {
        if (this.bDate) {  
            if (!this.bWeekend && (super.getMonth()+1 === 1 || super.getMonth()+1 === 12)) {    
                //possible friday holiday with saturday new years                
                let dtFriCheck = new Date('12/31/' + (super.getFullYear()));
                dtFriCheck.setHours(0,0,0,0);
                //possible monday holiday with sunday new years
                let dtMonCheck = new Date('01/02/' + super.getFullYear());
                dtMonCheck.setHours(0,0,0,0);
                let dtTruCheck = new Date('01/01/' + super.getFullYear());
                dtTruCheck.setHours(0,0,0,0);

                if (this.getDay() === 5  && this.getTime() === dtFriCheck.getTime()) {
                    //if it falls on a saturday holiday is on friday
                    return true;
                } else if (this.getDay() === 1  && this.getTime() === dtMonCheck.getTime()) { 
                    //if it falls on a sunday holiday is on monday
                    return true;
                } else if (this.getDay() > 0 && this.getDay() < 6 && this.getTime() === dtTruCheck.getTime()){
                    //if it falls on any other day
                    return true;
                } else { 
                    return false;
                }
            } else return false;
        } else return false;
    }
    
    
    isMondaySpecificHoliday() {
        //Family day : 3rd monday in february 
        //Civic Holiday : first monday of August 
        //Labour Day : first Monday in September.     
        //Thanksgiving : on the second Monday of October 
        //loop through days in month count every time monday is hit when 2nd or 3rd is hit exit loop returning date
        if (this.bDate) {      
            if (!this.bWeekend && (super.getMonth()+1 === 2 || super.getMonth()+1 === 8 || super.getMonth()+1 === 9 ||super.getMonth()+1 === 10)) {              
                let x = 0;
                let xEnd;
                let prevMonLastDay;
                switch(super.getMonth()+1) {
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
                let dtIterable = new Date(super.getMonth() + '/'+ prevMonLastDay +'/' + super.getFullYear());   
                do {
                    dtIterable = this.addDayToDate(1, dtIterable);    
                    if (dtIterable.getDay() === 1) {
                        x++;
                    }    
                } while (x < xEnd);
                return (super.getTime() === dtIterable.getTime());    
            } else return false;
        } else return false;
    }
    
    
    getEasterDate() {    
        if (this.bDate) {
            let Y = super.getFullYear();
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
                dtEasterSun = this.addDayToDate(-1, dtEasterSun); 
            }
            return dtEasterSun;
        }
    }
    
    
    isGoodFriday() {
        if (this.bDate) {
            if (!this.bWeekend && (super.getMonth()+1 === 3 || super.getMonth()+1 === 4)) { 
                const dtEasterSun = new Date(this.getEasterDate(this.sMyDate));
                const dtGoodFri = this.addDayToDate(-2, dtEasterSun);
                return (dtGoodFri.getDay() === 5 && dtGoodFri.getTime() === super.getTime()) 
            } else return false;
        } else return false;
    }
    
    
   isVictoriaDay() {
        //the last monday preceding May 25th including May 25th
        if (this.bDate) {
            if (!this.bWeekend && super.getMonth()+1 === 5) { 
                let dtIterable = new Date('05/26/' + super.getFullYear());   
                let x = false;
                do {
                    dtIterable = this.addDayToDate(-1, dtIterable);
                    if(dtIterable.getDay() == 1){
                        x=true;
                    }      
                } while (x!=true);
                return (super.getTime() === dtIterable.getTime());            
            } else return false;
        } else return false;
    }
    
    
    isCanadaDay () {
        if (this.bDate) {
            if (!this.bWeekend && (super.getMonth()+1 === 6 || super.getMonth()+1 === 7)) {
                //possible friday holiday with saturday canada day
                let dtFriCheck = new Date('06/30/' + super.getFullYear());
                dtFriCheck.setHours(0,0,0,0);
                //possible monday holiday with sunday canada day
                let dtMonCheck = new Date('07/02/' + super.getFullYear());
                dtMonCheck.setHours(0,0,0,0);
                let dtTruCheck = new Date('07/01/' + super.getFullYear());
                dtTruCheck.setHours(0,0,0,0);
    
                if (super.getDay() === 5  && super.getTime() === dtFriCheck.getTime()) {
                    //if it falls on a saturday holiday is on friday
                    return true;
                } else if (super.getDay() === 1  && super.getTime() === dtMonCheck.getTime()) {
                    //if it falls on a sunday holiday is on monday
                    return true;
                } else if (super.getDay() > 0 && super.getDay() < 6 && super.getTime() === dtTruCheck.getTime()){
                    //if it falls on any other day
                    return true;
                } else {
                    return false;
                }
            } else return false;
        } else return false;
    }
    
    
    isChristmasDays() {
        //if Dec 25th is on Saturday or sunday it is moved forward to Monday  and boxing days holiday is on a tuesday 
        //while friday is a half day
        if (this.bDate) {
            if (!this.bWeekend && super.getMonth()+1 === 12) {
                //possible saturday christmas moves to Monday
                let dtMonCheckXMAS1 = new Date('12/27/' + super.getFullYear());
                dtMonCheckXMAS1.setHours(0,0,0,0);
                //possible sunday christmas moves to Monday
                let dtMonCheckXMAS2 = new Date('12/26/' + super.getFullYear());
                dtMonCheckXMAS2.setHours(0,0,0,0);
                let dtTruCheckXMAS = new Date('12/25/' + super.getFullYear());
                dtTruCheckXMAS.setHours(0,0,0,0);
    
                //possible saturday christmas eve  moves to Friday
                let dtFriCheckEVE1 = new Date('12/23/' + super.getFullYear());
                dtFriCheckEVE1.setHours(0,0,0,0);     
                //possible sunday christmas eve  moves to Friday
                let dtFriCheckEVE2 = new Date('12/22/' + super.getFullYear());
                dtFriCheckEVE2.setHours(0,0,0,0);          
                let dtTruCheckEVE = new Date('12/24/' + super.getFullYear());
                dtTruCheckEVE.setHours(0,0,0,0);
    
                //possible saturday or sunday boxing day moves to Monday or Tuesday
                let dtMonTuesCheckBOX = new Date('12/28/' + super.getFullYear());
                dtMonTuesCheckBOX.setHours(0,0,0,0);       
                //possible Monday boxing day moves to Tuesday
                let dtTuesCheckBOX = new Date('12/27/' + super.getFullYear());
                dtTuesCheckBOX.setHours(0,0,0,0);               
                let dtTruCheckBOX = new Date('12/26/' + super.getFullYear());
                dtTruCheckBOX.setHours(0,0,0,0);        
    
    
                if (super.getDay() === 1  && (super.getTime() === dtMonCheckXMAS1.getTime() || super.getTime() === dtMonCheckXMAS2.getTime())) {
                    //if XMAS falls on a saturday or sunday  holiday is on Monday
                    return true;      
                } else if (super.getDay() > 0 && super.getDay() < 6 && super.getTime() === dtTruCheckXMAS.getTime()){
                    //if XMAS falls on any other day            
                    return true;
                } else if (super.getDay() === 5  && (super.getTime() === dtFriCheckEVE1.getTime() || super.getTime() === dtFriCheckEVE2.getTime())) {
                    //if EVE falls on Saturday or Sunday holiday is on Friday        
                    return true;     
                } else if (super.getDay() > 0 && super.getDay() < 6 && super.getTime() === dtTruCheckEVE.getTime()){
                    //if EVE falls on any other day            
                    return true;                   
                } else if ((super.getDay() === 1 || super.getDay() === 2) && super.getTime() === dtMonTuesCheckBOX.getTime()) {
                    //if BOX falls on Saturday or Sunday holiday is on Monday or Tuesday        
                    return true;       
                } else if (super.getDay() === 2 && super.getTime() === dtTuesCheckBOX.getTime()) {
                    //if BOX falls on Monday holiday is on Tuesday        
                    return true;     
                } else if (super.getDay() > 1 && super.getDay() < 6 && super.getTime() === dtTruCheckEVE.getTime()){
                    //if BOX falls on any other day            
                    return true;                    
                } else {
                    return false;
                }
            } else return false;
        } else return false;
    }
    
    isXMasEve() {
        if (this.bDate) {
            if (!this.bWeekend && super.getMonth()+1 === 12) {    
                //possible saturday christmas eve  moves to Friday
                let dtFriCheckEVE1 = new Date('12/23/' + super.getFullYear());
                dtFriCheckEVE1.setHours(0,0,0,0);     
                //possible sunday christmas eve  moves to Friday
                let dtFriCheckEVE2 = new Date('12/22/' + super.getFullYear());
                dtFriCheckEVE2.setHours(0,0,0,0);          
                let dtTruCheckEVE = new Date('12/24/' + super.getFullYear());
                dtTruCheckEVE.setHours(0,0,0,0);        
                
                if (super.getDay() === 5  && (super.getTime() === dtFriCheckEVE1.getTime() || super.getTime() === dtFriCheckEVE2.getTime())) {
                    //if EVE falls on Saturday or Sunday holiday is on Friday        
                    return true;     
                } else if (super.getDay() > 0 && super.getDay() < 6 && super.getTime() === dtTruCheckEVE.getTime()){
                    //if EVE falls on any other day            
                    return true;      
                } else return false;                                  
            } else return false;
        } else return false;
    }
    
    /* istanbul ignore next */
    isHoliday() {
        if (this.bDate) {
            return this.isNewYears() || this.isMondaySpecificHoliday() || this.isGoodFriday() || this.isVictoriaDay() || this.isCanadaDay() || this.isChristmasDays();
        } else return false;
    }
    
}

module.exports = Holiday;

//const test = new Holiday('01/15/2022');
//console.log(test.addDay(1));