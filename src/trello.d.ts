interface TrelloPowerUpContext {
    card: (...fields: string[]) => Promise<Record<string, unknown>>;
}

interface TrelloPowerUp {
    initialize: (
        capabilities: Record<
            string,
            (t: TrelloPowerUpContext) => unknown
        >,
    ) => void;
}

interface Window {
    TrelloPowerUp: TrelloPowerUp;
}