document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  let tahun = now.getFullYear();
  let bulan = now.getMonth() + 1;
  let tanggal = now.getDate();
  let bulanSaatIni =
    now.toLocaleString("en-US", { month: "long" }) + " " + tahun;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hariPertamaBulan = new Date(tahun, bulan - 1, 1);
  let jumlahHari = new Date(tahun, bulan, 0).getDate();
  let hariAwal = hariPertamaBulan.getDay();
  let totalRows = 7 * Math.ceil((hariAwal + jumlahHari) / 7);

  document.getElementById("monthYear").textContent = bulanSaatIni;

  prevButton.addEventListener("click", () => {
    bulan = bulan === 1 ? 12 : bulan - 1;
    tahun = bulan === 12 ? tahun - 1 : tahun;
    updateCalendar();
});


  nextButton.addEventListener("click", () => {
    bulan = bulan === 12 ? 1 : bulan + 1;
    tahun = bulan === 1 ? tahun + 1 : tahun;
    updateCalendar();
  });

  const updateCalendar = () => {
    hariPertamaBulan = new Date(tahun, bulan - 1, 1);
    jumlahHari = new Date(tahun, bulan, 0).getDate();
    hariAwal = hariPertamaBulan.getDay();
    bulanSaatIni =
      hariPertamaBulan.toLocaleString("en-US", { month: "long" }) + " " + tahun;
    document.getElementById("monthYear").textContent = bulanSaatIni;

    let calendarBody = document.getElementById("calendarBody");
    let calendarContent = "";

    for (let dy = 0; dy < totalRows; dy++) {
      if (dy % 7 === 0) {
        calendarContent += "<tr>";
      }

      if (dy < hariAwal || dy >= hariAwal + jumlahHari) {
        calendarContent += '<td class="border px-2 py-2"></td>';
      } else {
        let tanggalan = dy - hariAwal + 1;
        let style = "";

        if (
          tanggalan === tanggal &&
          tahun === now.getFullYear() &&
          bulan === now.getMonth() + 1
        ) {
          style = "bg-green-500 text-white";
        }
        calendarContent += `<td class="border border px-4 py-2 ${style}">${tanggalan}</td>`;
      }

      if (dy % 7 === 6) {
        calendarContent += "</tr>";
      }
    }

    calendarBody.innerHTML = calendarContent;
    // Perbaiki bagian berikut
    document.querySelectorAll("#calendarBody tr").forEach((row) => {
      const firstCell = row.querySelector("td:first-child");
      if (firstCell.innerHTML.trim() === "") {
        firstCell.classList.add("bg-transparent");
      } else {
        if (firstCell.classList.contains("bg-green-500")) {
            firstCell.classList.remove("bg-green-500");
            firstCell.classList.add("font-bold","bg-gradient-to-b","from-green-500","via-green-400","to-green-500","text-white");
            
        }
        firstCell.classList.add("font-bold","bg-gradient-to-b","from-red-500","via-red-400","to-red-500","text-white");
      }
    });

    // Update previous button text
    prevButton.textContent = getPreviousMonthName();
    nextButton.textContent = getNextMonthName();
  };

  const getPreviousMonthName = () => {
    const previousMonthIndex = (bulan + 10) % 12;
    return months[previousMonthIndex];
  };
  const getNextMonthName = () => {
    const nextMonthIndex = (bulan + 12) % 12;
    return months[nextMonthIndex];
  };

  updateCalendar();
});
