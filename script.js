const scenarios = [
    {
        title: "The Housing Crisis",
        description: "You and your partner are excited to move into a cozy apartment near campus. Just as you settle in, your landlord increases the rent by $300 per month. You need to act fast to make a decision that won’t disrupt your studies or family life.",
        options: [
            { text: "Negotiate a new lease with the landlord", scores: { fin: 5, rel: -5, acad: -5 } },
            { text: "Move to a cheaper apartment farther away", scores: { fin: 10, acad: -5 } },
            { text: "Take a roommate to share costs", scores: { fin: 5, rel: 5, acad: -5 } }
        ]
    },
    {
        title: "The Family Health Scare",
        description: "Your child comes down with a high fever during finals week. Your partner is also swamped at work, leaving you to make a tough call about how to handle this stressful situation.",
        options: [
            { text: "Stay home and care for your child", scores: { rel: 10, acad: -5, fin: -5 } },
            { text: "Hire a babysitter so you can focus on your exams", scores: { fin: -10, acad: 5, rel: 5 } },
            { text: "Split caregiving duties with your partner", scores: { rel: 5, acad: -5, fin: -5 } }
        ]
    },
    {
        title: "The Big Scholarship",
        description: "You’ve been awarded a scholarship, but it requires volunteering 10 hours per week. While it covers tuition, it may strain your family and finances.",
        options: [
            { text: "Accept the scholarship and volunteer", scores: { acad: 10, rel: -5, fin: -5 } },
            { text: "Decline and maintain your current routine", scores: { rel: 5, fin: 5, acad: -5 } },
            { text: "Share the volunteering hours with your partner", scores: { acad: 5, rel: 5, fin: -5 } }
        ]
    },
    {
        title: "The Transportation Breakdown",
        description: "Your car breaks down during a critical week of assignments and errands. Repairs will cost $1,000. How do you handle this sudden crisis?",
        options: [
            { text: "Use public transit for a while", scores: { fin: 5, rel: -5, acad: -5 } },
            { text: "Borrow from savings to fix the car", scores: { fin: -10, rel: 5 } },
            { text: "Delay repairs and manage without a car", scores: { rel: -5, acad: -5 } }
        ]
    },
    {
        title: "The Graduation Dilemma",
        description: "Graduation is just a semester away, but you’re offered a lucrative job that requires relocating immediately. Taking the job could secure financial stability but disrupt your academic progress and family life.",
        options: [
            { text: "Take the job and move", scores: { fin: 10, rel: 5, acad: -10 } },
            { text: "Stay and focus on finishing school", scores: { acad: 10, fin: -5, rel: -5 } },
            { text: "Balance both by commuting", scores: { fin: 5, acad: 5, rel: -5 } }
        ]
    },
    {
        title: "Unexpected Pregnancy",
        description: "You discover an unexpected pregnancy. How do you adapt to this life-changing event?",
        options: [
            { text: "Affordable daycare", scores: { fin: 5, rel: -5, acad: -5 } },
            { text: "Pause studies to focus on family", scores: { rel: 10, acad: -10, fin: 5 } },
            { text: "No changes; keep managing all responsibilities", scores: { fin: -10, rel: -5, acad: -5 } }
        ]
    },
    {
        title: "Financial Emergency",
        description: "An unexpected $500 expense arises, threatening your monthly budget. How do you handle it?",
        options: [
            { text: "Take a loan", scores: { fin: -10, acad: 5, rel: 5 } },
            { text: "Cut unnecessary spending", scores: { fin: 5, rel: 5, acad: -5 } },
            { text: "Skip a major family outing to save", scores: { rel: -10, fin: 10 } }
        ]
    },
    {
        title: "Clashing Schedules",
        description: "Your family’s schedule conflicts with your school commitments. Something has to give.",
        options: [
            { text: "Prioritize classes and study time", scores: { acad: 10, rel: -10, fin: 5 } },
            { text: "Reduce your course load", scores: { rel: 5, acad: -10, fin: -5 } },
            { text: "Try to juggle both as best as you can", scores: { rel: 5, acad: 5, fin: -5 } }
        ]
    },
    {
        title: "Study Abroad Opportunity",
        description: "You’re offered the chance to study abroad for a semester. It’s a great academic opportunity, but it comes with challenges.",
        options: [
            { text: "Accept and go solo", scores: { acad: 10, rel: -10, fin: -5 } },
            { text: "Stay local and maintain balance", scores: { rel: 10, acad: -5 } },
            { text: "Take your family along", scores: { fin: -10, acad: 5, rel: 5 } }
        ]
    },
    {
        title: "Mental Health Struggles",
        description: "You’re feeling overwhelmed and stressed. How do you address your mental health challenges?",
        options: [
            { text: "Seek professional counseling", scores: { rel: 10, fin: -10 } },
            { text: "Adjust your responsibilities", scores: { rel: 5, acad: -5, fin: -5 } },
            { text: "Ignore the problem and keep going", scores: { rel: -10, acad: -5 } }
        ]
    }
];

let currentScenarioIndex = 0;
let scores = { fin: 17, rel: 17, acad: 16 };

const startScreen = document.getElementById("start-screen");
const scenarioScreen = document.getElementById("scenario-screen");
const resultScreen = document.getElementById("result-screen");

const scenarioTitle = document.getElementById("scenario-title");
const scenarioDescription = document.getElementById("scenario-description");
const optionsDiv = document.getElementById("options");

const finalFin = document.getElementById("final-fin");
const finalRel = document.getElementById("final-rel");
const finalAcad = document.getElementById("final-acad");
const performanceMessage = document.getElementById("performance-message");
const badgesList = document.getElementById("badges");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => location.reload());

function startGame() {
    startScreen.classList.add("hidden");
    scenarioScreen.classList.remove("hidden");
    showScenario();
}

function showScenario() {
    const scenario = scenarios[currentScenarioIndex];
    scenarioTitle.textContent = scenario.title;
    scenarioDescription.textContent = scenario.description;
    optionsDiv.innerHTML = "";

    scenario.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.addEventListener("click", () => handleOption(option.scores));
        optionsDiv.appendChild(button);
    });
}

function handleOption(scoresChange) {
    for (let key in scoresChange) {
        scores[key] += scoresChange[key];
    }
    currentScenarioIndex++;

    if (currentScenarioIndex < scenarios.length) {
        showScenario();
    } else {
        endGame();
    }
}

function endGame() {
    scenarioScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // Display final scores
    finalFin.textContent = scores.fin;
    finalRel.textContent = scores.rel;
    finalAcad.textContent = scores.acad;

    // Calculate total score and identify the weakest and strongest areas
    const totalScore = scores.fin + scores.rel + scores.acad;
    const minScore = Math.min(scores.fin, scores.rel, scores.acad);
    const maxScore = Math.max(scores.fin, scores.rel, scores.acad);

    // Determine the weakest area
    let weakest;
    if (scores.fin === minScore) weakest = "fin";
    if (scores.rel === minScore) weakest = "rel";
    if (scores.acad === minScore) weakest = "acad";

    // Determine the title and message
    let title = "";
    let message = "";

    if (maxScore - minScore <= 10 && totalScore > 80) {
        title = "Master of Balance";
        message = "You’ve balanced life’s priorities like a master!";
    } else if (weakest === "fin") {
        if (scores.acad > scores.rel) {
            title = "The Broke Genius";
            message = "Your grades are soaring, but your wallet skipped class!";
        } else {
            title = "The Family Spender";
            message = "Your family’s thrilled, but your bank account needs resuscitation!";
        }
    } else if (weakest === "rel") {
        if (scores.acad > scores.fin) {
            title = "The Lone Wolf";
            message = "Your grades are glowing, but your family’s feeling left out!";
        } else {
            title = "Money Over Memories";
            message = "Your wallet is full, but your family’s not around to enjoy it.";
        }
    } else if (weakest === "acad") {
        if (scores.fin > scores.rel) {
            title = "The Hustler";
            message = "You chased money hard, but forgot to hit the books!";
        } else {
            title = "Family First, School Last";
            message = "Your family is happy, but your GPA didn’t make the cut!";
        }
    }

    // Display title and message
    performanceMessage.textContent = `${title}: ${message}`;
}
