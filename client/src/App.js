import React, { useState } from 'react';
import axios from 'axios';
import TripForm from './components/TripForm';
import Loading from './components/Loading';
import Results from './components/Results';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [view, setView] = useState('form'); // form, loading, results, error
  const [tripData, setTripData] = useState(null);
  const [itineraryData, setItineraryData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setTripData(formData);
    setView('loading');
    setError('');

    try {
      const response = await axios.post(`${API_URL}/generate-itinerary`, formData);
      
      if (response.data.success) {
        setItineraryData(response.data.data);
        setView('results');
      } else {
        throw new Error(response.data.error || 'Failed to generate itinerary');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || err.message || 'Something went wrong');
      setView('error');
    }
  };

  const handleReset = () => {
    setView('form');
    setTripData(null);
    setItineraryData(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-sky" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="bg-navy text-white py-5 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <i className="fas fa-plane-departure text-teal text-2xl"></i>
            <h1 className="text-2xl font-bold">Travel Itinerary Assistant</h1>
          </div>
          <p className="text-center mt-2 text-teal text-sm">Plan your perfect trip with personalized recommendations</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {view === 'form' && <TripForm onSubmit={handleSubmit} />}
        {view === 'loading' && <Loading />}
        {view === 'results' && (
          <Results 
            tripData={tripData} 
            itineraryData={itineraryData} 
            onReset={handleReset} 
          />
        )}
        {view === 'error' && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-sky">
            <i className="fas fa-exclamation-circle text-coral text-5xl mb-4"></i>
            <h3 className="text-xl font-semibold text-navy mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-3 bg-ocean text-white rounded-lg hover:bg-ocean/90 transition"
            >
              <i className="fas fa-redo mr-2"></i>Try Again
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm flex items-center justify-center gap-2">
            <i className="fas fa-globe-americas text-teal"></i>
            Travel Itinerary Assistant
          </p>
          <p className="text-xs text-gray-500 mt-1">Plan smarter, travel better</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
