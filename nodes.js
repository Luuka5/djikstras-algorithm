const green = "#86c232",
  darkGreen = "#61892f",
  grey = "#474b4f",
  lightGrey = "#6b6e70";

class Node {
  constructor(posX, posY) {
    this.pos = {
      x: posX,
      y: posY,
    };
    this.state = 0;
    this.wall = false;
    this.data = {};
  }

  draw() {
    for (let i = 0; i < 15; i++) if (this.state % 100 != 0) this.state += 1;

    if (this.wall) {
      crc.fillStyle = grey;
      crc.fillRect(
        offsetX + this.pos.x * scale,
        offsetY + this.pos.y * scale,
        scale,
        scale
      );

      crc.strokeStyle = lightGrey;
      crc.strokeRect(
        offsetX + this.pos.x * scale,
        offsetY + this.pos.y * scale,
        scale,
        scale
      );
      return;
    }

    let bg = "#000";
    let col = darkGreen;
    if (this.getState() == 2) {
      bg = darkGreen;
      col = green;
    }
    if (this.getState() == 3) {
      bg = green;
      col = "#ffffff";
    }
    let size = Math.max(0, (this.state - 1) % 100) / 100;

    crc.fillStyle = bg;
    crc.fillRect(
      offsetX + this.pos.x * scale,
      offsetY + this.pos.y * scale,
      scale,
      scale
    );

    crc.fillStyle = col;
    crc.fillRect(
      offsetX + (this.pos.x + 0.5 - size * 0.5) * scale,
      offsetY + (this.pos.y + 0.5 - size * 0.5) * scale,
      size * scale,
      size * scale
    );

    crc.strokeStyle = lightGrey;
    crc.strokeRect(
      offsetX + this.pos.x * scale,
      offsetY + this.pos.y * scale,
      scale,
      scale
    );
  }

  getState() {
    if (this.state <= 0) return 0;
    else if (this.state <= 100) return 1;
    else if (this.state <= 200) return 2;
    else return 3;
  }

  setState(s) {
    if (this.getState() == s) return;
    switch (s) {
      case 0:
        this.state = 0;
        break;
      case 1:
        this.state = 1;
        break;
      case 2:
        this.state = 101;
        break;
      case 3:
        this.state = 201;
        break;
    }
  }

  setWall(wall) {
    this.wall = wall;
  }
}
