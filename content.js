// Motivational quotes for competitive programmers
const quotes = [
  "The difference between a novice and a master is that the master has failed more times than the novice has tried.",
  "Every problem you solve is one step closer to your next rating milestone. Keep grinding!",
  "Mastering algorithms is not about memorizing solutions, it's about understanding patterns.",
  "Tourist didn't become red in a day. Consistency beats intensity every single time.",
  "When you're stuck on a problem for hours, you're not wasting time - you're building mental stamina.",
  "The best time to start competitive programming was yesterday. The second best time is now.",
  "Green submissions are built on a foundation of red Wrong Answers. Embrace the WAs.",
  "Your rating is temporary, but the problem-solving skills you build are permanent.",
  "Every Grandmaster was once a newbie staring at their first 800-rated problem.",
  "The hardest part isn't solving the problem - it's having the courage to submit your solution.",
  "Don't compare your Chapter 1 to someone else's Chapter 20. Focus on your own journey.",
  "TLE teaches patience. WA teaches precision. AC teaches persistence.",
  "The problems you struggle with today will be your warm-up problems tomorrow.",
  "Competitive programming is a marathon, not a sprint. Consistency wins championships.",
  "Reading editorials isn't cheating - it's learning. Just make sure you implement it yourself.",
  "Your rating will fluctuate, but your knowledge only increases. Trust the process.",
  "The only bad problem is the one you didn't attempt. Even WA teaches you something.",
  "Div 2 A problems seem easy until you miss an edge case. Stay humble, test thoroughly.",
  "Behind every AC is a story of debugging, rewriting, and refusing to give up.",
  "You don't need to solve every problem. You need to solve enough problems consistently."
];

// Get random quote based on page URL for consistency
function getQuote() {
  const url = window.location.href;
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash) + url.charCodeAt(i);
    hash = hash & hash;
  }
  return quotes[Math.abs(hash) % quotes.length];
}


function injectStyles() {
  if (document.getElementById('cf-tracker-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'cf-tracker-styles';
  style.textContent = `
    .cf-stats-container {
      background: #1e1e1e;
      border: 1px solid #333;
      border-radius: 4px;
      padding: 16px;
      margin: 16px 0;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      color: #d4d4d4;
    }
    .cf-stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #333;
    }
    .cf-stats-title {
      font-size: 14px;
      font-weight: 600;
      color: #9cdcfe;
    }
    .cf-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 12px;
    }
    .cf-stat-item {
      text-align: center;
    }
    .cf-stat-label {
      font-size: 11px;
      color: #858585;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .cf-stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #d4d4d4;
    }
    .cf-stat-item.cf-solved .cf-stat-value {
      color: #4ec9b0;
    }
    .cf-stat-item.cf-unsolved .cf-stat-value {
      color: #ce9178;
    }
    .cf-stat-item.cf-percent .cf-stat-value {
      color: #569cd6;
    }
    .cf-progress-bar {
      background: #2d2d2d;
      border-radius: 2px;
      height: 6px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .cf-progress-fill {
      background: #4ec9b0;
      height: 100%;
      transition: width 0.3s ease;
    }
    .cf-quote {
      font-size: 12px;
      color: #858585;
      font-style: italic;
      line-height: 1.5;
      padding-top: 8px;
      border-top: 1px solid #333;
    }
    @media (max-width: 768px) {
      .cf-stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;
  document.head.appendChild(style);
}

// Main initialization function
function init() {
  injectStyles();
  
  // Remove existing stats
  const existing = document.getElementById('cf-problem-stats');
  if (existing) existing.remove();
  
  // Find the problemset table
  const table = document.querySelector('.problems');
  if (!table) return;
  
  // Get all problem rows (skip header)
  const rows = Array.from(table.querySelectorAll('tr')).slice(1);
  
  let totalProblems = 0;
  let solvedProblems = 0;
  
  rows.forEach(row => {
    const problemCell = row.querySelector('td:first-child');
    if (!problemCell) return;
    
    totalProblems++;
    
    if (row.classList.contains('accepted-problem')) {
      solvedProblems++;
    }
  });
  
  const unsolvedProblems = totalProblems - solvedProblems;
  const solvedPercent = totalProblems > 0 ? ((solvedProblems / totalProblems) * 100).toFixed(1) : 0;
  
  // Create stats display
  const statsDiv = document.createElement('div');
  statsDiv.id = 'cf-problem-stats';
  statsDiv.className = 'cf-stats-container';
  
  statsDiv.innerHTML = `
    <div class="cf-stats-header">
      <div class="cf-stats-title">Problem Statistics</div>
    </div>
    <div class="cf-stats-grid">
      <div class="cf-stat-item cf-total">
        <div class="cf-stat-label">Total</div>
        <div class="cf-stat-value">${totalProblems}</div>
      </div>
      <div class="cf-stat-item cf-solved">
        <div class="cf-stat-label">Solved</div>
        <div class="cf-stat-value">${solvedProblems}</div>
      </div>
      <div class="cf-stat-item cf-unsolved">
        <div class="cf-stat-label">Unsolved</div>
        <div class="cf-stat-value">${unsolvedProblems}</div>
      </div>
      <div class="cf-stat-item cf-percent">
        <div class="cf-stat-label">Progress</div>
        <div class="cf-stat-value">${solvedPercent}%</div>
      </div>
    </div>
    <div class="cf-progress-bar">
      <div class="cf-progress-fill" style="width: ${solvedPercent}%"></div>
    </div>
    <div class="cf-quote">${getQuote()}</div>
  `;
  
  // Insert before the problemset table
  if (table.parentElement) {
    table.parentElement.insertBefore(statsDiv, table);
  }
}

// Initialize immediately
init();

// Watch for URL changes (pagination, filters) - optimized
let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    init();
  }
});
urlObserver.observe(document, { subtree: true, childList: true });

// Watch for table changes - optimized with debounce
let timeout;
const tableObserver = new MutationObserver(() => {
  clearTimeout(timeout);
  timeout = setTimeout(init, 100);
});

// Start observing after DOM is ready
const problemsDiv = document.querySelector('.datatable');
if (problemsDiv) {
  tableObserver.observe(problemsDiv, {
    childList: true,
    subtree: true
  });
}
