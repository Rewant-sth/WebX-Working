import { PersonalInfo } from './types';
import { ValidationErrors } from './useFormValidation';

interface PersonalInfoSectionProps {
    personalInfo: PersonalInfo;
    onChange: (field: keyof PersonalInfo, value: string) => void;
    errors?: ValidationErrors;
}

export default function PersonalInfoSection({ personalInfo, onChange, errors = {} }: PersonalInfoSectionProps) {
    const countries = [
        'Nepal', 'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
        'Germany', 'France', 'Japan', 'South Korea', 'China', 'Thailand', 'Malaysia',
        'Singapore', 'New Zealand', 'Netherlands', 'Switzerland', 'Austria', 'Italy',
        'Spain', 'Other'
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        required
                        value={personalInfo.fullName}
                        onChange={(e) => onChange('fullName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${errors.fullName ? 'border-red-500' : 'border-zinc-300'}`}
                        placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={personalInfo.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-zinc-300'}`}
                        placeholder="your.email@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-zinc-700 mb-2">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="country"
                        required
                        value={personalInfo.country}
                        onChange={(e) => onChange('country', e.target.value)}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-zinc-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        required
                        value={personalInfo.phoneNumber}
                        onChange={(e) => onChange('phoneNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="+977 98xxxxxxxx"
                    />
                </div>
            </div>
        </div>
    );
}
