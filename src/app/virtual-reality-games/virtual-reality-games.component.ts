import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-virtual-reality-games',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './virtual-reality-games.component.html',
  styleUrls: ['./virtual-reality-games.component.css']
})
export class VirtualRealityGamesComponent {
  prizePool = 0; // Bote acumulado
  betAmount = 0; // Cantidad apostada
  balance = 1000; // Saldo inicial del jugador
  resultMessage = '¡Bienvenido al juego de Guayabita! Ingresa tu apuesta para comenzar.';
  diceRoll: number | null = null;
  isRolling = false;
  showCasino = false; // Controla si se muestra el juego o el menú inicial

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1; // Genera un número entre 1 y 6
  }

  playGame(): void {
    if (this.betAmount <= 0 || this.betAmount > this.balance) {
      this.resultMessage = `Por favor, ingresa una apuesta válida (entre 1 y tu saldo disponible: $${this.balance}).`;
      return;
    }

    this.isRolling = true;
    this.resultMessage = '¡Rodando el dado!';

    setTimeout(() => {
      this.diceRoll = this.rollDice();
      this.isRolling = false;

      this.rotateDice(this.diceRoll);

      if (this.diceRoll === 1 || this.diceRoll === 2 || this.diceRoll === 3 || this.diceRoll === 4) {
        this.prizePool += this.betAmount; // Suma al bote acumulado
        this.balance -= this.betAmount; // Resta del saldo del jugador
        this.resultMessage = `Perdiste $${this.betAmount}. Tu saldo actual es: $${this.balance}. Bote acumulado: $${this.prizePool}.`;

        if (this.balance <= 0) {
          this.resultMessage = '¡Te has quedado sin saldo! Fin del juego.';
        }
      } else if (this.diceRoll === 5 || this.diceRoll === 6) {
        const winnings = this.prizePool + this.betAmount;
        this.balance += winnings; // Incrementa el saldo del jugador
        this.prizePool = 0; // Reinicia el bote acumulado
        this.resultMessage = `¡Ganaste $${winnings}! Tu saldo actual es: $${this.balance}. Bote acumulado reiniciado.`;
      }

      this.betAmount = 0; // Reinicia la apuesta
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
    this.balance = 1000;
    this.resultMessage = '¡Bienvenido de nuevo! Ingresa tu apuesta para comenzar.';
    this.diceRoll = null;
    this.betAmount = 0;
    this.isRolling = false;
  }

  showGame(): void {
    this.showCasino = true;
  }

  redirectToExternalLink(): void {
    window.location.href = 'https://brayanfh017.github.io/';
  }

  goBack(): void {
    this.showCasino = false;
  }
}
