import { useParams, useNavigate } from 'react-router-dom';
import { NFTDetail } from '../components/NFTDetail';
import { nfts } from '../components/Marketplace';
import { useEffect } from 'react';

export function NFTDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const nft = nfts.find(n => n.id === Number(id));

  useEffect(() => {
    if (!nft) {
      navigate('/marketplace');
    }
  }, [nft, navigate]);

  if (!nft) {
    return null;
  }

  return <NFTDetail nft={nft} onBack={() => navigate(-1)} />;
}
