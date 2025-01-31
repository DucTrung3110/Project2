class TaskManager {
  constructor() {
    this.tasks = [
      {
        id: 1,
        type: "like",
        title: "Like bài viết công nghệ",
        points: 10,
        link: "https://facebook.com/post1",
      },
      {
        id: 2,
        type: "share",
        title: "Chia sẻ bài khuyến mãi",
        points: 20,
        link: "https://facebook.com/post2",
      },
    ];
  }

  renderTasks() {
    const container = document.getElementById("tasksContainer");
    container.innerHTML = this.tasks
      .map(
        (task) => `
        <div class="col-md-6">
          <div class="card task-card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge bg-${this.getBadgeColor(
                  task.type
                )}">${task.type.toUpperCase()}</span>
                <span class="text-success">+${task.points} điểm</span>
              </div>
              <h5 class="card-title">${task.title}</h5>
              <a href="${
                task.link
              }" target="_blank" class="btn btn-link p-0">Xem bài viết</a>
              <button onclick="handleTaskStart(${
                task.id
              })" class="btn btn-primary w-100 mt-3">Bắt đầu</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  getBadgeColor(type) {
    const colors = {
      like: "primary",
      share: "success",
      comment: "warning",
    };
    return colors[type] || "secondary";
  }
}

// Khởi tạo và render tasks
const taskManager = new TaskManager();
taskManager.renderTasks();

// Xử lý click task
function handleTaskStart(taskId) {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "../auth/login.html";
    return;
  }

  const task = taskManager.tasks.find((t) => t.id === taskId);
  alert(`Bắt đầu nhiệm vụ: ${task.title}`);
}
