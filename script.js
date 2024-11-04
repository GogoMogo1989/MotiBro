// Bejegyzés hozzáadása és mentése
document.getElementById("entry-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const description = document.getElementById("description").value;
    const tag = document.getElementById("tag").value;

    const entry = { date, startTime, endTime, description, tag };
    saveEntry(entry);
    alert("A bejegyzés sikeresen mentve!"); 
    renderEntries(); 
});

// Bejegyzések mentése
function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
}

// Szűrés típusának beállítása és bejegyzések megjelenítése
function filterEntries(filterType) {
    localStorage.setItem("filterType", filterType); 
    renderEntries(filterType);
}

// Bejegyzések megjelenítése
function renderEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    const filterType = localStorage.getItem("filterType") || "all";
    const filteredEntries = filterEntriesByType(entries, filterType);

    const tbody = document.getElementById("entry-table-body");
    tbody.innerHTML = "";

    filteredEntries.forEach((entry, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.startTime}</td>
            <td>${entry.endTime}</td>
            <td>${entry.description}</td>
            <td>${entry.tag}</td>
            <td><button onclick="deleteEntry(${index})">Törlés</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Bejegyzések szűrése dátum szerint
function filterEntriesByType(entries, type) {
    const today = new Date();
    
    return entries.filter(entry => {
        const entryDate = new Date(entry.date);
        
        if (type === "daily") {
            return (
                entryDate.getFullYear() === today.getFullYear() &&
                entryDate.getMonth() === today.getMonth() &&
                entryDate.getDate() === today.getDate()
            );
        } else if (type === "weekly") {
            const startOfWeek = new Date(today);
            const endOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
            return entryDate >= startOfWeek && entryDate <= endOfWeek;
        } else if (type === "monthly") {
            return (
                entryDate.getFullYear() === today.getFullYear() &&
                entryDate.getMonth() === today.getMonth()
            );
        } else if (type === "all") {
            return true; 
        }

        return false; 
    });
}

function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    alert("A bejegyzés sikeresen törölve!");
    renderEntries();
}

document.addEventListener("DOMContentLoaded", () => renderEntries());
