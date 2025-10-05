import { Hero } from '../components/Hero';
import { Challenges } from '../components/Challenges';
import { Dashboard } from '../components/Dashboard';
import { Marketplace } from '../components/Marketplace';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  const handleNFTClick = (nftId: number) => {
    navigate(`/nft/${nftId}`);
  };

  return (
    <>
      <Hero />
      <Challenges />
      <Dashboard />
      <Marketplace onNFTClick={handleNFTClick} />
      <About />
      <Contact />
    </>
  );
}
