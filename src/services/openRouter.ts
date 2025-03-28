import OpenAI from 'openai';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.warn('OpenRouter API key is missing. CV analysis will not work.');
}

const client = OPENROUTER_API_KEY ? new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Job Search Dashboard',
  },
}) : null;

export const analyzeCVStrengths = async (cv: string) => {
  if (!client) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'anthropic/claude-3-sonnet',
      messages: [
        {
          role: 'system',
          content: `You are an expert CV analyst. Analyze the CV and provide a detailed, professional analysis of strengths and areas for improvement. Format the output in clean, professional text without any markdown, asterisks, or special formatting.

Focus on:
1. Overall presentation and structure
2. Content quality and relevance
3. Impact and achievement descriptions
4. Skills presentation
5. Professional narrative
6. Areas that could be enhanced

Format your response with clear sections and proper spacing. Do not use any special characters or formatting symbols.`,
        },
        {
          role: 'user',
          content: `Please analyze this CV and provide a professional analysis:\n\n${cv}`,
        },
      ],
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error analyzing CV:', error);
    throw new Error('Failed to analyze CV');
  }
};

export const enhanceCV = async (cv: string) => {
  if (!client) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'anthropic/claude-3-sonnet',
      messages: [
        {
          role: 'system',
          content: `You are an expert CV writer. Rewrite the provided CV to enhance its impact while maintaining truthfulness. The output should be clean, professional text without any markdown, asterisks, or special formatting.

Guidelines:
- Use clear section headers in capital letters
- Use proper spacing between sections
- Format contact information clearly at the top
- Use consistent date formatting
- Ensure proper alignment throughout
- Do not include any special characters or formatting symbols

The output should be plain text that's properly formatted and ready to copy into a document.`,
        },
        {
          role: 'user',
          content: `Please enhance this CV while maintaining its truthfulness:\n\n${cv}`,
        },
      ],
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error enhancing CV:', error);
    throw new Error('Failed to enhance CV');
  }
};

export const generateCoverLetter = async (jobDescription: string, cv: string) => {
  if (!client) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'anthropic/claude-3-sonnet',
      messages: [
        {
          role: 'system',
          content: `Create a concise, impactful cover letter following these guidelines:

- Introduction: One sentence expressing interest in the position
- Relevant Experience: 1-2 sentences highlighting key experience/skills that align with requirements using STAR format:
  - Situation: Brief context
  - Result: Impact/outcome
- Company Fit: One sentence explaining cultural/mission alignment
- Closing: Short sentence expressing enthusiasm and contact info
- Tone: Professional and succinct
- Length: 3-4 sentences total
- Format: Standard business letter with contact info, date, address, salutation

The cover letter should be direct, focused on most relevant experience, and demonstrate clear value to the employer.`,
        },
        {
          role: 'user',
          content: `Please write a cover letter for this job description using the candidate's CV:

Job Description:
${jobDescription}

Candidate's CV:
${cv}`,
        },
      ],
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw new Error('Failed to generate cover letter');
  }
};