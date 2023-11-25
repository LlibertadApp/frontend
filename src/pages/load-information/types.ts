export interface TelegramData {
    // Datos de la mesa
    circuit?: string; // Input type text [Debe ingresar un circuito]
    table?: string; // Input type text [Debe ingresar una mesa]
    electors?: number; // Input type number (Integer) (>= 0) [El número de electores debe ser mayor o igual a 0]
    envelopes?: number; // Input type number (Integer) (>= 0) [El número de sobres debe ser mayor o igual a 0]
    validVotesDifference: boolean; // |e - s| < 5

    votes: {
        lla: number; // Input type number (Integer) (>= 0) [El número de votos debe ser mayor o igual a 0]
        uxp: number; // Input type number (Integer) (>= 0) [El número de votos debe ser mayor o igual a 0]
        blank: number; // Input type number (Integer) (>= 0) [El número de votos debe ser mayor o igual a 0]
        null: number; // Input type number (Integer) (>= 0) [El número de votos debe ser mayor o igual a 0]
        disputed: number; // Input type number (Integer) (>= 0) [El número de votos debe ser mayor o igual a 0]
        identity: number; // Input type number (Integer) (>= 0) [El número de votos debe ser mayor o igual a 0]
        command: number; // Input type number (Integer) (>= 0) [El número de votos debe ser mayor o igual a 0]
    };

    validTotalVotes: boolean; // Total de votos = (lla + uxp + blank + null + disputed + identity + command) === sobres
    formAgreement: boolean; // Input type checkbox (Boolean) [Debe aceptar el acuerdo de la mesa]
}
