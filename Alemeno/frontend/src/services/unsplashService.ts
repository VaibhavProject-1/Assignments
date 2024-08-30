// src/services/unsplashService.ts

import axios from 'axios';

//Fetching images from Unsplash API
export const fetchCourseImage = async (courseName: string, instructor: string): Promise<string> => {
  try {
    let query = courseName || ''; // Fallback to an empty string if courseName is undefined

    // Modify the search query for React Native specifically
    if (query.toLowerCase().includes("react native")) {
      query = "React mobile programming";
    } else {
      // General fallback if the course name is not React Native
      query = `${query} ${instructor || ''} programming`; // Fallback to an empty string if instructor is undefined
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
