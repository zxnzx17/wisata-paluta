
document.addEventListener("DOMContentLoaded", function () {
  fetch("./data/top6_ranked_data.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("data-table-body");

      data.forEach((item) => {
        const row = document.createElement("tr");

        Object.values(item).forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        });

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
