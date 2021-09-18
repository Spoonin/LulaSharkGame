import Phaser from 'phaser'

export const config = {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#33A5E7',
    scale: {
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    loader: {
        baseURL: 'https://labs.phaser.io',
        crossOrigin: 'anonymous',
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            debugShowBody: true,
        },
    },
}

export default config
