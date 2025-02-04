import { Request, Response } from 'express';
// GET /chart
export const getMoonChart = async (_req: Request, res: Response) => {
    //placeholder
    const now = new Date();
    now.setDate(now.getDate() + 3);
    let list: any[] = [];
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1)// Add leading zero if necessary
    let day = String(now.getDate());
    let date = (year + '-' + month + '-' + day);
    try {
        for (let i = 0; i < 5; i++) {
            const response = await fetch('https://api.viewbits.com/v1/moonphase?startdate=' + date);
            const data = await response.json();
            list = [...list, ...data];
            now.setDate(now.getDate() + 7);
            year = now.getFullYear();
            month = String(now.getMonth() + 1)// Add leading zero if necessary
            day = String(now.getDate());
            date = (year + '-' + month + '-' + day);
        }
        const listMonth = list.slice(0, 30);
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

        return res.json(moonList);
    }
    catch (err) {
        res.send("The ERROR: " + err);
    }
    return res.send("Nothing Sent");
};


/*
        for (let i = 0; i < 1; i++) {
            const response = await fetch('https://api.viewbits.com/v1/moonphase?startdate=' + date);
            const data = await response.json();
            if (list.length === 0) {
                list.push(data[3]);
            }
            list.push(data[4], data[5], data[6]);
            date = data[6].date;
        }




    function sendChart() {
        console.log(list.length);
        return res.json(list);
    }

        let count = 0;
        const intervalId =  setInterval(async function fetchData() {
            console.log(count);
            const response = await fetch('https://api.viewbits.com/v1/moonphase?startdate=' + date);
            console.log('fetch');
            const data = await response.json();

            if (list.length === 0) {
                list.push(data[3]);
            }
            list.push(data[4], data[5], data[6]);
            date = data[6].date;

            count++;
            if (count >= 5) { // or any condition to stop the interval
                clearInterval(intervalId);
                sendChart();
            }
        }, 250);

        export const getMoonChart = async (_req: Request, res: Response) => {
    //placeholder
    const now = new Date();
    const list: any[] = [];
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1)// Add leading zero if necessary
    const day = String(now.getDate());
    let date = (year + '-' + month + '-' + day);
    try {
        for (let i = 0; i < 5; i++) {
            const response = await fetch('https://api.viewbits.com/v1/moonphase?startdate=' + date);
            const data = await response.json();
            if (list.length === 0) {
                list.push(data[3]);
            }
            list.push(data[4], data[5], data[6]);
            date = data[6].date;
        }
    }
    catch (err) {
        res.send("The ERROR: " + err);
    }
    console.log(list.length);
    return res.json(list);
};
            */