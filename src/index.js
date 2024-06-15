const players = [
  { nome: 'Mario', velocidade: 4, manobrabilidade: 3, poder: 3, pontos: 0 },
  { nome: 'Luigi', velocidade: 3, manobrabilidade: 4, poder: 4, pontos: 0 },
  { nome: 'Peach', velocidade: 3, manobrabilidade: 4, poder: 2, pontos: 0 },
  { nome: 'Yoshi', velocidade: 2, manobrabilidade: 4, poder: 3, pontos: 0 },
  { nome: 'Bowser', velocidade: 5, manobrabilidade: 2, poder: 5, pontos: 0 },
  { nome: 'Donkey Kong', velocidade: 2, manobrabilidade: 2, poder: 5, pontos: 0 }
];

function selectPlayers(array) {
  // Sorteia dois índices aleatórios diferentes
  let index1 = Math.floor(Math.random() * array.length);
  let index2;
  do {
    index2 = Math.floor(Math.random() * array.length);
  } while (index1 === index2); // Garante que os índices sejam diferentes

  // Retorna os jogadores sorteados
  return [array[index1], array[index2]];
}

const [player1, player2] = selectPlayers(players);

// //Função para rolar o dado
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
};

//função para decidir o tipo de pista
async function getRandomBlock() {
  let random = Math.random();
  let result

  switch (true) {
    case random < 0.33:
      result = "RETA"
      break;
    case random < 0.66:
      result = "CURVA"
      break;  
    default:
      result = "CONFRONTO"
      break;
  }

  return result;
}


async function logRollResult(personName, block, diceResult, attribute) {
  console.log(`${personName} rolou um 🎲 de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}


async function playRaceEngine(person1, person2) {
  for (let round = 1; 5 >= round; round++) {
    console.log(`🏁 Rodada: ${round}`)
    
    var block = await getRandomBlock();
    console.log(`Bloco: ${block}`)

    //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + person1.velocidade;
      totalTestSkill2 = diceResult2 + person2.velocidade;

      logRollResult(
        person1.nome,
        "velocidade",
        diceResult1,
        person1.velocidade

      );

      logRollResult(
        person2.nome,
        "velocidade",
        diceResult2,
        person2.velocidade

      );
    };

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + person1.manobrabilidade;
      totalTestSkill2 = diceResult2 + person2.manobrabilidade;

      logRollResult(
        person1.nome,
        "manobrabilidade",
        diceResult1,
        person1.manobrabilidade

      );

      logRollResult(
        person2.nome,
        "manobrabilidade",
        diceResult2,
        person2.manobrabilidade

      );

    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + person1.poder;
      let powerResult2 = diceResult2 + person2.poder;

      console.log(`${person1.nome} confrontou ${person2.nome}! 🥊`)

      logRollResult(
        person1.nome,
        "poder",
        diceResult1,
        person1.poder
      );

      logRollResult(
        person2.nome,
        "poder",
        diceResult2,
        person2.poder
      );


      //sorteia se é uma casca ou uma bomba
      let resultOfTheConfrontation = Math.random() < 0.5 ? 'casca' : 'bomba';
      let pointsLost = resultOfTheConfrontation === 'casca' ? 1 : 2;

      //verifica o vencedor e aplica as penalidades
      if(powerResult1 > powerResult2) {
        if (person2.pontos > pointsLost) {
          console.log(`${person2.nome} perdeu ${pointsLost} ponto(s)!`);
          person2.pontos -= pointsLost;
        }
        
        //turbo para o vencedor
        if (Math.random() < 0.5) {
          console.log(`${person1.nome} ganhou 1 ponto(s)!`);
          person1.pontos++;
        }
      } else if (powerResult2 > powerResult1) {
        if (person1.pontos > pointsLost) {
          console.log(`${person1.nome} perdeu ${pointsLost} ponto(s)!`);
          person1.pontos -= pointsLost;
        }

        if (Math.random() < 0.5) {
          console.log(`${person2.nome} ganhou 1 ponto(s)!`);
          person2.pontos++
        }
      }


      //verificando o vencedor
      if (powerResult1 > powerResult2 && person2.pontos > 0) {
          console.log(`${person2.nome} perdeu um ponto!`)
          person2.pontos--        
      } else if (powerResult2 > powerResult1 && person1.pontos > 0) {
          console.log(`${person1.nome} perdeu um ponto!`)
          person1.pontos--
      } else if (person1.pontos === person2.pontos) {
          console.log("Confronto empatado! Nenhum ponto foi perdido.")
      }
    };

    //verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${person1.nome} marcou 1 ponto!`)
      person1.pontos++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${person2.nome} marcou 1 ponto!`)
      person2.pontos++;
    }

    console.log('------------------------------')
  }
};

//declara o campeão
async function declareWinner(person1, person2) {
  console.log('Resultado Final:');
  console.log(`${person1.nome}: ${person1.pontos} ponto(s)`);
  console.log(`${person2.nome}: ${person2.pontos} ponto(s)`);

  if(person1.pontos > person2.pontos) {
    console.log(`\n${person1.nome} venceu a corrida! Parabéns!🏆`)
  } else if(person2.pontos > person1.pontos) {
    console.log(`\n${person2.nome} venceu a corrida! Parabéns!🏆`)
  } else {
    console.log(`\nA corrida terminou em empate!`)
  }
}

//Criando a função principal e tornado-a autoinvocavel
(async function main(){
  console.log(`🏁🚨: Corrida entre ${player1.nome} e ${player2.nome} começando...\n`);

  await playRaceEngine(player1,player2);
  await declareWinner(player1, player2);
})();