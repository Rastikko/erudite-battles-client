function handleCommandEnd(schema, request, game) {
    const gamePhaseType = game.attrs.gamePhase.type;

    if (gamePhaseType === 'PHASE_GATHER') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_PLAN"
        }
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_PLAN') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_BATTLE_PREPARATION"
        }
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE_PREPARATION') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_BATTLE"
        }
        game.attrs.gamePlayers[0].currentGameQuestion = schema.gameQuestions.find(1);
        game.attrs.gamePlayers[1].currentGameQuestion = schema.gameQuestions.find(2);

        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE' && game.attrs.gamePlayers[0].health === 100) {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_OUTCOME"
        }
        game.attrs.gamePlayers[0].health = 0;
        game.attrs.gamePlayers[1].health = 100;
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_BATTLE_RESOLUTION"
        }
        game.attrs.gamePlayers[0].health = 100;
        game.attrs.gamePlayers[1].health = 150;
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE_RESOLUTION') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_GATHER"
        }
        game.attrs.gamePhase = gamePhase;
        return;
    }
}

export default handleCommandEnd;
