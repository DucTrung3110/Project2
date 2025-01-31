class RequestManager {
  constructor() {
    this.requests = JSON.parse(localStorage.getItem("requests")) || [];
    this.points = JSON.parse(localStorage.getItem("userPoints")) || 100;
    this.init();
  }

  init() {
    this.renderRequests();
    this.setupFormValidation();
  }

  setupFormValidation() {
    const form = document.getElementById("requestForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.validateForm()) return;

      const newRequest = {
        id: Date.now(),
        url: document.getElementById("postUrl").value,
        type: document.getElementById("interactionType").value,
        status: "pending",
        timestamp: new Date().toISOString(),
      };

      this.addRequest(newRequest);
      form.reset();
    });
  }

  validateForm() {
    const urlInput = document.getElementById("postUrl");
    const isValid = this.isValidFacebookUrl(urlInput.value);

    if (!isValid) {
      urlInput.classList.add("is-invalid");
      return false;
    }

    urlInput.classList.remove("is-invalid");
    return true;
  }

  isValidFacebookUrl(url) {
    const pattern = /^(https?:\/\/)?(www\.)?facebook.com\/.+/;
    return pattern.test(url);
  }

  addRequest(request) {
    this.requests.unshift(request);
    this.updateStorage();
    this.renderRequests();
    this.showAlert("Yêu cầu đã được gửi thành công!", "success");
  }

  deleteRequest(requestId) {
    this.requests = this.requests.filter((req) => req.id !== requestId);
    this.updateStorage();
    this.renderRequests();
    this.showAlert("Đã hủy yêu cầu", "info");
  }

  updateStorage() {
    localStorage.setItem("requests", JSON.stringify(this.requests));
  }

  renderRequests() {
    const container = document.getElementById("requestsList");
    container.innerHTML = this.requests
      .map(
        (request) => `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${this.getTypeName(request.type)}</h5>
                    <small class="text-muted">${new Date(
                      request.timestamp
                    ).toLocaleString()}</small>
                    <div class="mt-1">
                        <a href="${
                          request.url
                        }" target="_blank" class="text-decoration-none">Xem bài viết</a>
                    </div>
                </div>
                <div>
                    <span class="badge bg-${this.getStatusColor(
                      request.status
                    )} me-2">
                        ${this.getStatusName(request.status)}
                    </span>
                    <button class="btn btn-sm btn-danger" 
                            onclick="requestManager.deleteRequest(${
                              request.id
                            })">
                        Xóa
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  getTypeName(type) {
    const types = {
      like: "Yêu cầu Like",
      share: "Yêu cầu Share",
      comment: "Yêu cầu Comment",
    };
    return types[type] || "Yêu cầu";
  }

  getStatusColor(status) {
    const colors = {
      pending: "warning",
      completed: "success",
      expired: "danger",
    };
    return colors[status] || "secondary";
  }

  getStatusName(status) {
    const names = {
      pending: "Đang chờ",
      completed: "Hoàn thành",
      expired: "Hết hạn",
    };
    return names[status] || "--";
  }

  showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    const container = document.querySelector("main");
    container.prepend(alert);

    setTimeout(() => alert.remove(), 3000);
  }
}

// Khởi tạo Request Manager
const requestManager = new RequestManager();
