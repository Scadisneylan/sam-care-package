const items = [
    {
      id: "tummy-tea",
      name: "Tummy Tea",
      description: "Gentle warmth for nausea or bloating.",
      when: [
        "When your stomach feels unsettled",
        "If you feel gassy or crampy."
      ],
      how: [
        "Steep 5–8 minutes",
        "Sip slowly"
      ],
      notes: [
        "Yummy tea for the tummy."
      ]
    },
    {
      id: "relax-tea",
      name: "Relax Tea",
      description: "Sleepy times ahoy.",
      when: [
        "Before bed",
        "When you feel wired but tired"
      ],
      how: [
        "Steep 5–10 minutes",
      ],
      notes: [
        "Sleep heals."
      ]
    },
    {
      id: "magnesium-rub",
      name: "Magnesium Muscle Rub",
      description: "For stiffness from lying still.",
      when: [
        "If shoulders or back feel tight",
        "After a shower"
      ],
      how: [
        "Apply gently to sore areas",
        "Avoid incisions"
      ],
      notes: [
        "POTS is a bitch."
      ]
    },
    {
      id: "stool-softeners",
      name: "Stool Softeners",
      description: "To make bathroom trips easier.",
      when: [
        "Pain relief meds will back you up. Best method to avoid constipation is eat a punnet of blueberries or blackberries each morning. But if you can't do that, then this is your next best bet."
      ],
      how: [
        "Follow the packet instructions",
        "Make sure to drink water. It won't move unless it has liquid to help."
      ],
      notes: [
        "Constipation sucks. Avoid at all costs."
      ]
    },
    {
      id: "face-mask",
      name: "Face Mask",
      description: "Self-care Qween.",
      when: [
        "Low energy day and showering is hard."
      ],
      how: [
        "Apply for 10–15 minutes",
        "Wipe off gently"
      ],
      notes: [
        "Best accompanied by trash TV.",
      ]
    },
    {
      id: "bone-broth",
      name: "Chicken Bone Broth",
      description: "Warm, easy nourishment.",
      when: [
        "Eating is too hard."
      ],
      how: [
        "Heat and sip slowly",
        "Add noodles or rice if desired"
      ],
      notes: [
        "Small bowls still count as meals.",
        "Any food is good food."
      ]
    },
    {
      id: "electrolytes",
      name: "Electrolytes",
      description: "Hydration support.",
      when: [
        "1 litre per day. Drinking water be hard.",
      ],
      how: [
        "These are really strong. I use half a satchet per 1 litre.",
        "Sip steadily"
      ],
      notes: [
        "Depends on your taste. Play with powder to water ratios to get the right mix."
      ]
    }
  ];

  const container = document.getElementById("items");

function renderItems() {
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <button data-id="${item.id}">Open</button>
      <hr>
    `;

    container.appendChild(card);
  });
}

renderItems();

// ---- Modal elements ----
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalWhen = document.getElementById("modalWhen");
const modalHow = document.getElementById("modalHow");
const modalNote = document.getElementById("modalNote");

const closeModalBtn = document.getElementById("closeModal");
const newNoteBtn = document.getElementById("newNote");

let activeItem = null;

function fillList(ul, arr) {
  ul.innerHTML = "";
  (arr || []).forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
}

function pickRandom(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

function openModal(item) {
  activeItem = item;

  modalTitle.textContent = item.name;
  modalDescription.textContent = item.description;

  fillList(modalWhen, item.when);
  fillList(modalHow, item.how);

  modalNote.textContent = pickRandom(item.notes) || "";

  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
  activeItem = null;
}

// ---- Click handling for Open buttons (event delegation) ----
container.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;

  const id = btn.getAttribute("data-id");
  const item = items.find(i => i.id === id);
  if (!item) return;

  openModal(item);
});

// ---- Modal buttons ----
closeModalBtn.addEventListener("click", closeModal);

newNoteBtn.addEventListener("click", () => {
  if (!activeItem) return;
  modalNote.textContent = pickRandom(activeItem.notes) || modalNote.textContent;
});

// ---- Quality of life: ESC to close ----
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.hidden === false) {
    closeModal();
  }
});