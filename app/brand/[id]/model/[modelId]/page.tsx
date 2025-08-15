'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { GET_MODEL } from '../../../../graphql/queries';
import { useState } from 'react';
import './modelDetails.css';

export default function ModelDetailsPage() {
  const params = useParams();
  const brandId = params?.id as string; // matches [id] folder
  const modelId = params?.modelId as string; // matches [modelId] folder

  const { data, loading, error } = useQuery(GET_MODEL, {
    variables: { brandId, modelId },
    skip: !brandId || !modelId
  });

  const [activeTab, setActiveTab] = useState<'specs' | 'musicians'>('specs');

  if (loading) return <p>Loading model...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  const model = data.findUniqueModel;

  return (
    <div className="model-details-page">
      <Link href={`/brand/${brandId}`} className="back-link">← Back To List</Link>

      <section className="model-header">
        <h1>{model.name}</h1>
        {model.image?.startsWith('http') ? (
          <img src={model.image} alt={model.name} width={150} height={150} />
        ) : (
          <Image src={model.image || '/images/placeholder.png'} alt={model.name} width={150} height={150} />
        )}
      </section>

      <div className="tabs">
        <button
          className={activeTab === 'specs' ? 'active' : ''}
          onClick={() => setActiveTab('specs')}
        >
          Specification
        </button>
        <button
          className={activeTab === 'musicians' ? 'active' : ''}
          onClick={() => setActiveTab('musicians')}
        >
          Who plays it?
        </button>
      </div>

      {activeTab === 'specs' && (
        <div className="specs-tab">
          <p className="description">{model.description}</p>
          <ul className="spec-list">
            <li>Body Wood: {model.specs.bodyWood}</li>
            <li>Neck Wood: {model.specs.neckWood}</li>
            <li>Fingerboard: {model.specs.fingerboardWood}</li>
            <li>Pickups: {model.specs.pickups}</li>
            <li>Tuners: {model.specs.tuners}</li>
            <li>Scale Length: {model.specs.scaleLength}</li>
            <li>Bridge: {model.specs.bridge}</li>
          </ul>
        </div>
      )}

      {activeTab === 'musicians' && (
        <div className="musicians-tab">
          <div className="musician-grid">
            {model.musicians?.map((m: any, idx: number) => (
              <div key={idx} className="musician-card">
                <img src={m.musicianImage} alt={m.name} />
                <h3>{m.name}</h3>
                {m.bands?.length > 0 && <p>{m.bands.join(', ')}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
