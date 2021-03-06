const GameObj = EngineUtil.GameObj

class LevelTitle extends GameObj{
    constructor(x, y, title, waitTime = 1000){
        super(x, y)
        
        $.extend(this, {
            elapsedTime: 0,
            opacity: 0,
            fadeSpeed: .02,
            title: title,
            waitTime: waitTime,
        })
        
        this.state.fading = 'fade-in'
    }
    
    draw(engine){
        let oldFill = engine.ctx.fillStyle
        if(this.fillColor != undefined){
            engine.ctx.fillStyle = this.fillColor
        }
        
        engine.ctx.globalAlpha = this.opacity
        engine.ctx.font = '24px Sans-Serif'
        engine.ctx.textAlign = 'center'
        engine.ctx.fillText(this.title, this.pos.x, this.pos.y)
        engine.ctx.globalAlpha = 1
        engine.ctx.fillStyle = oldFill
    }
    
    update(engine){
        if(this.state.fading == 'fade-in'){
            this.opacity += this.fadeSpeed
            
            if(this.opacity >= 1){
                this.opacity = 1
                this.state.fading = 'wait'
            }
        }else if(this.state.fading == 'wait'){
            this.elapsedTime += engine.timestep
            
            if(this.elapsedTime >= this.waitTime){
                this.state.fading = 'fade-out'
            }
        }else if(this.state.fading == 'fade-out'){
            this.opacity -= this.fadeSpeed
            
            if(this.opacity <= 0){
                this.opacity = 0
                this.state.fading = ''
                engine.removeObjById(this.id)
            }
        }
    }
}

module.exports = LevelTitle
