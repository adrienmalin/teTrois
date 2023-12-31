import * as THREE from 'three'
import { Vortex } from './Vortex.js'


export class TetraScene extends THREE.Scene {
    constructor(settings) {
        super()

        this.loadingManager = new THREE.LoadingManager()

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(5, 0, 16)

        this.vortex = new Vortex(this.loadingManager)
        this.add(this.vortex)
        
        this.ambientLight = new THREE.AmbientLight(0xffffff, 4)
        this.add(this.ambientLight)
        
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 4)
        this.directionalLight.position.set(5, 0, 20)
        this.add(this.directionalLight)


        /* Sounds */
        
        const listener = new THREE.AudioListener()
        this.camera.add( listener )
        const audioLoader = new THREE.AudioLoader(this.loadingManager)
        
        this.music = new THREE.Audio(listener)
        audioLoader.load('audio/Tetris_T-Spin_OC_ReMix.mp3', function( buffer ) {
            this.music.setBuffer(buffer)
            this.music.setLoop(true)
            this.music.setVolume(settings.musicVolume/100)
        }.bind(this))
        this.lineClearSound = new THREE.Audio(listener)
        audioLoader.load('audio/line-clear.ogg', function( buffer ) {
            this.lineClearSound.setBuffer(buffer)
            this.lineClearSound.setVolume(settings.sfxVolume/100)
        }.bind(this))
        this.tetrisSound = new THREE.Audio(listener)
        audioLoader.load('audio/tetris.ogg', function( buffer ) {
            this.tetrisSound.setBuffer(buffer)
            this.tetrisSound.setVolume(settings.sfxVolume/100)
        }.bind(this))
        this.hardDropSound = new THREE.Audio(listener)
        audioLoader.load('audio/hard-drop.wav', function( buffer ) {
            this.hardDropSound.setBuffer(buffer)
            this.hardDropSound.setVolume(settings.sfxVolume/100)
        }.bind(this))
    }

    update(delta) {
        this.vortex.update(delta)
    }
}