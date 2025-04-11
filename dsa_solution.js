/**
 * 🧠 PART 4: Data Structures & Algorithms (in JavaScript)
 *
 * 🔍 Problem 3: Detect Duplicate Applications (Medium)
 *
 * Write a function that checks if there are duplicate applications based on
 * a combination of company + role, ignoring case sensitivity.
 *
 * Example Input:
 * [
 *   { company: "Google", role: "SDE Intern" },
 *   { company: "google", role: "sde intern" },
 *   { company: "Amazon", role: "Backend Intern" }
 * ]
 *
 * Output: true (since first two entries are duplicates ignoring case)
 */

function hasDuplicateApplications(applications) {
    const seen = new Set();
  
    for (const app of applications) {
      const key = `${app.company.toLowerCase()}-${app.role.toLowerCase()}`;
      if (seen.has(key)) {
        return true; // Duplicate found
      }
      seen.add(key);
    }
  
    return false; // No duplicates
  }
  
  // Example usage:
  const applications = [
    { company: "Google", role: "SDE Intern" },
    { company: "google", role: "sde intern" },
    { company: "Amazon", role: "Backend Intern" },
  ];
  
  console.log(hasDuplicateApplications(applications)); // Output: true
  