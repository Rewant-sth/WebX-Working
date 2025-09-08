"use client";

import { useEffect, useState, useRef } from "react";
import { ITravelPackage } from "@/types/IPackages";
import Link from "next/link";
import api from "@/service/api";
import { Icon } from "@iconify/react/dist/iconify.js";
import html2pdf from 'html2pdf.js';

const RightBar = ({ data }: { data: ITravelPackage | undefined }) => {
  const [price, setPrice] = useState<number | null>(null);

  const getLowestPrice = async () => {
    try {
      const response = await api.get("/lowest-price");
      setPrice(response.data.data.pricePerPerson);
    } catch (error) {
      console.error("Error fetching lowest price:", error);
    }
  };

  useEffect(() => {
    getLowestPrice();
  }, []);



  const [hovered, setHovered] = useState<"date" | "enquiry" | "download" | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const isEnquiryActive = hovered === "enquiry";
  const isDownloadHovered = hovered === "download";

  const generatePdf = () => {
    if (!data) return;
    
    setIsGeneratingPdf(true);
    
    try {
      // Get current date for the PDF
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Create a professional HTML content
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${data.name} - Complete Itinerary</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
            
            body { 
              font-family: 'Montserrat', Arial, sans-serif; 
              line-height: 1.8; 
              color: #333; 
              max-width: 1000px; 
              margin: 0 auto; 
              padding: 40px;
              background-color: #f9f9f9;
            }
            
            .container {
              background: white;
              border-radius: 8px;
              box-shadow: 0 0 30px rgba(0,0,0,0.1);
              padding: 50px;
              margin: 20px auto;
              position: relative;
              overflow: hidden;
            }
            
            .header { 
              text-align: center; 
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #f5f5f5;
            }
            
            h1 { 
              color: #f05e25; 
              font-size: 2.2em;
              margin: 0 0 10px 0;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            .trip-info {
              color: #666;
              font-size: 1.1em;
              margin-bottom: 15px;
              font-weight: 500;
            }
            
            .cover-image { 
              width: 100%; 
              max-height: 400px;
              object-fit: cover;
              border-radius: 8px;
              margin: 30px 0;
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            .section {
              margin-bottom: 40px;
            }
            
            h2 { 
              color: #2c3e50; 
              font-size: 1.5em;
              border-bottom: 2px solid #f05e25; 
              padding-bottom: 10px;
              margin: 40px 0 25px 0;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .overview {
              font-size: 1.05em;
              color: #444;
              line-height: 1.8;
            }
            
            .itinerary-day {
              margin-bottom: 30px;
              padding: 25px;
              background: #fff9f7;
              border-left: 4px solid #f05e25;
              border-radius: 0 8px 8px 0;
              position: relative;
              box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            
            .day-title { 
              color: #f05e25; 
              font-weight: 600;
              font-size: 1.2em;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .day-title:before {
              content: '📅';
              font-size: 1.2em;
            }
            
            .day-description {
              color: #555;
              line-height: 1.8;
              padding-left: 15px;
              margin-left: 8px;
              border-left: 2px solid #ffd8c9;
            }
            
            .highlight-box {
              background: #f8f9fa;
              border-left: 4px solid #f05e25;
              padding: 20px;
              margin: 25px 0;
              border-radius: 0 6px 6px 0;
            }
            
            .highlights-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 15px;
              margin-top: 15px;
            }
            
            .highlight-item {
              display: flex;
              align-items: flex-start;
              gap: 10px;
              padding: 10px;
              background: white;
              border-radius: 6px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            
            .highlight-icon {
              color: #f05e25;
              font-size: 1.2em;
              margin-top: 2px;
            }
            
            .included-items, .excluded-items {
              margin: 20px 0;
              flex: 1;
              min-width: 280px;
            }
            
            .included-items h3, .excluded-items h3 {
              color: #2c3e50;
              margin-bottom: 15px;
              font-size: 1.2em;
              padding-bottom: 8px;
              border-bottom: 2px solid;
            }
            
            .included-items h3 {
              color: #28a745;
              border-color: #28a745;
            }
            
            .excluded-items h3 {
              color: #dc3545;
              border-color: #dc3545;
            }
            
            .included-list, .excluded-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            
            .included-list li, .excluded-list li {
              padding: 10px 0;
              display: flex;
              align-items: flex-start;
              gap: 10px;
              border-bottom: 1px dashed #eee;
            }
            
            .included-list li:before {
              content: '✓';
              color: #28a745;
              font-weight: bold;
              flex-shrink: 0;
            }
            
            .excluded-list li:before {
              content: '✗';
              color: #dc3545;
              font-weight: bold;
              flex-shrink: 0;
            }
            
            .page-break {
              page-break-before: always;
              padding-top: 40px;
            }
            
            .footer { 
              margin-top: 60px; 
              padding-top: 30px; 
              border-top: 1px solid #eee; 
              text-align: center; 
              color: #666;
              font-size: 0.95em;
            }
            
            .contact-info {
              margin: 15px 0;
              display: flex;
              justify-content: center;
              gap: 20px;
              flex-wrap: wrap;
            }
            
            .contact-item {
              display: flex;
              align-items: center;
              gap: 8px;
              font-weight: 500;
            }
            
            .contact-icon {
              color: #f05e25;
            }
            
            .print-button {
              margin: 30px auto 0;
              padding: 12px 30px;
              background: #f05e25;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 1em;
              font-weight: 600;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              transition: all 0.3s ease;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              box-shadow: 0 2px 5px rgba(240, 94, 37, 0.3);
            }
            
            .print-button:hover {
              background: #e04a1b;
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(240, 94, 37, 0.4);
            }
            
            .quick-facts {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
              margin: 20px 0 30px;
            }
            
            .fact-item {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 6px;
              border-left: 3px solid #f05e25;
            }
            
            .fact-label {
              font-size: 0.85em;
              color: #666;
              margin-bottom: 5px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .fact-value {
              font-weight: 600;
              color: #2c3e50;
            }
            
            @media print {
              body { 
                padding: 0;
                background: white;
                font-size: 12px;
              }
              
              .container {
                box-shadow: none;
                padding: 20px;
                margin: 0;
              }
              
              .no-print { 
                display: none; 
              }
              
              .page-break {
                page-break-before: always;
                padding-top: 20px;
              }
              
              .itinerary-day {
                page-break-inside: avoid;
              }
              
              h2 {
                page-break-after: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header Section -->
            <div class="header">
              <h1>${data.name}</h1>
              <div class="trip-info">
                ${data.location} • ${data.duration} Days • Generated on ${currentDate}
              </div>
              ${data.difficulty ? `<div style="color: #f05e25; font-weight: 600; margin-top: 5px;">${data.difficulty} Difficulty</div>` : ''}
            </div>
            
            <!-- Cover Image -->
            ${data.coverImage ? `
              <div style="text-align: center;">
                <img src="${data.coverImage}" alt="${data.name}" class="cover-image">
              </div>
            ` : ''}
            
            <!-- Quick Facts -->
            <div class="section">
              <h2>Quick Facts</h2>
              <div class="quick-facts">
                ${data.duration ? `
                  <div class="fact-item">
                    <div class="fact-label">Duration</div>
                    <div class="fact-value">${data.duration} Days</div>
                  </div>
                ` : ''}
                
                ${data.difficulty ? `
                  <div class="fact-item">
                    <div class="fact-label">Difficulty</div>
                    <div class="fact-value">${data.difficulty}</div>
                  </div>
                ` : ''}
                
                ${data.groupSize ? `
                  <div class="fact-item">
                    <div class="fact-label">Group Size</div>
                    <div class="fact-value">${data.groupSize}</div>
                  </div>
                ` : ''}
                
                ${data.maxAltitude ? `
                  <div class="fact-item">
                    <div class="fact-label">Max Altitude</div>
                    <div class="fact-value">${data.maxAltitude}</div>
                  </div>
                ` : ''}
                
                ${data.bestSeasons ? `
                  <div class="fact-item">
                    <div class="fact-label">Best Seasons</div>
                    <div class="fact-value">
                      ${Array.isArray(data.bestSeasons) ? data.bestSeasons.join(', ') : data.bestSeasons}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
            
            <!-- Trip Overview -->
            <div class="section">
              <h2>Trip Overview</h2>
              <div class="overview">
                ${data.overview?.replace(/\n/g, '<br>') || 'No overview available.'}
              </div>
            </div>
            
            <!-- Trip Highlights -->
            ${data.highlights && Array.isArray(data.highlights) && data.highlights.length > 0 ? `
              <div class="section">
                <h2>Why This Trip?</h2>
                <div class="highlights-grid">
                  ${data.highlights.map((highlight: string) => `
                    <div class="highlight-item">
                      <span class="highlight-icon">✓</span>
                      <span>${String(highlight)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            <!-- Detailed Itinerary -->
            <div class="section">
              <h2>Detailed Itinerary</h2>
              <div class="itinerary-days">
                ${data.itinerary?.map((day, index) => `
                  <div class="itinerary-day">
                    <div class="day-title">Day ${day.day}: ${day.title}</div>
                    <div class="day-description">
                      ${(day.description || 'No description available.').replace(/\n/g, '<br>')}
                      
                      ${day.meals ? `
                        <div style="margin-top: 15px; background: #f0f8ff; padding: 10px 15px; border-radius: 6px; display: inline-block;">
                          <strong>🍽️ Meals:</strong> ${day.meals}
                        </div>
                      ` : ''}
                      
                      ${day.accommodation ? `
                        <div style="margin-top: 15px;">
                          <strong>🏨 Accommodation:</strong> ${day.accommodation}
                        </div>
                      ` : ''}
                      
                      ${day.activity ? `
                        <div style="margin-top: 15px;">
                          <div style="font-weight: 600; color: #2c3e50; margin-bottom: 8px;">Activities:</div>
                          <ul style="margin: 0 0 0 20px; padding: 0;">
                            <li style="margin-bottom: 8px; position: relative; padding-left: 25px;">
                              <span style="position: absolute; left: 0; color: #f05e25;">•</span>
                              ${day.activity}
                            </li>
                          </ul>
                          </ul>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                  ${(index + 1) % 3 === 0 ? '<div class="page-break"></div>' : ''}
                `).join('')}
              </div>
            </div>
            
            <!-- Included & Excluded -->
            <div style="display: flex; gap: 30px; margin: 40px 0; flex-wrap: wrap;">
              <!-- Included -->
              ${data.included?.length ? `
                <div class="included-items">
                  <h3>What's Included</h3>
                  <ul class="included-list">
                    ${data.included.map(item => `
                      <li>${item}</li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
              
              <!-- Excluded -->
              ${data.excluded?.length ? `
                <div class="excluded-items">
                  <h3>What's Not Included</h3>
                  <ul class="excluded-list">
                    ${data.excluded.map(item => `
                      <li>${item}</li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
            
            <!-- Additional Information -->
            ${data.additionalInfo ? `
              <div class="section">
                <h2>Additional Information</h2>
                <div style="line-height: 1.8;">
                  ${data.additionalInfo.replace(/\n/g, '<br>')}
                </div>
              </div>
            ` : ''}
            
            <!-- FAQ Section -->
            ${data.faqs?.length ? `
              <div class="section">
                <h2>Frequently Asked Questions</h2>
                <div style="margin-top: 20px;">
                  ${data.faqs.map((faq, i) => `
                    <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                      <div style="font-weight: 600; color: #2c3e50; margin-bottom: 8px;">
                        Q${i + 1}. ${faq.question}
                      </div>
                      <div style="color: #555; line-height: 1.6;">
                        ${faq.answer.replace(/\n/g, '<br>')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            <!-- Footer -->
            <div class="footer">
              <h3 style="color: #f05e25; margin: 0 0 15px 0;">Ready to Book Your Adventure?</h3>
              <p style="margin: 0 0 20px 0; color: #555; font-size: 1.05em;">
                Contact our travel experts to start planning your perfect trip
              </p>
              
              <div class="contact-info">
                <div class="contact-item">
                  <span class="contact-icon">📞</span>
                  <span>+977-9803556169</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">✉️</span>
                  <span>info@realhimalaya.com</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">🌐</span>
                  <span>www.realhimalaya.com</span>
                </div>
              </div>
              
              <div style="margin-top: 30px; color: #777; font-size: 0.9em;">
                <p>Thank you for considering Real Himalaya for your adventure!</p>
                <p style="margin: 5px 0 0 0;">
                  &copy; ${new Date().getFullYear()} Real Himalaya. All rights reserved.
                </p>
              </div>
              
              <button onclick="window.print()" class="print-button no-print">
                <span>🖨️</span>
                <span>Print Itinerary</span>
              </button>
            </div>
          </div>
          
          <script>
            // Auto-scroll to top when printing
            window.onbeforeprint = function() {
              window.scrollTo(0, 0);
            };
            
            // Add page breaks for printing
            document.addEventListener('DOMContentLoaded', function() {
              const printButton = document.querySelector('.print-button');
              if (printButton) {
                printButton.addEventListener('click', function() {
                  window.print();
                });
              }
            });
          </script>
        </body>
        </html>
          </div>
          
          <script>
            // Auto-print when the window loads
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
        </html>
      `;

      // Create a new tab with the content
      const newTab = window.open('about:blank', '_blank');
      if (newTab) {
        newTab.document.open();
        newTab.document.write(content);
        newTab.document.close();
        // Focus the new tab
        newTab.focus();
      } else {
        // Fallback to same tab if new tab is blocked
        document.open();
        document.write(content);
        document.close();
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading the itinerary. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const scrollToDateSection = () => {
    const element = document.getElementById("date-&-prices");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#F05E25]/5 hidden xl:block rounded-sm border border-gray-200 sticky top-[80px] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200" >
        <h2 className="text-2xl font-bold text-center" style={{ color: '#3A3A3A' }}>
          Starting Price
        </h2>
        {data?.name && (
          <p className="text-center  font-medium text-gray-600 leading-tight">
            {data.name}
          </p>
        )}
      </div>

      {/* Price Section */}
      <div className="px-6 py-4 mb-5">
        <div className="text-center mb-4">
          <div className="flex items-baseline justify-center gap-2 mb-3">
            <span className="text-5xl font-bold" style={{ color: '#f05e25' }}>
              ${price + "99" || "N/A"}
            </span>
            <span className="text-xl font-medium text-gray-600">per person</span>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            Best Available Rate
          </p>
        </div>

        {/* Key Benefits Banner */}
        {/* <div className={` overflow-hidden ${showBanner ? "h-full mb-8" : "h-0"}  `}>
          <div className="rounded-sm  p-4 text-center" style={{ borderColor: '#f05e25', backgroundColor: '#fffbf8' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-bold text-lg" style={{ color: '#3A3A3A' }}>
                Premium Experience
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Expert Guides • Best Price • Full Customization
            </p>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="space-y-4 transition-all duration-300">
          {/* Choose Your Date Button */}
          {data?.fixedDates.length ? (
            <button
              onClick={scrollToDateSection}
              onMouseEnter={() => setHovered("date")}
              onMouseLeave={() => setHovered(null)}
              className="w-full px-8 py-2.5 rounded-sm font-bold text-lg transition-all duration-300 text-white border-2"
              style={{
                backgroundColor: '#f05e25',
                borderColor: '#f05e25'
              }}
            >
              Choose Your Date
            </button>
          ) : null}

          {/* Enquiry Now Button */}
          <Link href={"/contact-us"} className="w-full block">
            <button
              onMouseEnter={() => setHovered("enquiry")}
              onMouseLeave={() => setHovered(null)}
              className="w-full px-8 py-2.5 rounded-sm font-bold text-lg border-2 transition-all duration-300"
              style={{
                backgroundColor: isEnquiryActive ? '#3A3A3A' : 'transparent',
                borderColor: '#3A3A3A',
                color: isEnquiryActive ? 'white' : '#3A3A3A'
              }}
            >
              Enquiry Now
            </button>
          </Link>

          {/* View Itinerary Button */}
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                generatePdf();
              }}
              disabled={isGeneratingPdf || !data}
              className={`w-full px-8 py-2.5 rounded-sm font-bold text-lg border-2 flex items-center justify-center gap-2 transition-all duration-300 ${
                isGeneratingPdf || !data 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#3A3A3A] hover:text-white cursor-pointer'
              }`}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#3A3A3A',
                color: '#3A3A3A',
              }}
            >
              <Icon 
                icon="material-symbols:visibility-rounded" 
                width="20" 
                height="20" 
                className="transition-colors duration-300"
              />
              {isGeneratingPdf ? 'Opening...' : 'View Itinerary'}
            </button>
          </div>
          
          {/* Hidden content for PDF generation */}
          <div className="hidden">
            <div ref={pdfRef} className="p-8">
              {data && (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-orange-500 mb-2">{data.name}</h1>
                    <p className="text-lg text-gray-600">{data.location} • {data.duration} Days</p>
                  </div>
                  
                  {data.coverImage && (
                    <img 
                      src={data.coverImage} 
                      alt={data.name} 
                      className="w-full h-64 object-cover mb-8 rounded"
                    />
                  )}
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Trip Overview</h2>
                    <p className="text-gray-700">{data.overview || 'No overview available.'}</p>
                  </div>
                  
                  {data.itinerary?.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Detailed Itinerary</h2>
                      <div className="space-y-6">
                        {data.itinerary.map((day, index) => (
                          <div key={index} className="border-b border-gray-200 pb-4">
                            <h3 className="text-xl font-semibold text-orange-500 mb-2">Day {day.day}: {day.title}</h3>
                            <div 
                              className="text-gray-700" 
                              dangerouslySetInnerHTML={{ __html: day.description || 'No description available.' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center text-sm text-gray-500 mt-12 pt-4 border-t border-gray-200">
                    <p>Thank you for choosing Real Himalaya. For any queries, contact us at +977-9803556169</p>
                    <p className="mt-2">www.realhimalaya.com</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Talk to Expert Section */}
      <div className="border-t border-gray-200" >
        <div className="px-8 py-6">
          <h3 className="text-xl font-bold  text-center" style={{ color: '#3A3A3A' }}>
            Talk to Expert
          </h3>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Get personalized advice from our travel experts
            </p>
            <div className="flex items-center justify-center gap-3">
              <Icon icon="line-md:phone-call-loop" width="24" height="24" style={{ color: '' }} />
              <Icon icon="skill-icons:instagram" width="24" height="24" style={{ color: '#f05e25' }} />
              <Icon icon="logos:facebook" width="24" height="24" style={{ color: '#f05e25' }} />
              <Icon icon="skill-icons:gmail-light" width="28" height="28" style={{ color: '#f05e25' }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
