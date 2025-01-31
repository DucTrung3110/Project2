// Khởi tạo dữ liệu demo
const demoStats = [
  { icon: "👥", title: "Người dùng", value: "10,000+" },
  { icon: "👍", title: "Like", value: "100,000+" },
  { icon: "📤", title: "Share", value: "50,000+" },
  { icon: "💬", title: "Comment", value: "30,000+" },
];

// Render thống kê
function renderStats() {
  const container = document.getElementById("statsContainer");
  container.innerHTML = demoStats
    .map(
      (stat) => `
      <div class="col-md-3">
        <div class="card stat-card h-100">
          <div class="card-body">
            <div class="stat-icon">${stat.icon}</div>
            <h3 class="stat-value">${stat.value}</h3>
            <p class="stat-title">${stat.title}</p>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Khởi chạy khi trang load
document.addEventListener("DOMContentLoaded", () => {
  renderStats();

  // Kiểm tra trạng thái đăng nhập
  if (!localStorage.getItem("loggedIn")) {
    document.querySelectorAll(".nav-item.account").forEach((item) => {
      item.style.display = "none";
    });
  }
});
