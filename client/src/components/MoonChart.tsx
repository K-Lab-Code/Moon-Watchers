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
      const result = await fetchMoonPhaseData(); // No startDate/endDate needed
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
            {phase.moonphase}: {phase.startDate} - {phase.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoonPhaseChart;