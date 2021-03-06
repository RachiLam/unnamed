var paths = Util.paths
var Sound = EngineUtil.Sound
var SpriteSheet = EngineUtil.SpriteSheet
var Scene = EngineUtil.Scene
var SU = Scene.SU
var U = Scene.U

var Camera = require(paths.obj('Camera'))

var Millie = require(paths.obj('dogs/Millie'))
var MillieTreat = require(paths.obj('triggers/MillieTreat'))
var MillieBone = require(paths.obj('triggers/MillieBone'))
var EndTrigger = require(paths.obj('triggers/EndTrigger'))

var Wall = require(paths.obj('barriers/Wall'))
var Platform = require(paths.obj('platforms/Platform'))
var Elevator = require(paths.obj('platforms/Elevator'))

const ControllerMap = require(paths.obj('controls/ControllerMap'))
const Player1Map = require(paths.obj('controls/Player1Map'))

const Light = require(paths.obj('level2/Light'))

class Level2Millie extends Millie{
    constructor(x, y){
        super(x, y)
        
        this.state.introBark = {
            elapsedTime: 0,
            numBarks: 2,
            time: 950,
        }
        
        this.state.hint = {
            elapsedTime: 0,
            time: 10000,
            triggered: false,
        }
        
        this.state.end = {
            elapsedTime: 0,
            triggered: false,
            hovering: false,
        }
        
        this.setAnimation('sitRight')
    }
    
    activateSitTreat(engine){
        let sitWall = engine.getObjsByTag('sit-wall')[0]
        sitWall.growTo(2.36*U, 1*SU.y + 5.25*U, 20, 0.50*U, 1000)
        
        let treats = engine.getObjsByClass('MillieBone')
        $.each(treats, (index, treat)=>{
            if(treat.treatId == 'sit-treat'){
                treat.slideTo(treat.pos.x, 1.5*SU.y, 3000)
            }
        })
        
        this.state.hint.triggered = true
        let controlsMaps = engine.getObjsByClass('ControlsMap')
        $.each(controlsMaps, (index, map)=>{
            map.removeBy(false)
        })
    }
    handleTrigger(engine, trigger){
        super.handleTrigger(engine, trigger)
        
        if(trigger.instanceOf('EndTrigger')){
            trigger.onTrigger(engine)
            
            this.saveBones(1, this.treats.boneCount)
            this.savePoops(1, this.treats.poopCount)
        }
        
        if(trigger.instanceOf('TreatTrigger')){
            trigger.onTrigger(engine)
            
            if(trigger.instanceOf('MillieTreat')){
                this.treats.poopCount++
            }else{
                this.treats.boneCount++
            }
            
            let treatId = trigger.treatId
            this.removeObjsByStage(engine, treatId)
            if(treatId == 'stage-1'){
                let stage2SetupTime = 2000
                let stage2Options = {tags: ['stage-2']}
                
                let stage2Start = new Wall(6.5*U, 1*SU.y + 5.50*U, U, 0, stage2Options)
                stage2Start.growTo(6.5*U, 1*SU.y + 5.25*U, U, .5*U, stage2SetupTime)
                
                let stage2Platform = new Platform(2.9*U, 6.5*U, 5*U, 1*SU.y + 5.0*U, undefined, 1000, 30, 10, stage2Options)
                stage2Platform.slideTo(2.9*U, 1*SU.y + 5.0*U, stage2SetupTime)
                
                let stage2Wall = new Wall(3.6*U, 5.5*U, 6, 10, stage2Options)
                stage2Wall.slideTo(3.6*U, 1*SU.y + 4.7*U, stage2SetupTime)
                
                let stage2End = engine.getObjsByTag('stage-2-end')[0]
                stage2End.slideTo(1.5*U, 1*SU.y + 4.7*U, stage2SetupTime)
                
                let stage2Treat = engine.getObjsByTag('stage-2-treat')[0]
                stage2Treat.slideTo(1.5*U, 1*SU.y + 4.4*U, stage2SetupTime)
                
                let stage2Bone = new MillieBone(3.6*U, 1*SU.y - U)
                stage2Bone.slideTo(3.6*U, 1*SU.y + 4*U, stage2SetupTime)
                
                engine.addObj(stage2Start)
                engine.addObj(stage2Platform)
                engine.addObj(stage2Wall)
                engine.addObj(stage2Bone)
            }else if(treatId == 'stage-2'){
                let stage3SetupTime = 2000
                let stage3Options = {tags: ['stage-3']}
                
                let elevator = engine.getObjsByClass('Elevator')[0]
                elevator.start()
                
                let stage3Platform1 = new Platform(2*U, 5.5*U, 3.25*U, 1*SU.y + 1.25*U - 5, undefined, 1000, 30, 10, stage3Options)
                stage3Platform1.slideTo(2*U, 1*SU.y + 1.25*U - 5, stage3SetupTime)
                
                let stage3Platform2 = new Platform(6*U, 5.5*U, 4.75*U, 1*SU.y + 1.25*U - 5, undefined, 1000, 30, 10, stage3Options)
                stage3Platform2.slideTo(6*U, 1*SU.y + 1.25*U - 5, stage3SetupTime)
                
                let stage3Bone = new MillieBone(4*U, 1*SU.y - U)
                stage3Bone.slideTo(4*U, 1*SU.y + 20, stage3SetupTime)
                
                engine.addObj(stage3Platform1)
                engine.addObj(stage3Platform2)
                engine.addObj(stage3Bone)
            }else if(treatId == 'stage-3'){
                let endTrigger = new EndTrigger(4*U, -1*U, SU.x, 20, 'Level3')
                engine.addObj(endTrigger)
                
                let coco = engine.getObjsByClass('Coco')[0]
                coco.disable()
                coco.gravity = 0
                
                this.pos.y = coco.pos.y
                this.setControllerId(undefined)
                this.disable()
                this.setAnimation('idleRight')
                this.gravity = 0
                
                let lightTime = 12000
                let light1 = new Light(.3*SU.x, -10)
                let light2 = new Light(.7*SU.x, -10)
                light1.slideTo(this.pos.x, this.pos.y, lightTime)
                light2.slideTo(coco.pos.x, coco.pos.y, lightTime)
                engine.addObj(light1)
                engine.addObj(light2)
                
                this.state.end.triggered = true
                this.state.end.waiting = true
                
                let frameCamera = new Camera(7.25*U, 1*SU.y, 4*U, 4.5*U, 5000, ()=>{})
                frameCamera.start()
                
                engine.addObj(frameCamera)
            }
        }
    }
    removeObjsByStage(engine, stageTag){
        let objs = engine.getObjsByTag(stageTag)
        $.each(objs, (index, obj)=>{
            obj.removeBy(false)
        })
    }
    update(engine){
        super.update(engine)
        
        let endState = this.state.end
        if(endState.triggered){
            let coco = engine.getObjsByClass('Coco')[0]
            let lights = engine.getObjsByClass('Light')
            if(!endState.hovering && !endState.flying){
                let light2 = lights[1]
                if(coco.pos.y == light2.pos.y){
                    endState.hovering = true
                    
                    let light1 = lights[0]
                    light1.removeBy(false)
                    light2.removeBy(false)
                    
                    coco.setAnimation('flyLeft')
                    this.setAnimation('flyRight')
                }
            }else if(endState.hovering && !endState.flying){
                if(lights.length == 0){
                    endState.flying = true
                    coco.slideTo(4.5*U, -U, 10000)
                    this.slideTo(3.5*U, -U, 10000)
                }
            }
        }
        
        if(this.controllerId == undefined){
            let coco = engine.getObjsByClass('Coco')[0]
            let introBark = this.state.introBark
            if(coco.state.level == 2 && introBark.numBarks > 0){
                introBark.elapsedTime += engine.timestep
                
                if(introBark.elapsedTime >= introBark.time){
                    this.bark(engine)
                    introBark.elapsedTime = 0
                    introBark.numBarks--
                }
            }
        }else{
            let hint = this.state.hint
            if(!hint.triggered){
                hint.elapsedTime += engine.timestep
                if(hint.elapsedTime >= hint.time){
                    hint.triggered = true
                    
                    let milliePlayer1Map = new Player1Map(U + 4, SU.y + U)
                    milliePlayer1Map.setAnimation('all')
                    
                    let millieControllerMap = new ControllerMap(U + 4, SU.y + U)
                    millieControllerMap.setControllerId(0)
                    millieControllerMap.setAnimation('all')
                    
                    engine.addObj(milliePlayer1Map)
                    engine.addObj(millieControllerMap)
                }
            }
        }
    }
}
module.exports = Level2Millie
