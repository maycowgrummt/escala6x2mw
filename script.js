const calendarEl = document.getElementById("calendar");

const startYear = 2025;
const endYear = 2026;

for (let year = startYear; year <= endYear; year++) {
  for (let month = 0; month < 12; month++) {
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";

    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
    monthDiv.innerHTML = `<h2>${monthName.toUpperCase()} ${year}</h2>`;

    const daysDiv = document.createElement("div");
    daysDiv.className = "days";

    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split("T")[0];

      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      dayDiv.innerText = day;

      for (const cor in folgas) {
        if (folgas[cor].includes(dateStr)) {
          dayDiv.classList.add(`feriado-${cor}`);
        }
      }

      daysDiv.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysDiv);
    calendarEl.appendChild(monthDiv);
  }
}
