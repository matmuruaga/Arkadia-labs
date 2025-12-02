// src/data/solutions/index.ts
import { Solution, SolutionsMap } from './types';
import { leadValidatorSolution } from './lead-validator';

// Export all solutions
export const solutions: SolutionsMap = {
  'lead-validator': leadValidatorSolution,
  // Add more solutions here as they are created:
  // 'sales-qualifier': salesQualifierSolution,
  // 'sales-agent': salesAgentSolution,
  // 'virtual-receptionist': virtualReceptionistSolution,
  // 'booking-agent': bookingAgentSolution,
  // 'content-creator': contentCreatorSolution,
  // 'social-manager': socialManagerSolution,
  // 'operations-agent': operationsAgentSolution,
};

// Helper to get solution by slug
export const getSolutionBySlug = (slug: string): Solution | undefined => {
  return solutions[slug];
};

// Get all solutions as array
export const getAllSolutions = (): Solution[] => {
  return Object.values(solutions);
};

// Get solutions by category
export const getSolutionsByCategory = (category: Solution['category']): Solution[] => {
  return Object.values(solutions).filter(solution => solution.category === category);
};

// Export types
export * from './types';
