interface ScriptTemplate {
  id: number;
  name: string;
  introPattern: string;
  questionPattern: string;
  timerPattern: string;
  answerRevealPattern: string;
  solutionPattern: string;
  outroPattern: string;
}

const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 1,
    name: 'Engaging Style',
    introPattern: 'Hello everyone, today we are going to solve a question for {exam_name} {course_name}.',
    questionPattern: 'So the question says: {question_statement}. And the options are: {options_text}',
    timerPattern: 'Try solving this question on your own. I will give you 5 seconds. 5... 4... 3... 2... 1...',
    answerRevealPattern: 'Okay time is up! The answer and solution is on your screen.',
    solutionPattern: '',
    outroPattern: 'If you want complete roadmap for {exam_name} {course_name}, follow and comment roadmap and it will be in your DMs. Thank you bacho!'
  },
  {
    id: 2,
    name: 'Quick Style',
    introPattern: 'Hey everyone! Solving a {exam_name} {course_name} question today.',
    questionPattern: 'The question is: {question_statement}. Options are: {options_text}',
    timerPattern: 'Try it yourself! Giving you 5 seconds. 5... 4... 3... 2... 1...',
    answerRevealPattern: 'Times up! Answer and solution on your screen.',
    solutionPattern: '',
    outroPattern: 'Want complete roadmap for {exam_name} {course_name}? Follow and comment roadmap. Thank you!'
  },
  {
    id: 3,
    name: 'Energetic Style',
    introPattern: 'What is up everyone! Today we are solving a {exam_name} {course_name} question.',
    questionPattern: 'So the question says: {question_statement}. And the options for this are: {options_text}',
    timerPattern: 'I would love if you try this yourself! Giving you 5 seconds. 5... 4... 3... 2... 1...',
    answerRevealPattern: 'Time up! The answer and solution are on your screen.',
    solutionPattern: '',
    outroPattern: 'For complete roadmap of {exam_name} {course_name}, follow and comment roadmap and roadmap will be in your DMs. Thank you bacho!'
  },
  {
    id: 4,
    name: 'Friendly Style',
    introPattern: 'Hello friends! Today we have a {exam_name} {course_name} question.',
    questionPattern: 'The question says: {question_statement}. The options are: {options_text}',
    timerPattern: 'Try this by yourself! I am giving you 5 seconds. 5... 4... 3... 2... 1...',
    answerRevealPattern: 'Okay times up! Answer and solution is on your screen.',
    solutionPattern: '',
    outroPattern: 'If you want complete roadmap for {exam_name} {course_name}, follow and comment roadmap. It will be in your DMs!'
  },
  {
    id: 5,
    name: 'Motivational Style',
    introPattern: 'Namaste everyone! Lets solve a {exam_name} {course_name} question today.',
    questionPattern: 'So the question is: {question_statement}. And the options for this question are: {options_text}',
    timerPattern: 'Now you try! Take 5 seconds to solve. 5... 4... 3... 2... 1...',
    answerRevealPattern: 'Time is up! Check the answer and solution on screen.',
    solutionPattern: '',
    outroPattern: 'For complete roadmap for your {exam_name} {course_name} preparation, follow and comment roadmap. Thank you bacho!'
  }
];

function convertMathExpressionToSpeech(text: string): string {
  let result = text;
  
  // Handle fractions like 1/2 -> "1 by 2" or "one-half"
  result = result.replace(/(\d+)\/(\d+)/g, (match, num, den) => {
    if (num === '1' && den === '2') return 'one-half';
    if (num === '1' && den === '3') return 'one-third';
    if (num === '1' && den === '4') return 'one-fourth';
    if (num === '2' && den === '3') return 'two-thirds';
    if (num === '3' && den === '4') return 'three-fourths';
    return `${num} by ${den}`;
  });
  
  // Handle matrix notation like [1,2;3,4] -> "a matrix with elements..."
  result = result.replace(/\[([^\]]+)\]/g, (match, content) => {
    if (content.includes(';') || content.includes(',')) {
      const rows = content.split(';');
      if (rows.length > 1) {
        const rowCount = rows.length;
        const colCount = rows[0].split(',').length;
        return `a matrix of ${rowCount} by ${colCount} with elements ${content.replace(/;/g, ' next row ').replace(/,/g, ' and ')}`;
      }
    }
    return match;
  });
  
  // Handle powers like x^2 -> "x squared" or "x raised to power 2"
  result = result.replace(/(\w)\^2/g, '$1 squared');
  result = result.replace(/(\w)\^3/g, '$1 cubed');
  result = result.replace(/(\w)\^(\d+)/g, '$1 raised to power $2');
  
  // Handle common math symbols
  result = result.replace(/\*/g, ' times ');
  result = result.replace(/÷/g, ' divided by ');
  result = result.replace(/=/g, ' equals ');
  result = result.replace(/≠/g, ' not equals ');
  result = result.replace(/≤/g, ' less than or equal to ');
  result = result.replace(/≥/g, ' greater than or equal to ');
  result = result.replace(/</g, ' less than ');
  result = result.replace(/>/g, ' greater than ');
  result = result.replace(/√/g, ' square root of ');
  result = result.replace(/∞/g, ' infinity ');
  result = result.replace(/π/g, ' pi ');
  result = result.replace(/∑/g, ' sum of ');
  result = result.replace(/∫/g, ' integral of ');
  
  // Remove LaTeX-style commands
  result = result.replace(/\\[a-z]+\{([^}]+)\}/g, '$1');
  
  // Clean up extra spaces
  result = result.replace(/\s+/g, ' ').trim();
  
  return result;
}

function formatOptions(options: string, questionType: string): string {
  if (!options || !['mcq', 'msq'].includes(questionType.toLowerCase())) {
    return '';
  }
  
  try {
    const optionObj = JSON.parse(options);
    const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const optionTexts: string[] = [];
    
    optionLetters.forEach((letter) => {
      if (optionObj[letter]) {
        const cleanOption = convertMathExpressionToSpeech(optionObj[letter]);
        optionTexts.push(`Option ${letter}: ${cleanOption}`);
      }
    });
    
    if (optionTexts.length > 0) {
      return 'The options are: ' + optionTexts.join('. ') + '.';
    }
  } catch (e) {
    console.error('Error parsing options:', e);
  }
  
  return '';
}

export function generateScript(
  examName: string,
  courseName: string,
  questionStatement: string,
  questionType: string,
  options: string | null,
  answer: string,
  solution: string | null,
  templateId?: number
): string {
  // Select random template if not specified
  const selectedTemplate = templateId 
    ? SCRIPT_TEMPLATES.find(t => t.id === templateId) || SCRIPT_TEMPLATES[0]
    : SCRIPT_TEMPLATES[Math.floor(Math.random() * SCRIPT_TEMPLATES.length)];
  
  // Convert question and answer to natural speech
  const questionSpeech = convertMathExpressionToSpeech(questionStatement);
  const answerSpeech = convertMathExpressionToSpeech(answer);
  const optionsText = formatOptions(options || '', questionType);
  
  // Build script from template
  let script = '';
  
  // Introduction
  script += selectedTemplate.introPattern
    .replace('{exam_name}', examName)
    .replace('{course_name}', courseName);
  script += ' ';
  
  // Question
  script += selectedTemplate.questionPattern
    .replace('{question_statement}', questionSpeech)
    .replace('{options_text}', optionsText);
  script += ' ';
  
  // Timer/Pause
  script += selectedTemplate.timerPattern;
  script += ' ';
  
  // Answer reveal
  script += selectedTemplate.answerRevealPattern;
  script += ' ';
  
  // Outro/CTA
  script += selectedTemplate.outroPattern
    .replace('{exam_name}', examName)
    .replace('{course_name}', courseName);
  
  return script.trim();
}

export function getRandomTemplate(): ScriptTemplate {
  return SCRIPT_TEMPLATES[Math.floor(Math.random() * SCRIPT_TEMPLATES.length)];
}

export { SCRIPT_TEMPLATES };
