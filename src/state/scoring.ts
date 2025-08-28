import type { GameState } from './types';

export const calculateScores = (state: GameState) => {
  const startTime = state.startedAt?.getTime() || Date.now();
  const endTime = state.completedAt?.getTime() || Date.now();
  const minutesElapsed = (endTime - startTime) / (1000 * 60);

  // Accuracy: +20 for each accuracy evidence + 10 for each different place
  const accuracyEvidences = state.evidences.filter(e => e.weight.accuracy).length;
  const accuracy = Math.min(100, (accuracyEvidences * 20) + (state.placesVisited.length * 10));

  // Speed: 100 - (minutes - 15) * 5, minimum 20
  const speed = Math.max(20, Math.min(100, 100 - Math.floor((minutesElapsed - 15) * 5)));

  // Empathy: Based on supportive choices and empathy effects
  const empathyEvidences = state.evidences.filter(e => e.weight.empathy).length;
  const empathy = Math.min(100, empathyEvidences * 25 + 30);

  // Critical thinking: +25 for each correct link + 10 for strong reasoning
  const criticalEvidences = state.evidences.filter(e => e.weight.critical).length;
  const strongLinks = state.links.filter(link => link.reasoning.length >= 100).length;
  const critical = Math.min(100, (state.links.length * 25) + (criticalEvidences * 15) + (strongLinks * 10));

  // Intelligence: +15 for place variety + 20 for no direct accusations + 10 for solution suggestions
  const placeVariety = state.placesVisited.length;
  const intelligence = Math.min(100, (placeVariety * 15) + 35);

  return {
    accuracy,
    speed,
    empathy, 
    critical,
    intelligence
  };
};

export const generateReport = (state: GameState): string => {
  const scores = calculateScores(state);
  const averageScore = (scores.accuracy + scores.speed + scores.empathy + scores.critical + scores.intelligence) / 5;
  
  let performance = '';
  if (averageScore >= 80) {
    performance = 'ممتاز - أظهرت مهارات تحقيق استثنائية';
  } else if (averageScore >= 65) {
    performance = 'جيد جداً - تحقيق فعال مع إمكانيات للتطوير';
  } else if (averageScore >= 50) {
    performance = 'جيد - بداية واعدة في مهارات التحقيق';
  } else {
    performance = 'يحتاج تطوير - فرصة للتعلم والنمو';
  }

  return `
    <div class="report" style="font-family: Cairo; direction: rtl; padding: 20px; max-width: 800px;">
      <h1>تقرير المحقق الاجتماعي</h1>
      <h2>المحقق: ${state.detective?.name} (${state.detective?.title})</h2>
      <h3>القضية: ${state.selectedCaseId}</h3>
      
      <h4>تقييم الأداء العام: ${performance}</h4>
      
      <ul>
        <li>الدقة: ${scores.accuracy}% (جمع ${state.evidences.length} دليل من ${state.placesVisited.length} أماكن)</li>
        <li>السرعة: ${scores.speed}% </li>
        <li>التعاطف: ${scores.empathy}%</li>
        <li>التفكير النقدي: ${scores.critical}% (ربط ${state.links.length} أدلة)</li>
        <li>الذكاء: ${scores.intelligence}%</li>
      </ul>
      
      <h4>الأدلة المجمعة:</h4>
      <ul>
        ${state.evidences.map(e => `<li>${e.title} - ${e.description || ''}</li>`).join('')}
      </ul>
      
      <h4>الروابط المكتشفة:</h4>
      <ul>
        ${state.links.map(link => `<li>ربط بين دليلين مع التبرير: ${link.reasoning}</li>`).join('')}
      </ul>
      
      <p><strong>التوصية:</strong> ${averageScore >= 70 ? 'مهارات تحقيق قوية تؤهل للقضايا المعقدة.' : 'ينصح بمزيد من التدريب على التحقيق المنهجي.'}</p>
    </div>
  `;
};