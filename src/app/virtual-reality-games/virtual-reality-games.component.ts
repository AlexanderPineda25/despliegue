import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-virtual-reality-games',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './virtual-reality-games.component.html',
  styleUrl: './virtual-reality-games.component.css'
})
export class VirtualRealityGamesComponent {
  prizePool = 0;
  betAmount = 0;
  resultMessage = 'Lanza el dado para comenzar...';
  diceRoll: number | null = null;
  isRolling = false;

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  playGame(): void {
    if (this.betAmount <= 0) {
      alert("Por favor, ingresa una apuesta válida.");
      return;
    }

    this.isRolling = true;
    this.resultMessage = '¡Rodando el dado!';

    setTimeout(() => {
      this.diceRoll = this.rollDice();
      this.isRolling = false; 

      this.rotateDice(this.diceRoll);

      if (this.diceRoll === 1 || this.diceRoll === 2 || this.diceRoll === 3 || this.diceRoll === 4) {
        this.resultMessage = `Perdiste $${this.betAmount}.`;
        this.prizePool += this.betAmount;
      } else if (this.diceRoll === 5 || this.diceRoll === 6) {
        this.resultMessage = `¡Ganaste $${this.prizePool + this.betAmount}!`;
        this.prizePool = 0;
      }

      this.betAmount = 0;
    }, 1000); 
  }

  rotateDice(value: number | null): void {
    const diceElement = document.querySelector('.dice-3d') as HTMLElement;
    if (diceElement) {
      switch (value) {
        case 1:
          diceElement.style.transform = 'rotateX(0deg) rotateY(0deg)';
          break;
        case 2:
          diceElement.style.transform = 'rotateX(0deg) rotateY(180deg)';
          break;
        case 3:
          diceElement.style.transform = 'rotateY(-90deg) rotateX(0deg)';
          break;
        case 4:
          diceElement.style.transform = 'rotateY(90deg) rotateX(0deg)';
          break;
        case 5:
          diceElement.style.transform = 'rotateX(-90deg) rotateY(0deg)';
          break;
        case 6:
          diceElement.style.transform = 'rotateX(90deg) rotateY(0deg)';
          break;
      }
    }
  }

  resetGame(): void {
    this.prizePool = 0;
    this.resultMessage = 'Lanza el dado para comenzar...';
    this.diceRoll = null;
    this.betAmount = 0;
    this.isRolling = false;
  }

}
