// src/utils/dateUtils.ts

export const calculateDueDate = (enrollmentDate: string, duration: string): string => {
    const enrollment = new Date(enrollmentDate);
    const [amount, unit] = duration.split(' ');
  
    if (unit.startsWith('week')) {
      enrollment.setDate(enrollment.getDate() + parseInt(amount) * 7);
    } else if (unit.startsWith('day')) {
      enrollment.setDate(enrollment.getDate() + parseInt(amount));
    }
  
    return enrollment.toLocaleDateString(); // Format the date as needed
  };  