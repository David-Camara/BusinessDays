const Holiday = require('../holiday');
//https://jestjs.io/docs/getting-started
//may need to add mroe tests later for all returns of methods.

test('1. Holiday.sMyDate - Expected to return a string copy of the date given to the instance', () => {
    const dtHol1 = new Holiday('01/01/2022');
    expect(dtHol1.sMyDate).toEqual('01/01/2022');
});

test('2. Holiday.dtMyDate - Expected to return a date strign in the format of the Date object', () => {
    const dtHol2 = new Holiday('01/01/2022');
    const dtTest2 = new Date('01/01/2022');
    expect(dtHol2.dtMyDate).toEqual(dtTest2);
});

test('3. Holiday.bDate - Expected if date passed to constructor is a valid date then value is true', () => {
    const dtHol3 = new Holiday('01/01/2022');
    expect(dtHol3.bDate).toEqual(true); 
});

test('4. Holiday.bDate - Expected if date passed to constructor is not a valid date then value is false', () => {
    const dtHol4 = new Holiday('Hello!');
    expect(dtHol4.bDate).toEqual(false); 
});

test('5. Holiday.bWeekend - Expected if date passed to constructor is a Saturday or Sunday then value is true', () => {
    const dtHol5 = new Holiday('01/01/2022');
    expect(dtHol5.bWeekend).toEqual(true); 
});

test('6. Holiday.bWeekend - Expected if date passed to constructor is not a Saturday or Sunday then value is false', () => {
    const dtHol6 = new Holiday('01/05/2022');
    expect(dtHol6.bWeekend).toEqual(false); 
});

test('7. Holiday.bHoliday - Expected if date is a holiday in Ontario Canada to have flag set to true.', () => {
    const dtHol7 = new Holiday('12/31/2021');
    expect(dtHol7.bHoliday).toEqual(true); // January 1st was on a weekend in 2022
});

test('8. Holiday.bHoliday - Expected if date is not a holiday in Ontario Canada to have flag set to false.', () => {
    const dtHol8 = new Holiday('01/01/2022');
    expect(dtHol8.bHoliday).toEqual(false); // January 1st was on a weekend in 2022
});

test('9. Holiday.bXMASEve - Expected if date is Dec 24th and not on a weekend to have flag set to true.', () => {
    const dtHol9 = new Holiday('12/23/2022'); //24th is on a saturday in 2022 makes holiday the 23rd
    expect(dtHol9.bXMASEve).toEqual(true); 
});

test('9. Holiday.bXMASEve - Expected if date is not Dec 24th or is on a weekend to have flag set to false.', () => {
    const dtHol9 = new Holiday('12/25/2022'); //24th is on a saturday in 2022 makes holiday the 23rd
    expect(dtHol9.bXMASEve).toEqual(false); 
});

test('10. Holiday.isDate() - Expected true result if the date passed to the constructor is a valid date', () => {
    const dtHol10 = new Holiday('12/25/2022'); //24th is on a saturday in 2022 makes holiday the 23rd
    expect(dtHol10.isDate()).toEqual(true); 
});

test('11. Holiday.isDate() - Expected false result if the value passed to the constructor is an invalid date', () => {
    const dtHol11 = new Holiday('Hello!'); //24th is on a saturday in 2022 makes holiday the 23rd
    expect(dtHol11.isDate()).toEqual(false); 
});

test('12. Holiday.isWeekend() - Expected if date passed to constructor is a Saturday or Sunday then value is true', () => {
    const dtHol12 = new Holiday('01/01/2022');
    expect(dtHol12.isWeekend()).toEqual(true); 
});

test('13. Holiday.isWeekend() - Expected if date passed to constructor is not a Saturday or Sunday then value is false', () => {
    const dtHol13 = new Holiday('01/05/2022');
    expect(dtHol13.isWeekend()).toEqual(false); 
});

test('14. Holiday.addDay(#) - Expected days added to object date if number passed to method', () => {
    const dtHol14 = new Holiday('01/15/2022');
    expect(dtHol14.addDay(1)).toEqual(new Date('2022-01-16T05:00:00.000Z')); 
});

test('15. Holiday.addDayToDate(#, date) - Expected days added to date passed in if number passed to method', () => {
    const dtHol15 = new Holiday('01/15/2022');
    expect(dtHol15.addDayToDate(1, '01/15/2022')).toEqual(new Date('2022-01-16T05:00:00.000Z'));     
    expect(dtHol15.sMyDate).toEqual('01/15/2022');  
});

test('16. Holiday.addDayToDate(#, date) - Expected addDayToDate method will not effect object date', () => {
    const dtHol16 = new Holiday('01/15/2022');
    const x16 = dtHol16.addDayToDate(10, '01/15/2022');    
    expect(dtHol16.sMyDate).toEqual('01/15/2022');  
});

test('17. Holiday.isNewYears() - Expected isNewYears method to return true if it is provided the expected day off for New Years Day', () => {
    const dtHol17 = new Holiday('12/31/2021'); //New YEars Day was on a saturday which makes the friday the day off
    expect(dtHol17.isNewYears()).toEqual(true);  
});

test('18. Holiday.isNewYears() - Expected isNewYears method to return false if it is provided the  incorrect day off for New Years Day', () => {
    const dtHol18 = new Holiday('01/01/2022'); //New YEars Day was on a saturday which makes the friday the day off
    expect(dtHol18.isNewYears()).toEqual(false);  
});

test('19. Holiday.isMondaySpecificHoliday() - Expected true from isMondaySpecificHoliday() method when 3rd Monday in February(Family Day) is given to constructor', () => {
    const dtHol19 = new Holiday('02/21/2022'); 
    expect(dtHol19.isMondaySpecificHoliday()).toEqual(true);  
});

test('20. Holiday.isMondaySpecificHoliday() - Expected false from isMondaySpecificHoliday() method when daye provided is not 3rd Monday in February(Family Day) and is given to the constructor', () => {
    const dtHol20 = new Holiday('02/14/2022');
    expect(dtHol20.isMondaySpecificHoliday()).toEqual(false);  
});

test('21. Holiday.isMondaySpecificHoliday() - Expected true from isMondaySpecificHoliday() method when 1st Monday in August(Civic Holiday) is given to constructor', () => {
    const dtHol21 = new Holiday('08/01/2022'); 
    expect(dtHol21.isMondaySpecificHoliday()).toEqual(true);  
});

test('22. Holiday.isMondaySpecificHoliday() - Expected false from isMondaySpecificHoliday() method when date provided is not 1st Monday in August(Civic Holiday) and is given to the constructor', () => {
    const dtHol22 = new Holiday('08/02/2022'); 
    expect(dtHol22.isMondaySpecificHoliday()).toEqual(false);  
});

test('23. Holiday.isMondaySpecificHoliday() - Expected true from isMondaySpecificHoliday() method when 1st Monday in September(Labour Day) is given to constructor', () => {
    const dtHol23 = new Holiday('09/05/2022'); 
    expect(dtHol23.isMondaySpecificHoliday()).toEqual(true);  
});

test('24. Holiday.isMondaySpecificHoliday() - Expected false from isMondaySpecificHoliday() method when date provided is not 1st Monday in September(Labour Day) and is given to the constructor', () => {
    const dtHol24 = new Holiday('09/01/2022'); 
    expect(dtHol24.isMondaySpecificHoliday()).toEqual(false);  
});

test('25. Holiday.isMondaySpecificHoliday() - Expected true from isMondaySpecificHoliday() method when 2nd Monday in October(Thanksgiving Day) is given to constructor', () => {
    const dtHol25 = new Holiday('10/10/2022'); 
    expect(dtHol25.isMondaySpecificHoliday()).toEqual(true);  
});

test('26. Holiday.isMondaySpecificHoliday() - Expected false from isMondaySpecificHoliday() method when date provided is not 2nd Monday in October(Thanksgiving Day) and is given to the constructor', () => {
    const dtHol26 = new Holiday('10/03/2022'); 
    expect(dtHol26.isMondaySpecificHoliday()).toEqual(false);  
});

test('27. Holiday.getEasterDate() - Expected Easter Sunday date from getEasterDate() method from the year of the date provided to the constructor', () => {
    const dtHol27 = new Holiday('10/03/2022'); 
    expect(dtHol27.getEasterDate()).toEqual(new Date('2022-04-17T04:00:00.000Z'));  
});

test('28. Holiday.isGoodFriday() - Expected true from isGoodFriday() method method when date provided is the Friday before Easter Sunday.', () => {
    const dtHol28= new Holiday('04/15/2022'); 
    expect(dtHol28.isGoodFriday()).toEqual(true);  
});

test('29. Holiday.isGoodFriday() - Expected false from isGoodFriday() method when date provided is not the Friday before Easter Sunday.', () => {
    const dtHol29 = new Holiday('03/03/2022'); 
    expect(dtHol29.isGoodFriday()).toEqual(false);  
});

test('30. Holiday.isVictoriaDay() - Expected true from isVictoriaDay() method method when date provided is the last monday preceding May 25th including May 25th.', () => {
    const dtHol30= new Holiday('05/23/2022'); 
    expect(dtHol30.isVictoriaDay()).toEqual(true);  
});

test('31. Holiday.isVictoriaDay() - Expected false from isVictoriaDay() method when date provided is not the last monday preceding May 25th including May 25th.', () => {
    const dtHol31 = new Holiday('05/24/2022'); 
    expect(dtHol31.isVictoriaDay()).toEqual(false);  
});

test('32. Holiday.isCanadaDay() - Expected true from isCanadaDay() method when date provided is the business day closest to Canada Day including July 1st.', () => {
    const dtHol32= new Holiday('07/01/2022'); 
    expect(dtHol32.isCanadaDay()).toEqual(true);  
});

test('33. Holiday.isCanadaDay() - Expected false from isCanadaDay() method when date provided is not the business day closest to Canada Day including July 1st.', () => {
    const dtHol33 = new Holiday('06/30/2022'); 
    expect(dtHol33.isCanadaDay()).toEqual(false);  
});

test('34. Holiday.isChristmasDays() - Expected true from isChristmasDays() method when date provided is the business day closest to Christmas Eve and is on the Friday when it is on the weekend', () => {
    const dtHol34= new Holiday('12/23/2022'); 
    expect(dtHol34.isChristmasDays()).toEqual(true);  
});

test('35. Holiday.isChristmasDays() - Expected false from isChristmasDays() method when date provided is not one of the business days closest to and including Dec 24th, 25th and 26th.', () => {
    const dtHol35 = new Holiday('12/28/2022'); 
    expect(dtHol35.isChristmasDays()).toEqual(false);  
});

test('36. Holiday.isChristmasDays() - Expected true from isChristmasDays() method when date provided is the business day closest to Christmas Day.', () => {
    const dtHol36= new Holiday('12/26/2022'); 
    expect(dtHol36.isChristmasDays()).toEqual(true);  
});

test('37. Holiday.isChristmasDays() - Expected true from isChristmasDays() method when date provided is the business day closest to Boxing Day.', () => {
    const dtHol37= new Holiday('12/27/2022'); 
    expect(dtHol37.isChristmasDays()).toEqual(true);  
});

test('38. Holiday.isXMasEve() - Expected true from isXMasEve() method when date provided is the business day closest to Christmas Eve and is on the Friday when it is on the weekend', () => {
    const dtHol38= new Holiday('12/23/2022'); 
    expect(dtHol38.isXMasEve()).toEqual(true);  
});

test('39. Holiday.isXMasEve() - Expected false from isXMasEve() method when date provided is not one of the business days closest to and including Dec 24th.', () => {
    const dtHol39 = new Holiday('12/24/2022'); 
    expect(dtHol39.isChristmasDays()).toEqual(false);  
});


