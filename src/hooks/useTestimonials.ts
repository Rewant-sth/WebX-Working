import { useQuery } from '@tanstack/react-query';
import api from '@/service/api';
import { TestimonialsResponse } from '@/types/ITestimonial';

// Custom hook for fetching testimonials
export const useTestimonials = () => {
    return useQuery<TestimonialsResponse>({
        queryKey: ['testimonials'],
        queryFn: async () => {
            try {
                const response = await api.get('/home-testimonial');
                return response.data;
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                throw error;
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2, // Retry failed requests up to 2 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    });
};
