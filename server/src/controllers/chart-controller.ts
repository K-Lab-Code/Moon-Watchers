import { Request, Response } from 'express';
// GET /chart
export const getMoonChart = async (_req: Request, res: Response) => {
    //gets the date from three days from now
    const now = new Date();
    now.setDate(now.getDate() + 3);
    let list: any[] = [];
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1)// Add leading zero if necessary
    let day = String(now.getDate());
    let date = (year + '-' + month + '-' + day);
    try {
        //This loop gets data from the moon api for the next 30 days and compiles them into one list.
        for (let i = 0; i < 5; i++) {
            const response = await fetch('https://api.viewbits.com/v1/moonphase?startdate=' + date);
            const data = await response.json();
            list = [...list, ...data];
            now.setDate(now.getDate() + 7);
            year = now.getFullYear();
            month = String(now.getMonth() + 1)
            day = String(now.getDate());
            date = (year + '-' + month + '-' + day);
        }
        const listMonth = list.slice(0, 30);
        //This code goes through the list and figures out the range of days each of the eight phases of the moon are going to be and forms a list.
        let moonphase: string = '';
        const moonList:any[] = [];
        let moonInfo:{moonPhase: string, startDate: string, endDate: string} = {moonPhase: '', startDate: '', endDate: ''};
        let lastDate: string = '';
        let count:number = 0;
        for (const obj of listMonth) {
            count++;
            if (moonphase !== obj.phase && moonphase === '') {
                moonInfo = {moonPhase: obj.phase, startDate: obj.date, endDate: ''}
                moonphase = obj.phase;

            } else if (moonphase !== obj.phase) {
                moonInfo.endDate = lastDate;
                moonList.push(moonInfo);
                moonInfo = {moonPhase: obj.phase, startDate: obj.date, endDate: ''};
                moonphase = obj.phase;
            }
            lastDate = obj.date;
            if(count === 30){
                moonInfo.endDate = lastDate;
                moonList.push(moonInfo);
                moonInfo = {moonPhase: obj.phase, startDate: obj.date, endDate: ''};
                moonphase = obj.phase;
            }
            if(moonList.length === 8){
                break;
            }

        }
        //this returns a list of the moon phases and there start and finsh date to the client.
        return res.json(moonList);
    }
    catch (err) {
        //returns an error messoge if something went wrong.
        res.status(400).send("The ERROR: " + err);
    }
    return res.status(400).send("Nothing Sent");
};


