import Phaser from 'phaser'

export default {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#33A5E7',
    scale: {
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        auto_center: Phaser.Scale.CENTER_BOTH,
    },
}
