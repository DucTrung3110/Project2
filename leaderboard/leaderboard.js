class Leaderboard {
  constructor() {
    this.players = [
      { name: "Nguyễn Văn A", points: 1500 },
      { name: "Trần Thị B", points: 1350 },
      { name: "Lê Văn C", points: 1200 },
    ];
  }

  render() {
    const container = document.getElementById("leaderboardContainer");
    container.innerHTML = `
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-dark">
              <tr>
                <th>Hạng</th>
                <th>Tên</th>
                <th>Điểm</th>
              </tr>
            </thead>
            <tbody>
              ${this.players
                .map(
                  (player, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${player.name}</td>
                  <td>${player.points.toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
  }
}

// Khởi tạo và render
const leaderboard = new Leaderboard();
leaderboard.render();
