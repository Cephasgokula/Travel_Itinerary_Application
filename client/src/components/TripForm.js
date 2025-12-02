import React, { useState, useEffect } from 'react';

const interests = [
  { id: 'beaches', label: 'Beaches', icon: 'fa-umbrella-beach' },
  { id: 'history', label: 'History', icon: 'fa-landmark' },
  { id: 'nightlife', label: 'Nightlife', icon: 'fa-moon' },
  { id: 'nature', label: 'Nature', icon: 'fa-tree' },
  { id: 'food', label: 'Food', icon: 'fa-utensils' },
  { id: 'adventure', label: 'Adventure', icon: 'fa-hiking' },
  { id: 'culture', label: 'Culture', icon: 'fa-theater-masks' },
  { id: 'shopping', label: 'Shopping', icon: 'fa-shopping-bag' },
];

const budgetOptions = [
  { value: 'low', label: 'Budget', icon: 'fa-coins', desc: 'Economical' },
  { value: 'medium', label: 'Moderate', icon: 'fa-wallet', desc: 'Balanced' },
  { value: 'high', label: 'Luxury', icon: 'fa-gem', desc: 'Premium' },
];

function TripForm({ onSubmit }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [budget, setBudget] = useState('');
  const [tripDays, setTripDays] = useState(0);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTripDays(diffDays);
    } else {
      setTripDays(0);
    }
  }, [startDate, endDate]);

  const toggleInterest = (id) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest!');
      return;
    }
    
    if (!budget) {
      alert('Please select a budget range!');
      return;
    }

    const days = Math.min(Math.max(tripDays, 3), 5);

    onSubmit({
      destination,
      startDate,
      endDate,
      days,
      interests: selectedInterests,
      budget
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-[#E3F6FF]">
      <h2 className="text-xl font-semibold text-[#003049] mb-6 flex items-center gap-2">
        <i className="fas fa-map-marked-alt text-[#0A6EBD]"></i>
        Tell us about your trip
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-[#003049] font-medium mb-2">
            <i className="fas fa-location-dot text-[#00A8CC] mr-2"></i>Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Paris, Tokyo, Bali..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0A6EBD] focus:ring-2 focus:ring-[#E3F6FF] outline-none transition"
            required
          />
        </div>

        {/* Travel Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#003049] font-medium mb-2">
              <i className="fas fa-calendar-alt text-[#00A8CC] mr-2"></i>Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0A6EBD] focus:ring-2 focus:ring-[#E3F6FF] outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-[#003049] font-medium mb-2">
              <i className="fas fa-calendar-check text-[#00A8CC] mr-2"></i>End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0A6EBD] focus:ring-2 focus:ring-[#E3F6FF] outline-none transition"
              required
            />
          </div>
        </div>

        {/* Trip Duration */}
        {tripDays > 0 && (
          <div className={`rounded-lg p-3 text-center font-medium ${
            tripDays >= 3 && tripDays <= 5 
              ? 'bg-[#E3F6FF] text-[#0A6EBD]' 
              : 'bg-orange-50 text-orange-700'
          }`}>
            <i className="fas fa-clock mr-2"></i>
            {tripDays} day{tripDays > 1 ? 's' : ''} trip
            {tripDays < 3 && ' - We recommend at least 3 days'}
            {tripDays > 5 && ' - We recommend 3-5 days for best results'}
            {tripDays >= 3 && tripDays <= 5 && ' - Perfect!'}
          </div>
        )}

        {/* Interests */}
        <div>
          <label className="block text-[#003049] font-medium mb-3">
            <i className="fas fa-heart text-[#F85F73] mr-2"></i>What are you interested in?
          </label>
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  selectedInterests.includes(interest.id)
                    ? 'bg-[#0A6EBD] text-white border-[#0A6EBD]'
                    : 'border-gray-300 hover:border-[#00A8CC] text-[#003049]'
                }`}
              >
                <i className={`fas ${interest.icon} mr-2`}></i>
                {interest.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-[#003049] font-medium mb-3">
            <i className="fas fa-wallet text-[#00A8CC] mr-2"></i>Budget Range
          </label>
          <div className="grid grid-cols-3 gap-3">
            {budgetOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setBudget(option.value)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  budget === option.value
                    ? 'bg-[#0A6EBD] text-white border-[#0A6EBD]'
                    : 'border-gray-300 hover:border-[#00A8CC] text-[#003049]'
                }`}
              >
                <i className={`fas ${option.icon} text-xl mb-2 ${budget === option.value ? 'text-white' : 'text-[#00A8CC]'}`}></i>
                <p className="font-semibold">{option.label}</p>
                <p className="text-xs opacity-75">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F85F73] hover:bg-[#e54d61] text-white py-4 rounded-lg font-semibold text-lg transition shadow-md flex items-center justify-center gap-2"
        >
          <i className="fas fa-magic"></i>
          Generate My Itinerary
        </button>
      </form>
    </div>
  );
}

export default TripForm;
