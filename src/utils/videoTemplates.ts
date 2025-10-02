export interface VideoTemplate {
  id: number;
  name: string;
  backgroundType: 'gradient' | 'solid' | 'pattern';
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layoutType: 'modern' | 'classic' | 'minimal';
  animationStyle: 'smooth' | 'dynamic' | 'subtle';
  headerFontSize: string;
  questionFontSize: string;
  optionFontSize: string;
  captionStyle: 'none' | 'box' | 'highlight';
}

export const VIDEO_TEMPLATES: VideoTemplate[] = [
  {
    id: 1,
    name: 'Teal Gradient Engaging',
    backgroundType: 'gradient',
    primaryColor: '#0d9488',
    secondaryColor: '#6b7280',
    fontFamily: 'Poppins, sans-serif',
    layoutType: 'modern',
    animationStyle: 'smooth',
    headerFontSize: '64px',
    questionFontSize: '32px',
    optionFontSize: '26px',
    captionStyle: 'none'
  },
  {
    id: 2,
    name: 'Clean Light Modern',
    backgroundType: 'solid',
    primaryColor: '#e5e7eb',
    secondaryColor: '#1f2937',
    fontFamily: 'Poppins, sans-serif',
    layoutType: 'modern',
    animationStyle: 'smooth',
    headerFontSize: '56px',
    questionFontSize: '30px',
    optionFontSize: '24px',
    captionStyle: 'none'
  },
  {
    id: 3,
    name: 'Ocean Blue Dynamic',
    backgroundType: 'gradient',
    primaryColor: '#0ea5e9',
    secondaryColor: '#6366f1',
    fontFamily: 'Poppins, sans-serif',
    layoutType: 'modern',
    animationStyle: 'dynamic',
    headerFontSize: '60px',
    questionFontSize: '32px',
    optionFontSize: '26px',
    captionStyle: 'none'
  },
  {
    id: 4,
    name: 'Warm Gradient Vibrant',
    backgroundType: 'gradient',
    primaryColor: '#f59e0b',
    secondaryColor: '#10b981',
    fontFamily: 'Poppins, sans-serif',
    layoutType: 'modern',
    animationStyle: 'dynamic',
    headerFontSize: '58px',
    questionFontSize: '30px',
    optionFontSize: '25px',
    captionStyle: 'none'
  }
];

export function generateTemplateCSS(template: VideoTemplate): string {
  let background = '';

  if (template.backgroundType === 'gradient') {
    background = `linear-gradient(135deg, ${template.primaryColor} 0%, ${template.secondaryColor} 100%)`;
  } else {
    background = template.primaryColor;
  }

  const textColor = template.backgroundType === 'solid' && template.primaryColor.includes('e5e7eb')
    ? template.secondaryColor
    : '#ffffff';

  return `
    body {
      margin: 0;
      padding: 0;
      width: 1080px;
      height: 1920px;
      background: ${background};
      font-family: ${template.fontFamily};
      color: ${textColor};
      overflow: hidden;
      position: relative;
    }

    .header {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      text-align: center;
      padding: 20px 40px;
    }

    .header-title {
      font-size: ${template.headerFontSize};
      font-weight: 800;
      letter-spacing: 3px;
      margin: 0;
      text-transform: uppercase;
      ${template.backgroundType === 'solid' ? `
        color: #ffffff;
        background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
        padding: 18px 60px;
        border-radius: 60px;
        display: inline-block;
        box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4);
      ` : ''}
    }

    .content-container {
      position: absolute;
      top: 220px;
      left: 60px;
      right: 60px;
      bottom: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }

    .question-container {
      width: 100%;
      max-width: 920px;
      margin-bottom: 60px;
    }

    .question-type {
      font-size: 28px;
      font-weight: 700;
      color: ${template.backgroundType === 'solid' ? '#f59e0b' : '#fbbf24'};
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 40px;
      text-align: center;
    }

    .question-text {
      font-size: ${template.questionFontSize};
      font-weight: 600;
      line-height: 1.7;
      text-align: center;
      margin: 0 0 50px 0;
      padding: 0 30px;
      ${template.backgroundType === 'solid' ? 'color: #1f2937;' : ''}
    }

    .options-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .option {
      background: ${template.backgroundType === 'solid' ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'};
      border: 3px solid ${template.backgroundType === 'solid' ? '#e5e7eb' : 'rgba(255, 255, 255, 0.35)'};
      border-radius: 25px;
      padding: 28px 35px;
      font-size: ${template.optionFontSize};
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 25px;
      transition: all 0.3s ease;
      box-shadow: ${template.backgroundType === 'solid' ? '0 4px 15px rgba(0,0,0,0.08)' : '0 4px 15px rgba(0,0,0,0.15)'};
      ${template.backgroundType === 'solid' ? `color: ${template.secondaryColor};` : ''}
    }

    .option-letter {
      background: ${template.backgroundType === 'solid' ? template.secondaryColor : 'rgba(0, 0, 0, 0.4)'};
      color: #ffffff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 32px;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .option-text {
      flex: 1;
    }

    .timer-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .timer-box {
      background: ${template.backgroundType === 'solid' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.25)'};
      border: 5px solid ${template.backgroundType === 'solid' ? '#f59e0b' : '#fbbf24'};
      border-radius: 40px;
      padding: 40px 80px;
      margin-bottom: 40px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .timer-number {
      font-size: 140px;
      font-weight: 900;
      line-height: 1;
      margin: 0;
      ${template.backgroundType === 'solid' ? `color: ${template.secondaryColor};` : ''}
    }

    .timer-label {
      font-size: 36px;
      font-weight: 700;
      margin-top: 12px;
    }

    .answer-container {
      width: 100%;
      max-width: 920px;
      margin-top: 40px;
    }

    .answer-box {
      background: ${template.backgroundType === 'solid' ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'};
      border: 5px solid ${template.backgroundType === 'solid' ? '#10b981' : '#34d399'};
      border-radius: 25px;
      padding: 35px 50px;
      margin-bottom: 35px;
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
    }

    .answer-title {
      font-size: 36px;
      font-weight: 800;
      color: ${template.backgroundType === 'solid' ? '#10b981' : '#34d399'};
      margin: 0 0 20px 0;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .answer-text {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      text-align: center;
      ${template.backgroundType === 'solid' ? `color: ${template.secondaryColor};` : ''}
    }

    .solution-box {
      background: ${template.backgroundType === 'solid' ? '#ffffff' : 'rgba(255, 255, 255, 0.18)'};
      border: 4px solid ${template.backgroundType === 'solid' ? '#e5e7eb' : 'rgba(255, 255, 255, 0.35)'};
      border-radius: 25px;
      padding: 35px 50px;
      box-shadow: ${template.backgroundType === 'solid' ? '0 4px 15px rgba(0,0,0,0.08)' : '0 4px 15px rgba(0,0,0,0.15)'};
    }

    .solution-title {
      font-size: 32px;
      font-weight: 800;
      margin: 0 0 25px 0;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .solution-text {
      font-size: 24px;
      line-height: 1.7;
      margin: 0;
      font-weight: 500;
      ${template.backgroundType === 'solid' ? `color: ${template.secondaryColor};` : ''}
    }

    .decoration-icon {
      position: absolute;
      opacity: 0.08;
      font-size: 140px;
    }

    .icon-top-left {
      top: 180px;
      left: 50px;
    }

    .icon-top-right {
      top: 180px;
      right: 50px;
    }

    .icon-bottom-right {
      bottom: 120px;
      right: 50px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-40px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.08);
      }
    }

    .animate-fade-in {
      animation: fadeIn ${template.animationStyle === 'dynamic' ? '0.5s' : '0.7s'} ease-out;
    }

    .animate-slide-in {
      animation: slideIn ${template.animationStyle === 'dynamic' ? '0.4s' : '0.6s'} ease-out;
    }

    .animate-scale-in {
      animation: scaleIn ${template.animationStyle === 'dynamic' ? '0.5s' : '0.7s'} ease-out;
    }

    .animate-pulse {
      animation: pulse ${template.animationStyle === 'subtle' ? '2.5s' : '2s'} ease-in-out infinite;
    }
  `;
}

export function getRandomTemplate(): VideoTemplate {
  return VIDEO_TEMPLATES[Math.floor(Math.random() * VIDEO_TEMPLATES.length)];
}
