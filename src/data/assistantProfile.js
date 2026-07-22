const PROFILE_SUMMARY = {
  role: 'Aspiring AI & Frontend Developer',
  education: 'BS Computer Science undergraduate at University of Karachi (UBIT)',
  internship: 'Front-End AI Engineering Intern at FlyRank AI',
  projects: ['Ranna Recipe App', 'Live Location Tracker', 'FlyRank AI Assignments'],
  skills: ['React', 'React Native', 'AI interfaces', 'Frontend development'],
}

export function buildLocalAssistantReply(userInput = '') {
  const input = userInput.toLowerCase()

  if (input.includes('project') || input.includes('portfolio')) {
    return `We can share more about Muzainah’s work. She has built ${PROFILE_SUMMARY.projects.join(', ')} and is especially interested in ${PROFILE_SUMMARY.skills.slice(0, 3).join(', ')}.`
  }

  if (input.includes('skill') || input.includes('experience') || input.includes('background')) {
    return `Muzainah is a ${PROFILE_SUMMARY.education} with experience as a ${PROFILE_SUMMARY.internship}. She is focused on ${PROFILE_SUMMARY.role.toLowerCase()} and enjoys building thoughtful digital experiences.`
  }

  return `We can help with questions about Muzainah’s education, experience, projects, and skills. She is a ${PROFILE_SUMMARY.education} and currently works as a ${PROFILE_SUMMARY.internship}.`
}
