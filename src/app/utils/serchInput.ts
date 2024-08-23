import { GroupedCite } from "../models/Cite.model";

export const searchInput = (searchText: string, groupedCites: GroupedCite[]): GroupedCite[] => {
    if (!searchText) {
        return groupedCites;
      }
    
      const searchTextLower = searchText.toLowerCase();
    
      return groupedCites.map(group => {
        const matchingCites = group.cites.filter(cite =>
          cite.title.toLowerCase().includes(searchTextLower) ||
          cite.user.displayName?.toLowerCase().includes(searchTextLower) ||
          cite.user.email?.toLowerCase().includes(searchTextLower)
        );
    
        return { ...group, cites: matchingCites };
      });
}