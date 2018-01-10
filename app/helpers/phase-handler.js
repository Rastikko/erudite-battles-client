class PhaseHandler {
    constructor(game, userId) {
        this.game = game;
        this.userId = userId;
        this.commands = [];
        this._prepareCommands();
    }

    isFinished() {
        return this.commands.length === 0;
    }

    handleNextCommand() {
        // returns the new object
        return null;
    }

    _prepareCommands() {
        switch (this.game.get('gamePhase.phaseType')) {
            case 'PHASE_GATHER':
                this.commands.push({command: 'COMMAND_DRAW', payload: '5'});
                this.commands.push({command: 'COMMAND_GATHER', payload: ''});
                break;
            default:

        }
    }
}

export default PhaseHandler;
