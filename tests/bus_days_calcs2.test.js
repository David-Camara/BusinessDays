const getDateDiff = require('../bus_days_cals2');
//https://jestjs.io/docs/getting-started
test('1 getDateDiff() - Expected Object with correct business days and calendar days returned from getDateDiff() method.', () => {
  const sDtA1 = '04/01/2022';
  const sDtB1 = '04/30/2022';
  const oResults = {
    "BusDays": 20, 
    "CalDays": 30, 
    "Date1": "04/01/2022", 
    "Date2": "04/30/2022"
  }
  expect(getDateDiff(sDtA1, sDtB1)).toEqual(oResults);  
});

  test('2 getDateDiff() - Expected default Object returned when either date is not a valid date from getDateDiff() method.', () => {
    const sDtA2 = 'Hello';
    const sDtB2 = 'There';
    const oResults = {
      "BusDays": -1, 
      "CalDays": -1, 
      "Date1": "Hello", 
      "Date2": "There"
    }
    expect(getDateDiff(sDtA2, sDtB2)).toEqual(oResults);  
  });

  test('3 getDateDiff() - Expected default Object returned dates in the same order as they were passed even if the second date is an earlier date. It will switch the 2 dates in the code.', () => {
    const sDtA3 = '04/30/2022';
    const sDtB3 = '04/01/2022';
    const oResults = {
      "BusDays": 20, 
      "CalDays": 30, 
      "Date1": "04/30/2022", 
      "Date2": "04/01/2022"
    }
    expect(getDateDiff(sDtA3, sDtB3)).toEqual(oResults);  
  });

  test('4 getDateDiff() - Expected half a day added to business days when Dec 24th holiday is in between the dates provided.', () => {
    const sDtA4 = '12/01/2022';
    const sDtB4 = '01/31/2023';
    const oResults = {
      "BusDays": 40.5, 
      "CalDays": 62, 
      "Date1": "12/01/2022", 
      "Date2": "01/31/2023"
    };
    expect(getDateDiff(sDtA4, sDtB4)).toEqual(oResults);  
  });


