export const JOBS = [
  { id: 1, title: "ML Engineer", company: "NeuralWorks", location: "Bengaluru", type: "Full-time", postedHoursAgo: 2, tags: ["Python", "PyTorch", "LLMs"] },
  { id: 2, title: "Associate Frontend Developer", company: "FirstHire", location: "Mumbai", type: "Full-time", postedHoursAgo: 5, tags: ["React", "JavaScript", "CSS"] },
  { id: 3, title: "AI Intern", company: "Tesselonix", location: "Remote", type: "Internship", postedHoursAgo: 8, tags: ["RAG", "FastAPI", "Gemini"] },
  { id: 4, title: "IoT Engineer", company: "SenseGrid", location: "Hyderabad", type: "Full-time", postedHoursAgo: 12, tags: ["ESP32", "MQTT", "C"] },
  { id: 5, title: "Data Analyst", company: "InsightLabs", location: "Remote", type: "Full-time", postedHoursAgo: 20, tags: ["SQL", "Python", "Dashboards"] },
  { id: 6, title: "Backend Developer", company: "CloudNest", location: "Pune", type: "Internship", postedHoursAgo: 26, tags: ["FastAPI", "PostgreSQL", "Docker"] },
];

// Simulates a network call so you can practice loading/error states.
export function fetchJobs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) reject(new Error("Network error. Please retry."));
      else resolve(JOBS);
    }, 800);
  });
}
