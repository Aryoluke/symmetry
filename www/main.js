const STORAGE_KEY = "symmetry-state-v1";

const quests = [
  { id: "body", icon: "◒", title: "Move your body", xp: 20 },
  { id: "mind", icon: "◌", title: "Clear your mind", xp: 20 },
  { id: "space", icon: "⌂", title: "Reset your space", xp: 20 }
];

const ranks = [
  { name: "Seedling", minLevel: 1 },
  { name: "Focused", minLevel: 3 },
  { name: "Rising", minLevel: 6 },
  { name: "Radiant", minLevel: 10 },
  { name: "Limitless", minLevel: 20 }
];

const todayKey = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

const yesterdayKey = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

const initialState = () => ({
  xp: 0,
  streak: 0,
  level: 1,
  lastCheckIn: null,
  totalCheckIns: 0,
  questDate: todayKey(),
  completedQuests: []
});

let state;
try {
  state = { ...initialState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") };
} catch {
  state = initialState();
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentRank(level) {
  return [...ranks].reverse().find((rank) => level >= rank.minLevel) || ranks[0];
}

function refreshLevel() {
  state.level = Math.floor(state.xp / 100) + 1;
}

function resetQuestDayIfNeeded() {
  if (state.questDate !== todayKey()) {
    state.questDate = todayKey();
    state.completedQuests = [];
    save();
  }
}

function coachMessage() {
  if (state.lastCheckIn === todayKey()) return `You showed up today. Protect the ${state.streak}-day streak by keeping tomorrow beautifully simple.`;
  if (state.streak >= 7) return "A week of evidence is powerful. Keep the promise small and let consistency do the heavy lifting.";
  if (state.totalCheckIns === 0) return "You do not need a perfect day. You only need one honest next step.";
  return "Your next level is one small action away. What would make the next 10 minutes count?";
}

function render() {
  resetQuestDayIfNeeded();
  refreshLevel();
  const rank = currentRank(state.level);
  const nextRank = ranks.find((item) => item.minLevel > state.level) || { name: "Limitless", minLevel: state.level + 1 };
  const progress = state.xp % 100;
  const checkedIn = state.lastCheckIn === todayKey();

  document.querySelector("#level-value").textContent = state.level;
  document.querySelector("#rank-value").textContent = rank.name;
  document.querySelector("#streak-value").textContent = state.streak;
  document.querySelector("#xp-value").textContent = state.xp;
  document.querySelector("#next-rank").textContent = nextRank.name;
  document.querySelector("#progress-text").textContent = `${progress} / 100 XP`;
  document.querySelector("#progress-fill").style.width = `${progress}%`;
  document.querySelector("#coach-message").textContent = coachMessage();

  const checkinButton = document.querySelector("#checkin-button");
  const checkinMessage = document.querySelector("#checkin-message");
  checkinButton.disabled = checkedIn;
  checkinButton.innerHTML = checkedIn ? "Checked in for today <span>✓</span>" : "Complete daily check-in <span>→</span>";
  checkinMessage.textContent = checkedIn
    ? "That is today's promise kept. Come back tomorrow to keep your chain alive."
    : "One intentional action is enough to keep the chain alive.";

  const questList = document.querySelector("#quest-list");
  questList.innerHTML = quests.map((quest) => {
    const done = state.completedQuests.includes(quest.id);
    return `<article class="quest ${done ? "done" : ""}">
      <div class="quest-top"><span class="quest-emoji">${quest.icon}</span><span class="quest-xp">+${quest.xp} XP</span></div>
      <h3>${quest.title}</h3>
      <button type="button" data-quest="${quest.id}" ${done ? "disabled" : ""}>${done ? "Completed ✓" : "Mark complete"}</button>
    </article>`;
  }).join("");
  document.querySelector("#quest-count").textContent = `${state.completedQuests.length} / ${quests.length} done`;
}

document.querySelector("#checkin-button").addEventListener("click", () => {
  if (state.lastCheckIn === todayKey()) return;
  state.streak = state.lastCheckIn === yesterdayKey() ? state.streak + 1 : 1;
  state.lastCheckIn = todayKey();
  state.totalCheckIns += 1;
  state.xp += 100;
  save();
  render();
});

document.querySelector("#quest-list").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-quest]");
  if (!button || button.disabled) return;
  const quest = quests.find((item) => item.id === button.dataset.quest);
  if (!quest || state.completedQuests.includes(quest.id)) return;
  state.completedQuests.push(quest.id);
  state.xp += quest.xp;
  save();
  render();
});

render();
