import Phaser from 'phaser'
import config from './config'
import DemoScene from './scenes/Demo'

new Phaser.Game({
    ...config,
    scene: [DemoScene],
})
