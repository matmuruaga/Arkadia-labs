// src/data/solutions/index.ts
import { Solution, SolutionsMap } from './types';
import { leadValidatorSolution } from './lead-validator';
import { salesQualifierSolution } from './sales-qualifier';
import { salesAgentSolution } from './sales-agent';
import { virtualReceptionistSolution } from './virtual-receptionist';
import { bookingAgentSolution } from './booking-agent';
import { contentCreatorSolution } from './content-creator';
import { socialManagerSolution } from './social-manager';
import { operationsAgentSolution } from './operations-agent';
import { cloneYourBusinessSolution } from './clone-your-business';

// Export all solutions
export const solutions: SolutionsMap = {
  'lead-validator': leadValidatorSolution,
  'sales-qualifier': salesQualifierSolution,
  'sales-agent': salesAgentSolution,
  'virtual-receptionist': virtualReceptionistSolution,
  'booking-agent': bookingAgentSolution,
  'content-creator': contentCreatorSolution,
  'social-manager': socialManagerSolution,
  'operations-agent': operationsAgentSolution,
  'clone-your-business': cloneYourBusinessSolution,
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
