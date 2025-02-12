import  { useEffect, useState } from 'react';
import { MoonPhaseData } from '../interfaces/MoonPhaseData';
import fetchMoonPhaseData from '../api/chartAPI';

const MoonPhaseChart = () => {
  const [data, setData] = useState<MoonPhaseData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMoonPhases = async () => {
      setLoading(true);
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1)// Add leading zero if necessary
      const day = String(now.getDate());
      const date = (year + '-' + month + '-' + day);
      let result = JSON.parse(localStorage.getItem(date) as string);
      if(!result){
      result = await fetchMoonPhaseData(); // No startDate/endDate needed
      localStorage.setItem(date, JSON.stringify(result));
      }
      if (result) {
        setData(result);
      } else {
        setError('Failed to fetch moon phase data.');
      }
      setLoading(false);
    };

    getMoonPhases();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Moon Phase Chart</h2>
      <ul>
        {data?.map((phase, index) => (
          <li key={index}>
            {phase.moonPhase}: {phase.startDate} - {phase.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoonPhaseChart;