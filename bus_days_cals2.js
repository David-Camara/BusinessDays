'use strict'
const Holiday = require('./holiday');
//*create main function to count business days taking into accoutn dec 24th half day
//*count cal days as well

const getDateDiff = (dt1, dt2 = new Date()) => {
    let dt1B = new Holiday(dt1);
    let dt2B = new Holiday(dt2);
    if (dt1B.bDate && dt1B.bDate) { 
        if (dt1B.getTime() > dt2B.getTime()) {
            [dt1B, dt2B] = [dt2B, dt1B];
        } 

        let dtIterable = new Holiday(dt1B);
        let iCalDays = 0, fBusDays = 0.0;
        do {
            if (!dtIterable.bHoliday && !dtIterable.bWeekend) {
                fBusDays++;
            } else if (dtIterable.bXMASEve) {
                fBusDays = fBusDays + 0.5; //christmas eve is a half day
            } 
            iCalDays++;
            dtIterable = new Holiday(dtIterable.addDay(1));
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