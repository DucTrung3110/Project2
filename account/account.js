class AccountManager {
  constructor() {
    this.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    this.userData = JSON.parse(localStorage.getItem("userData")) || {
      name: "Nguyễn Doãn Bảo Long",
      points: 1250,
      avatar: "../assets/images/avatar-placeholder.jpg",
    };
  }

  init() {
    this.loadUserData();
    this.renderTransactionHistory();
    this.setupEventListeners();
  }

  loadUserData() {
    document.getElementById("username").textContent = this.userData.name;
    document.getElementById("userPoints").textContent =
      this.userData.points.toLocaleString();
    document.getElementById("userAvatar").src = this.userData.avatar;
    document.getElementById("navUsername").textContent = this.userData.name;
  }

  renderTransactionHistory() {
    const tbody = document.querySelector("#transactionHistory tbody");
    tbody.innerHTML = this.transactions
      .map(
        (t, index) => `
            <tr>
                <td>${new Date(t.timestamp).toLocaleDateString()}</td>
                <td>
                    <span class="transaction-status ${this.getStatusClass(
                      t.status
                    )}">
                        ${this.getStatusText(t.status)}
                    </span>
                </td>
                <td>${t.description}</td>
                <td class="text-end ${
                  t.type === "earn" ? "text-success" : "text-danger"
                }">
                    ${t.type === "earn" ? "+" : "-"}${t.amount.toLocaleString()}
                </td>
            </tr>
        `
      )
      .join("");
  }

  getStatusClass(status) {
    const statusMap = {
      completed: "status-completed",
      pending: "status-pending",
      failed: "status-failed",
    };
    return statusMap[status] || "";
  }

  getStatusText(status) {
    const statusText = {
      completed: "Hoàn thành",
      pending: "Đang xử lý",
      failed: "Thất bại",
    };
    return statusText[status] || status;
  }

  setupEventListeners() {
    // Thêm các event listeners cần thiết
  }

  addTransaction(transaction) {
    this.transactions.unshift(transaction);
    this.updatePoints(
      transaction.amount * (transaction.type === "earn" ? 1 : -1)
    );
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
    this.renderTransactionHistory();
  }

  updatePoints(change) {
    this.userData.points += change;
    localStorage.setItem("userData", JSON.stringify(this.userData));
    this.loadUserData();
  }
}

// Khởi tạo
const accountManager = new AccountManager();
document.addEventListener("DOMContentLoaded", () => accountManager.init());

// Hàm logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "../auth/login.html";
}

// Hàm change avatar (demo)
function changeAvatar() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("userAvatar").src = e.target.result;
        accountManager.userData.avatar = e.target.result;
        localStorage.setItem(
          "userData",
          JSON.stringify(accountManager.userData)
        );
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}
