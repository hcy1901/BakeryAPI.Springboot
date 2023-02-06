interface RPSW {
    [key:string]: string;
}


export const RockPaperScissorsGetLoser: RPSW = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
}

export const RockPaperScissorsGetWinner: RPSW = {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock',
}

export function getRandomWinner() {
    const results: { [key: number]: string } = {0: 'rock', 1:'paper', 2:'scissors'};
    return results[Math.floor(Math.rand