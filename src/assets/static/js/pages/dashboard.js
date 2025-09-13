async function loadDashboardData() {
  let data;

  try {
    const response = await fetch("./assets/data/data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();
    console.log("Data loaded from JSON:", data);

  } catch (err) {
    console.warn("Failed to load data.json, falling back to manual data:", err);

    // Manual fallback data
    data = {
      profileViews: [100, 150, 200, 250, 300, 200, 150, 100, 50, 75, 125, 175],
      visitorsProfile: [40, 60],
      regions: {
        Europe: [300, 450, 500, 600, 700, 550, 650, 600, 550, 500, 450, 400],
        America: [200, 300, 400, 350, 500, 450, 400, 350, 300, 250, 200, 150],
        India: [500, 600, 700, 800, 750, 800, 850, 800, 750, 700, 650, 600],
        Indonesia: [100, 150, 200, 180, 220, 250, 230, 200, 180, 150, 100, 50]
      },
      quickAccess: {
        totalViewers: 1200,
        following: 100,
        followers: 850,
        savedPosts: 50
      }
    };
  }

  // ---------------- Profile Visit (Bar Chart) ----------------
  const optionsProfileVisit = {
    annotations: { position: "back" },
    dataLabels: { enabled: false },
    chart: { type: "bar", height: 300 },
    fill: { opacity: 1 },
    series: [{ name: "Profile Views", data: data.profileViews }],
    colors: ["#19b055"],
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
    },
  };
  new ApexCharts(
    document.querySelector("#chart-profile-visit"),
    optionsProfileVisit
  ).render();

  // ---------------- Visitors Profile (Donut Chart) ----------------
  const optionsVisitorsProfile = {
    series: data.visitorsProfile,
    labels: ["Male", "Female"],
    colors: ["#78be43", "#e8c655"],
    chart: { type: "donut", width: "100%", height: 350 },
    legend: { position: "bottom" },
    plotOptions: { pie: { donut: { size: "30%" } } },
  };
  new ApexCharts(
    document.querySelector("#chart-visitors-profile"),
    optionsVisitorsProfile
  ).render();

  // ---------------- Country Traffic (Mini Area Charts) ----------------
  const commonAreaChartOptions = {
    chart: { height: 80, type: "area", toolbar: { show: false } },
    stroke: { width: 2 },
    grid: { show: false },
    dataLabels: { enabled: false },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z", "2018-09-19T07:30:00.000Z",
        "2018-09-19T08:30:00.000Z", "2018-09-19T09:30:00.000Z",
        "2018-09-19T10:30:00.000Z", "2018-09-19T11:30:00.000Z",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: { labels: { show: false } },
    tooltip: { x: { format: "dd/MM/yy HH:mm" } },
  };

  const countryColors = {
    Europe: "#5350e9",
    America: "#008b75",
    India: "#ffc434",
    Indonesia: "#dc3545",
    Australia: "#6f42c1",
    Canada: "#fd7e14",
    Brazil: "#20c997",
  };

  for (const [country, values] of Object.entries(data.regions)) {
    const chartOptions = {
      ...commonAreaChartOptions,
      series: [{ name: "Traffic", data: values }],
      colors: [countryColors[country] || "#5350e9"],
    };
    new ApexCharts(
      document.querySelector(`#chart-${country.toLowerCase()}`),
      chartOptions
    ).render();
  }

  // ---------------- Quick Access Stats ----------------
  document.getElementById("stat-profile-views").innerText =
    data.quickAccess.totalViewers;
  document.getElementById("stat-followers").innerText =
    data.quickAccess.followers;
  document.getElementById("stat-following").innerText =
    data.quickAccess.following;
  document.getElementById("stat-saved-posts").innerText =
    data.quickAccess.savedPosts;
}

loadDashboardData();
