import html2pdf from 'html2pdf.js';
import { ITravelPackage } from '@/types/IPackages';

// Helper functions
const safeText = (text: string | undefined | null): string => {
    return text || 'N/A';
};

const safeArray = (arr: any[] | undefined | null): any[] => {
    return arr || [];
};

export const generateItineraryPDF = async (data: ITravelPackage): Promise<void> => {
    // Debug: Log the data to see what's available
    console.log('PDF Data:', data);

    // Create a container element
    const element = document.createElement('div');
    element.style.padding = '15px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.lineHeight = '1.4';
    element.style.color = '#333';
    element.style.fontSize = '11px';
    element.style.width = '100%';
    element.style.boxSizing = 'border-box';

    // Basic content structure with simplified CSS for better rendering
    element.innerHTML = `
    <style>
      .section { 
        margin-bottom: 15px; 
      }
      .day-item { 
        margin-bottom: 10px; 
        border-left: 3px solid #2c5530; 
        padding-left: 10px;
      }
      .info-grid {
        display: block;
        margin-bottom: 15px;
      }
      .info-item {
        background: #f9f9f9;
        padding: 6px;
        margin: 3px 0;
        border-radius: 3px;
      }
      .price-table {
        width: 100%;
        border-collapse: collapse;
        margin: 8px 0;
        font-size: 10px;
      }
      .price-table th, .price-table td {
        border: 1px solid #ddd;
        padding: 4px;
        text-align: left;
      }
      .price-table th {
        background-color: #2c5530;
        color: white;
      }
      h1 { 
        color: #2c5530; 
        margin: 0 0 12px 0; 
        font-size: 20px; 
      }
      h2 { 
        color: #2c5530; 
        border-bottom: 1px solid #2c5530; 
        padding-bottom: 3px; 
        margin: 12px 0 8px 0; 
        font-size: 14px;
      }
      h3 { 
        color: #2c5530; 
        margin: 0 0 4px 0; 
        font-size: 12px;
      }
      p { 
        margin: 3px 0; 
        line-height: 1.3;
      }
      ul { 
        margin: 3px 0; 
        padding-left: 12px;
      }
      li { 
        margin-bottom: 2px; 
      }
    </style>
    
    <div style="text-align: center; margin-bottom: 20px;">
      <h1>${safeText(data.name)}</h1>
      <p style="font-size: 12px; color: #666; margin: 6px 0;">Duration: ${safeText(data.duration)} | Location: ${safeText(data.location)}</p>
      <p style="font-size: 10px; color: #888; margin: 3px 0;">Difficulty: ${safeText(data.difficulty)} | Elevation: ${data.elevation || 'N/A'}m | Distance: ${data.distance || 'N/A'}km</p>
      <p style="font-size: 10px; color: #888; margin: 3px 0;">Category: ${data.categoryId?.name || 'N/A'} | Season: ${safeText(data.season)}</p>
    </div>
    
    <div class="section">
      <h2>Trip Information</h2>
      <div class="info-grid">
        <div class="info-item"><strong>Activity:</strong> ${safeText(data.activity)}</div>
        <div class="info-item"><strong>Group Size:</strong> ${safeText(data.groupSize)}</div>
        <div class="info-item"><strong>Vehicle:</strong> ${safeText(data.vehicle)}</div>
        <div class="info-item"><strong>Accommodation:</strong> ${safeText(data.accommodation)}</div>
        <div class="info-item"><strong>Meal:</strong> ${safeText(data.meal)}</div>
        <div class="info-item"><strong>Sub Category:</strong> ${data.subCategoryId?.name || 'N/A'}</div>
      </div>
    </div>
    
    <div class="section">
      <h2>Overview</h2>
      <p>${safeText(data.overview)}</p>
    </div>
    
    <div class="section">
      <h2>Attractions (${safeArray(data.attraction).length} items)</h2>
      ${safeArray(data.attraction).length > 0 ?
            safeArray(data.attraction).map(attraction => `
          <div style="margin-bottom: 8px;">
            <h3>${safeText(attraction.title)}</h3>
            <p>${safeText(attraction.description)}</p>
          </div>
        `).join('')
            : '<p>No attractions data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Daily Itinerary (${safeArray(data.itinerary).length} days)</h2>
      ${safeArray(data.itinerary).length > 0 ?
            safeArray(data.itinerary).map((day, index) => `
          <div class="day-item">
            <h3>Day ${safeText(day.days)}: ${safeText(day.title)}</h3>
            <p><strong>Description:</strong> ${safeText(day.description)}</p>
            <p><strong>Activity:</strong> ${safeText(day.activity)}</p>
            <p><strong>Duration:</strong> ${safeText(day.duration)}</p>
            <p><strong>Meals:</strong> ${safeText(day.meals)}</p>
            <p><strong>Accommodation:</strong> ${safeText(day.accommodation)}</p>
            ${day.maxAltitude ? `<p><strong>Max Altitude:</strong> ${safeText(day.maxAltitude)}</p>` : ''}
          </div>
        `).join('')
            : '<p>No itinerary data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>What's Included (${safeArray(data.inclusion).length} items)</h2>
      ${safeArray(data.inclusion).length > 0 ?
            safeArray(data.inclusion).map(item => `
          <div style="margin-bottom: 6px;">
            <h3>${safeText(item.title)}</h3>
            <p>${safeText(item.description)}</p>
          </div>
        `).join('')
            : '<p>No inclusion data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>What's Excluded (${safeArray(data.exclusion).length} items)</h2>
      ${safeArray(data.exclusion).length > 0 ?
            safeArray(data.exclusion).map(item => `
          <div style="margin-bottom: 6px;">
            <h3>${safeText(item.title)}</h3>
            <p>${safeText(item.description)}</p>
          </div>
        `).join('')
            : '<p>No exclusion data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Requirements (${safeArray(data.requirements).length} items)</h2>
      ${safeArray(data.requirements).length > 0 ?
            safeArray(data.requirements).map(item => `
          <div style="margin-bottom: 6px;">
            <h3>${safeText(item.title)}</h3>
            <p>${safeText(item.description)}</p>
          </div>
        `).join('')
            : '<p>No requirements data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Insurance Information (${safeArray(data.insurance).length} items)</h2>
      ${safeArray(data.insurance).length > 0 ?
            safeArray(data.insurance).map(item => `
          <div style="margin-bottom: 6px;">
            <h3>${safeText(item.title)}</h3>
            <p>${safeText(item.description)}</p>
          </div>
        `).join('')
            : '<p>No insurance data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Gear Information (${safeArray(data.gearInfo).length} items)</h2>
      ${safeArray(data.gearInfo).length > 0 ?
            safeArray(data.gearInfo).map(item => `
          <div style="margin-bottom: 6px;">
            <h3>${safeText(item.title)}</h3>
            <p>${safeText(item.description)}</p>
          </div>
        `).join('')
            : '<p>No gear info data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Why Love This Trek (${safeArray(data.whyLoveThisTrek).length} items)</h2>
      ${safeArray(data.whyLoveThisTrek).length > 0 ?
            safeArray(data.whyLoveThisTrek).map(item => `
          <div style="margin-bottom: 6px;">
            <h3>${safeText(item.title)}</h3>
            <p>${safeText(item.description)}</p>
          </div>
        `).join('')
            : '<p>No "why love this trek" data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Important Notice (${safeArray(data.importantNotice).length} items)</h2>
      ${safeArray(data.importantNotice).length > 0 ?
            safeArray(data.importantNotice).map(item => `
          <div style="margin-bottom: 6px;">
            <h3>${safeText(item.title)}</h3>
            <p>${safeText(item.description)}</p>
          </div>
        `).join('')
            : '<p>No important notice data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Pricing Information (${safeArray(data.pax).length} items)</h2>
      ${safeArray(data.pax).length > 0 ? `
        <table class="price-table">
          <thead>
            <tr>
              <th>Group Size (Min-Max)</th>
              <th>Price per Person</th>
            </tr>
          </thead>
          <tbody>
            ${safeArray(data.pax).map(paxInfo => `
              <tr>
                <td>${paxInfo.min} - ${paxInfo.max} persons</td>
                <td>$${paxInfo.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<p>No pricing data available</p>'}
    </div>
    
    <div class="section">
      <h2>Fixed Departure Dates (${safeArray(data.fixedDates).length} items)</h2>
      ${safeArray(data.fixedDates).length > 0 ? `
        <table class="price-table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price per Person</th>
              <th>Available Seats</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${safeArray(data.fixedDates).map(date => `
              <tr>
                <td>${new Date(date.startDate).toLocaleDateString()}</td>
                <td>${new Date(date.endDate).toLocaleDateString()}</td>
                <td>$${date.pricePerPerson}</td>
                <td>${date.availableSeats}</td>
                <td>${safeText(date.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<p>No fixed dates data available</p>'}
    </div>
    
    <div class="section">
      <h2>Add-ons (${safeArray(data.addons).length} items)</h2>
      ${safeArray(data.addons).length > 0 ?
            safeArray(data.addons).map(addon => `
          <div style="margin-bottom: 8px; border: 1px solid #ddd; padding: 8px; border-radius: 3px;">
            <h3>${safeText(addon.name)} - $${addon.price}</h3>
            <p>${safeText(addon.description)}</p>
          </div>
        `).join('')
            : '<p>No add-ons data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Seasonal Trek Information (${safeArray(data.seasonalTrek).length} items)</h2>
      ${safeArray(data.seasonalTrek).length > 0 ?
            safeArray(data.seasonalTrek).map(trek => `
          <div style="margin-bottom: 8px;">
            <h3>${safeText(trek.title)}</h3>
            <p>${safeText(trek.description)}</p>
          </div>
        `).join('')
            : '<p>No seasonal trek data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Frequently Asked Questions (${safeArray(data.faq).length} items)</h2>
      ${safeArray(data.faq).length > 0 ?
            safeArray(data.faq).map(faq => `
          <div style="margin-bottom: 10px;">
            <h3>Q: ${safeText(faq.title)}</h3>
            <p><strong>A:</strong> ${safeText(faq.description)}</p>
          </div>
        `).join('')
            : '<p>No FAQ data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Testimonials (${safeArray(data.testimonial).length} items)</h2>
      ${safeArray(data.testimonial).length > 0 ?
            safeArray(data.testimonial).map(testimonial => `
          <div style="margin-bottom: 10px; border-left: 3px solid #2c5530; padding-left: 10px;">
            <p><strong>${safeText(testimonial.fullName)}</strong> - ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</p>
            <p>"${safeText(testimonial.comment)}"</p>
          </div>
        `).join('')
            : '<p>No testimonials data available</p>'
        }
    </div>
    
    <div class="section">
      <h2>Additional Information</h2>
      <p><strong>Route Map:</strong> ${data.routeMap ? 'Available' : 'Not available'}</p>
      <p><strong>Cover Image:</strong> ${data.coverImage ? 'Available' : 'Not available'}</p>
      <p><strong>Slug:</strong> ${safeText(data.slug)}</p>
      <p><strong>Created:</strong> ${data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Updated:</strong> ${data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'N/A'}</p>
    </div>
  `;

    // Generate PDF with improved settings for better pagination
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${data.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-itinerary.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            letterRendering: true,
            height: window.innerHeight,
            width: window.innerWidth
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('PDF generation failed:', error);
        throw new Error('Failed to generate PDF');
    }
};
