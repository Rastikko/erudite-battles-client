export default [
    {
      "id": 1,
      "turn": 1,
      "gamePlayers": [
        {
          "id": 1,
          "userId": 1,
          "energy": 0,
          "attack": 50,
          "health": 200,
          "deck": 25,
          "hand": [
            {
              "id": 1,
              "name": "Pythagoras Theorem",
              "cost": 1,
              "attributes": [
                {
                  "id": 1,
                  "attributeType": "ATTACK",
                  "value": 100
                }
              ]
            },
            {
              "id": 2,
              "name": "Pythagoras Theorem",
              "cost": 1,
              "attributes": [
                {
                  "id": 1,
                  "attributeType": "ATTACK",
                  "value": 100
                }
              ]
            }
          ],
          "permanents": []
        },
        {
          "id": 2,
          "userId": 2,
          "energy": 0,
          "attack": 100,
          "health": 200,
          "deck": 30,
          "hand": [],
          "permanents": []
        }
      ],
      "gamePhase": {
        "id": 1,
        "type": "PHASE_GATHER"
      }
    }
]
