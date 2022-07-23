'use strict'
const {isDate, isWeekend, addDay, isXMasEve, isHoliday} = require('./day_calcs');
//*create main function to count business days taking into accoutn dec 24th half day
//*count cal days as well

const getDateDiff = (dt1, dt2 = new Date()) => {
    if (isDate(dt1) && isDate(dt1)) {
        let dt1B = new Date(dt1);
        dt1B.setHours(0,0,0,0);
        let dt2B = new Date(dt2);
        dt2B.setHours(0,0,0,0);
        
        if (dt1B.getTime() > dt2B.getTime()) {
            [dt1B, dt2B] = [dt2B, dt1B];
        } 

        let dtIterable = new Date(dt1B);
        let iCalDays = 0, fBusDays = 0.0;
        do {
            if (!isHoliday(dtIterable) && !isWeekend(dtIterable)) {
                //console.log('fBusDays:',fBusDays);
                //console.log('dtIterable:',dtIterable);
                if (isXMasEve(dtIterable)) {
                    fBusDays = fBusDays + 0.5; //christmas eve is a half day
                } else fBusDays++;
            }
            iCalDays++;
            dtIterable = addDay(dtIterable, 1);
        } while(dtIterable.getTime() <= dt2B.getTime());

        return {
            'Date1': dt1,
            'Date2': dt2,
            'BusDays': fBusDays,
            'CalDays': iCalDays
        };
    } else return {
        'Date1': dt1,
        'Date2': dt2,
        'BusDays': -1,
        'CalDays': -1
    };
}

module.exports = getDateDiff;