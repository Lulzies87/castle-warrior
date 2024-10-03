import gsap from "gsap";

type Instruction = { content: string; duration: number };

export class InstructionManager {
  private instructionText: HTMLParagraphElement;
  private instructions: Instruction[] = [];
  private currentIndex: number = 0;

  constructor(instructionText: HTMLParagraphElement) {
    this.instructionText = instructionText;
  }

  addInstruction(content: string, duration: number) {
    this.instructions.push({ content, duration });
  }

  start() {
    setTimeout(() => {
      if (this.instructions.length > 0) {
        this.showInstruction(this.instructions[this.currentIndex]);
      }
    }, 1500);
  }

  private showInstruction(instruction: Instruction) {
    this.instructionText.textContent = instruction.content;
    gsap.to(this.instructionText, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        gsap.to(this.instructionText, {
          opacity: 0,
          delay: instruction.duration,
          duration: 0.5,
          onComplete: () => {
            this.currentIndex++;
            if (this.currentIndex < this.instructions.length) {
              this.showInstruction(this.instructions[this.currentIndex]);
            }
          },
        });
      },
    });
  }

  stop() {
    gsap.killTweensOf(this.instructionText);
    gsap.to(this.instructionText, {
      opacity: 0,
      duration: 0.5,
    });
    this.instructions = [];
    this.currentIndex = 0;
  }
}
