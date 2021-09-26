import Phaser, { GameObjects } from 'phaser'

const SPEED = 100
const ROTATION_SPEED = 1 * Math.PI
const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED)
const TOLERANCE = 0.02 * ROTATION_SPEED
const velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation

export default class Demo extends Phaser.Scene {
    #ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody = {} as any
    #emitter: GameObjects.Particles.ParticleEmitter = {} as any
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 },
                },
            },
        }
        super(config)
    }

    preload(): void {
        this.load.image('sky', 'assets/skies/space3.png')
        this.load.image('logo', 'assets/sprites/phaser3-logo.png')
        this.load.image('red', 'assets/particles/red.png')
        this.load.image('ship', 'assets/sprites/thrust_ship.png')
    }

    create(): void {
        this.add.image(400, 300, 'sky')
        this.#ship = this.physics.add.image(200, 150, 'ship')
        const particles = this.add.particles('red')

        this.#emitter = particles.createEmitter({
            speed: SPEED,
            scale: { start: 0.2, end: 0 },
            blendMode: 'ADD',
        })
    }
    #pointerMove(pointer: Phaser.Input.Pointer & GameObjects.GameObject): void {
        if (!pointer.manager.isOver) return

        // Also see alternative method in
        // <https://codepen.io/samme/pen/gOpPLLx>

        // this.physics.accelerateToObject(this.#ship, pointer, 600, 3000, 3000)

        const angleToPointer = Phaser.Math.Angle.Between(this.#ship.x, this.#ship.y, pointer.worldX, pointer.worldY)
        const angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this.#ship.rotation)

        if (Phaser.Math.Within(angleDelta, 0, TOLERANCE)) {
            this.#ship.rotation = angleToPointer
            this.#ship.setAngularVelocity(0)
        } else {
            this.#ship.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES)
        }

        this.#emitter.startFollow(pointer)
    }
    update(): void {
        const pointer = this.input.activePointer as unknown as Phaser.Input.Pointer & GameObjects.GameObject
        this.#pointerMove(pointer)
        const distance = Phaser.Math.Distance.Between(this.#ship.x, this.#ship.y, pointer.x, pointer.y)
        velocityFromRotation(this.#ship.rotation, SPEED * (1 + distance / SPEED), this.#ship.body.velocity)
    }
}
