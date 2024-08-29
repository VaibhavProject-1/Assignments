// src/services/unsplashService.ts

import axios from 'axios';

export const fetchCourseImage = async (courseName: string, instructor: string): Promise<string> => {
    try {
      let query = courseName;
  
      // Modify the search query for React Native specifically
      if (courseName.toLowerCase().includes("react native")) {
        query = "React mobile programming";
      } else {
        // General fallback if the course name is not React Native
        query = `${courseName} ${instructor} programming`;
      }
  
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
          per_page: 1,
        },
      });
  
      if (response.data.results.length > 0) {
        return response.data.results[0].urls.small;
      } else {
        return 'https://via.placeholder.com/300x200?text=No+Image';
      }
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
      return 'https://via.placeholder.com/300x200?text=Error+Loading+Image';
    }
  };
  