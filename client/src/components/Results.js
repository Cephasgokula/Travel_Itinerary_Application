import React from 'react';

function Results({ tripData, itineraryData, onReset }) {
  const { destination, startDate, endDate, interests, budget, days } = tripData;
  const { highlights, itinerary, budget: budgetData } = itineraryData;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const budgetLabels = { low: 'Budget', medium: 'Moderate', high: 'Luxury' };

  return (
    <div className="space-y-6">
      {/* Trip Header */}
      <div className="bg-[#003049] rounded-xl p-6 text-white shadow-md">
        <h2 className="text-2xl font-bold mb-1">Your Trip to {destination}</h2>
        <p className="text-[#00A8CC] mb-4">{formatDate(startDate)} - {formatDate(endDate)}</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            <i className="fas fa-heart text-[#F85F73] mr-1"></i>{interests.join(', ')}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            <i className="fas fa-wallet text-[#00A8CC] mr-1"></i>{budgetLabels[budget]}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            <i className="fas fa-calendar text-[#00A8CC] mr-1"></i>{days} days
          </span>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-[#E3F6FF]">
        <h3 className="text-lg font-semibold text-[#003049] mb-4 flex items-center gap-2">
          <i className="fas fa-star text-[#F85F73]"></i>
          Destination Highlights
        </h3>

        {/* Top Attractions */}
        <div className="mb-6">
          <h4 className="font-medium text-[#003049] mb-3">
            <i className="fas fa-trophy text-[#00A8CC] mr-2"></i>Top Attractions
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {highlights.topAttractions.map((item, index) => (
              <div key={index} className="bg-[#E3F6FF] rounded-lg p-4 border-l-4 border-[#0A6EBD]">
                <div className="flex items-start gap-3">
                  <span className="bg-[#0A6EBD] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h5 className="font-semibold text-[#003049]">{item.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">{item.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden Gems */}
        <div>
          <h4 className="font-medium text-[#003049] mb-3">
            <i className="fas fa-gem text-[#F85F73] mr-2"></i>Hidden Gems
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {highlights.offbeatRecommendations.map((item, index) => (
              <div key={index} className="bg-[#FFF0F2] rounded-lg p-4 border border-[#F85F73]/30">
                <div className="flex items-start gap-3">
                  <i className="fas fa-sparkles text-[#F85F73] mt-1"></i>
                  <div>
                    <h5 className="font-semibold text-[#003049]">{item.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">{item.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day-by-Day Itinerary */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-[#E3F6FF]">
        <h3 className="text-lg font-semibold text-[#003049] mb-4 flex items-center gap-2">
          <i className="fas fa-route text-[#0A6EBD]"></i>
          Day-by-Day Itinerary
        </h3>

        <div className="space-y-4">
          {itinerary.map((day, index) => (
            <div key={index} className="border border-[#E3F6FF] rounded-lg overflow-hidden">
              <div className="bg-[#003049] text-white px-4 py-3">
                <h4 className="font-semibold">Day {day.day}: {day.title}</h4>
              </div>
              <div className="p-4 space-y-4">
                {/* Morning */}
                <div className="flex gap-4">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium h-fit">
                    <i className="fas fa-sun mr-1"></i>Morning
                  </span>
                  <div className="flex-1">
                    <h5 className="font-medium text-[#003049]">{day.morning.activity}</h5>
                    <p className="text-sm text-gray-600">
                      <i className="fas fa-map-marker-alt text-[#F85F73] mr-1"></i>{day.morning.location}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <i className="fas fa-clock mr-1"></i>{day.morning.duration}
                      <span className="mx-2">•</span>
                      <i className="fas fa-car mr-1"></i>{day.morning.travelTime}
                    </p>
                  </div>
                </div>

                {/* Afternoon */}
                <div className="flex gap-4">
                  <span className="bg-[#E3F6FF] text-[#0A6EBD] px-3 py-1 rounded-full text-sm font-medium h-fit">
                    <i className="fas fa-cloud-sun mr-1"></i>Afternoon
                  </span>
                  <div className="flex-1">
                    <h5 className="font-medium text-[#003049]">{day.afternoon.activity}</h5>
                    <p className="text-sm text-gray-600">
                      <i className="fas fa-map-marker-alt text-[#F85F73] mr-1"></i>{day.afternoon.location}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <i className="fas fa-clock mr-1"></i>{day.afternoon.duration}
                      <span className="mx-2">•</span>
                      <i className="fas fa-car mr-1"></i>{day.afternoon.travelTime}
                    </p>
                  </div>
                </div>

                {/* Evening */}
                <div className="flex gap-4">
                  <span className="bg-[#003049] text-white px-3 py-1 rounded-full text-sm font-medium h-fit">
                    <i className="fas fa-moon mr-1"></i>Evening
                  </span>
                  <div className="flex-1">
                    <h5 className="font-medium text-[#003049]">{day.evening.activity}</h5>
                    <p className="text-sm text-gray-600">
                      <i className="fas fa-map-marker-alt text-[#F85F73] mr-1"></i>{day.evening.location}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <i className="fas fa-clock mr-1"></i>{day.evening.duration}
                      <span className="mx-2">•</span>
                      <i className="fas fa-car mr-1"></i>{day.evening.travelTime}
                    </p>
                  </div>
                </div>

                {/* Tip */}
                {day.tip && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                    <p className="text-sm text-amber-800">
                      <i className="fas fa-lightbulb text-amber-500 mr-2"></i>
                      <strong>Tip:</strong> {day.tip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-[#E3F6FF]">
        <h3 className="text-lg font-semibold text-[#003049] mb-4 flex items-center gap-2">
          <i className="fas fa-calculator text-[#00A8CC]"></i>
          Budget Estimation
        </h3>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#E3F6FF] rounded-lg p-4 text-center">
            <i className="fas fa-bed text-[#0A6EBD] text-xl mb-2"></i>
            <h5 className="font-medium text-[#003049]">Accommodation</h5>
            <p className="text-2xl font-bold text-[#0A6EBD]">₹{budgetData.accommodation.total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-500">₹{budgetData.accommodation.perNight.toLocaleString('en-IN')}/night</p>
            <p className="text-xs text-gray-600 mt-1">{budgetData.accommodation.description}</p>
          </div>

          <div className="bg-[#FFF0F2] rounded-lg p-4 text-center">
            <i className="fas fa-utensils text-[#F85F73] text-xl mb-2"></i>
            <h5 className="font-medium text-[#003049]">Food</h5>
            <p className="text-2xl font-bold text-[#F85F73]">₹{budgetData.food.total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-500">₹{budgetData.food.perDay.toLocaleString('en-IN')}/day</p>
            <p className="text-xs text-gray-600 mt-1">{budgetData.food.description}</p>
          </div>

          <div className="bg-[#E8FFF8] rounded-lg p-4 text-center">
            <i className="fas fa-taxi text-[#00A8CC] text-xl mb-2"></i>
            <h5 className="font-medium text-[#003049]">Transport</h5>
            <p className="text-2xl font-bold text-[#00A8CC]">₹{budgetData.transport.total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-500">₹{budgetData.transport.perDay.toLocaleString('en-IN')}/day</p>
            <p className="text-xs text-gray-600 mt-1">{budgetData.transport.description}</p>
          </div>

          <div className="bg-[#F5F0FF] rounded-lg p-4 text-center">
            <i className="fas fa-ticket-alt text-[#7C3AED] text-xl mb-2"></i>
            <h5 className="font-medium text-[#003049]">Activities</h5>
            <p className="text-2xl font-bold text-[#7C3AED]">₹{budgetData.activities.total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-xs text-gray-600 mt-1">{budgetData.activities.description}</p>
          </div>
        </div>

        <div className="bg-[#003049] rounded-lg p-6 text-white text-center">
          <h4 className="text-lg font-medium mb-1">Estimated Total</h4>
          <p className="text-4xl font-bold text-[#00A8CC]">₹{budgetData.grandTotal.toLocaleString('en-IN')} <span className="text-lg font-normal text-white">INR</span></p>
          <p className="text-gray-300 text-sm mt-1">For {days} days in {destination}</p>
        </div>

        {budgetData.tips && (
          <div className="bg-[#E3F6FF] rounded-lg p-4 mt-4">
            <p className="text-sm text-[#003049]">
              <i className="fas fa-info-circle text-[#0A6EBD] mr-2"></i>
              <strong>Budget Tips:</strong> {budgetData.tips}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#003049] text-white rounded-lg hover:bg-[#003049]/90 transition flex items-center gap-2"
        >
          <i className="fas fa-print"></i>Print Itinerary
        </button>
        <button 
          onClick={onReset}
          className="px-6 py-3 bg-[#F85F73] text-white rounded-lg hover:bg-[#e54d61] transition flex items-center gap-2"
        >
          <i className="fas fa-redo"></i>Plan New Trip
        </button>
      </div>
    </div>
  );
}

export default Results;
