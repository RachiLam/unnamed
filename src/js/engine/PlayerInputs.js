var KeyInput = EngineUtil.KeyInput

class PlayerInputs{
    constructor(inputs){
        $.extend(this, {
            inputs: {},
            keyInputs: {},
        })
        
        $.each(inputs, (key, input)=>{
            this.addInput(key, input)
        })
    }
    
    addInput(key, input){
        this.inputs[key] = input
        
        $.each(input.keyList, (index, key)=>{
            this.keyInputs[key] = new KeyInput(key)
        })
    }
    getInputStates(){
        let inputStates = {}
        $.each(this.inputs, (key, input)=>{
            inputStates[key] = input.pressed
        })
        
        return inputStates
    }
    keydown(keyEvent){
        $.each(this.keyInputs, (key, keyInput)=>{
            keyInput.keydown(keyEvent)
        })
    }
    keyup(keyEvent){
        $.each(this.keyInputs, (key, keyInput)=>{
            keyInput.keyup(keyEvent)
        })
    }
    resetInputs(gamepad){
        $.each(this.inputs, (index, input)=>{
            input.reset(this.keyInputs, gamepad)
        })
    }
}
module.exports = PlayerInputs
