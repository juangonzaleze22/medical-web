import { Cite, GroupedCite } from "../models/Cite.model";

export const groupCitesByDate = (cites: Cite[]): any => {
    return cites.reduce<(GroupedCite[])>((acc, cite) => {
      const formattedDate = cite.date.split('T')[0];
      const existingDate = acc.find((day: { date: string }) => day.date === formattedDate);
  
      if (existingDate) {
        existingDate.cites.push(cite); 
      } else {
        acc.push({ date: formattedDate, cites: [cite] });
      }
  
      return acc;
    }, []);
  }