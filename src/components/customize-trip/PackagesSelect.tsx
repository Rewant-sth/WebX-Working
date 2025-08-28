import { useState } from 'react';
import Image from 'next/image';
import { ITravelPackage } from '@/types/IPackages';

interface PackageSelectionSectionProps {
    packages: ITravelPackage[];
    selectedPackage: string;
    isLoading: boolean;
    onChange: (packageId: string) => void;
}

export default function PackagesSelect({
    packages,
    selectedPackage,
    isLoading,
    onChange
}: PackageSelectionSectionProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const packagesPerPage = 6;

    // Filter packages based on search term
    const filteredPackages = packages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.overview.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);
    const startIndex = (currentPage - 1) * packagesPerPage;
    const endIndex = startIndex + packagesPerPage;
    const currentPackages = filteredPackages.slice(startIndex, endIndex);

    // Reset to first page when search term changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Pagination handlers
    const goToPage = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of packages section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex justify-between gap-10 border-b pb-4 border-gray-200
            ">
                <div className="">
                    <h2 className='text-2xl  font-semibold'>Select Your Package</h2>
                </div>
                <div className="relative h-fit">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search packages..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <>
                    {/* Packages Count and Page Info */}
                    {filteredPackages.length > 0 && (
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <p>
                                Showing {startIndex + 1}-{Math.min(endIndex, filteredPackages.length)} of {filteredPackages.length} packages
                            </p>
                            {totalPages > 1 && (
                                <p>Page {currentPage} of {totalPages}</p>
                            )}
                        </div>
                    )}

                    {/* Package Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentPackages.map((pkg) => (
                            <div
                                key={pkg._id}
                                className={`relative border rounded-sm overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${selectedPackage === pkg._id
                                    ? 'border-orange-500 ring-2 ring-orange-500 ring-opacity-50'
                                    : 'border-gray-300 hover:border-orange-300'
                                    }`}
                                onClick={() => onChange(pkg._id)}
                            >
                                {/* Selection Indicator */}
                                {selectedPackage === pkg._id && (
                                    <div className="absolute top-3 right-3 z-10 bg-orange-500 text-white rounded-full p-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}

                                {/* Package Image */}
                                <div className="relative  h-52 w-full bg-gray-200">
                                    <Image
                                        src={pkg.coverImage || '/placeholder.webp'}
                                        alt={pkg.name}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/placeholder.webp';
                                        }}
                                    />

                                    <div className="absolute inset-0 z-50 flex items-end p-4">
                                        <h2 className="text-xl font-bold text-white">{pkg.name}</h2>
                                    </div>
                                </div>

                                {/* Package Content */}
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 py-8">
                            {/* Previous Button */}
                            <button
                                onClick={goToPrevious}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-sm border transition-colors duration-200 ${currentPage === 1
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
                                    }`}
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(totalPages, 7) }, (_, index) => {
                                    let pageNumber;

                                    if (totalPages <= 7) {
                                        pageNumber = index + 1;
                                    } else {
                                        if (currentPage <= 4) {
                                            pageNumber = index + 1;
                                        } else if (currentPage >= totalPages - 3) {
                                            pageNumber = totalPages - 6 + index;
                                        } else {
                                            pageNumber = currentPage - 3 + index;
                                        }
                                    }

                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => goToPage(pageNumber)}
                                            className={`w-10 h-10 rounded-sm border transition-colors duration-200 ${currentPage === pageNumber
                                                ? 'border-orange-500 bg-orange-500 text-white'
                                                : 'border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={goToNext}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-sm border transition-colors duration-200 ${currentPage === totalPages
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* No Packages Found */}
                    {filteredPackages.length === 0 && !isLoading && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709V15a2 2 0 00-2-2H3" />
                                </svg>
                            </div>
                            <p className="text-gray-500">
                                {searchTerm ? 'No packages found matching your search.' : 'No packages available at the moment.'}
                            </p>
                        </div>
                    )}


                </>
            )
            }
        </div >
    );
}
