import type { MoonPhaseData } from "../interfaces/MoonPhaseData";

const fetchMoonPhaseData = async (): Promise<MoonPhaseData[] | null> => {
    try{
        const response = await fetch(`/api/chart/`);
        
        if(!response.ok){
            throw new Error(`Network response was not ok! Status: ${response.status}`);
        }

        const data: MoonPhaseData[] = await response.json();
        return data;
    } catch (error){
        console.error('Error fetching moon phase data:', error);
        return null;
    }
};

export default fetchMoonPhaseData;