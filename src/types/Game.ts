export interface Item {
    name: string
    imageSrc: string
    effectiveFor: string
}

export interface PlayScene {
    id: string
    character: Character
    isPaused: boolean
}

export interface EntryScene {
    id: 'entry'
}

export interface SettingsScene {
    id: 'settings'
}

export interface Character {
    lives: number
    immortalityRemainder: number
    backpack: Item[]
}

interface SceneScore {
    id: string
    score: number
}

export interface Settings {
    soundsMute: boolean
    musicMute: boolean
}

export default interface Game {
    playerHistory: SceneScore[]
    currentScene: PlayScene | EntryScene | SettingsScene
    userSettings: Settings
}
